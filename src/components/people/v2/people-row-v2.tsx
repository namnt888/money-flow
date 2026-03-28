"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Person } from "@/types/moneyflow.types";
import { PeopleColumnConfig } from "@/hooks/usePeopleColumnPreferences";
import { ExpandIcon } from "@/components/transaction/ui/ExpandIcon";
import { PeopleRowDetailsV2 } from "./people-row-details-v2";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Edit,
  User,
  CheckCircle2,
  HandCoins,
  Banknote,
  ExternalLink,
  RotateCw,
  FileSpreadsheet,
  Calendar,
  RefreshCcw,
  Landmark,
  Info,
  Copy,
  Database,
  Check,
} from "lucide-react";
import { cn, formatMoneyVND, formatVNLongAmount } from "@/lib/utils";
import { getPersonRouteId } from "@/lib/person-route";
import { SubscriptionBadges } from "./subscription-badges";
import { ManageSheetButton } from "@/components/people/manage-sheet-button";
import { Account } from "@/types/moneyflow.types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PeopleRowProps {
  person: Person;
  visibleColumns: PeopleColumnConfig[];
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  onEdit: (person: Person) => void;
  onLend: (person: Person) => void;
  onRepay: (person: Person) => void;
  onSync: (personId: string) => Promise<void>;
  accounts?: Account[];
}

const VNLongAmount = ({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) => {
  const text = formatVNLongAmount(amount);
  if (!text) return null;
  const parts = text.split(/(\d+)/g);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {parts.map((part, i) =>
        /^\d+$/.test(part) ? (
          <strong key={i} className="font-black text-rose-600/90">
            {part}
          </strong>
        ) : (
          <span key={i} className="text-slate-400 font-medium">
            {part}
          </span>
        ),
      )}
    </span>
  );
};

const AmountCellV2 = ({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) => {
  if (amount === 0 || amount === null || amount === undefined) {
    return (
      <span className="tabular-nums font-medium text-slate-400 opacity-20 text-xs text-center w-full">
        —
      </span>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-start gap-0.5 justify-center py-0.5 cursor-help transition-opacity hover:opacity-80">
            <span
              className={cn(
                "tabular-nums tracking-tight font-medium text-slate-600",
                className,
              )}
            >
              {formatMoneyVND(amount)}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-slate-900 text-white border-none p-2 shadow-xl"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Exact Amount
            </span>
            <div className="flex items-center gap-1.5 font-bold">
              <Info className="h-3.5 w-3.5 text-blue-400" />
              <VNLongAmount amount={amount} className="text-white" />
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export function PeopleRowV2({
  person,
  visibleColumns,
  isExpanded,
  onToggleExpand,
  onEdit,
  onLend,
  onRepay,
  onSync,
  accounts = [],
}: PeopleRowProps) {
  const [copied, setCopied] = useState(false);
  const handleRowClick = (e: React.MouseEvent) => {
    // Only expand on row click if not clicking action buttons
    const target = e.target as HTMLElement;
    if (!target.closest(".action-cell")) {
      onToggleExpand(person.id);
    }
  };

  const handleExpandToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleExpand(person.id);
  };

  return (
    <>
      <tr
        className={cn(
          "group transition-colors hover:bg-muted/50 cursor-pointer border-b",
          isExpanded && "bg-muted/50",
        )}
        onClick={handleRowClick}
      >
        {/* Expand Column (always first) */}
        <td className="sticky left-0 z-20 bg-inherit w-10 px-2 py-3 text-center border-r border-slate-200">
          <ExpandIcon isExpanded={isExpanded} onClick={handleExpandToggle} />
        </td>

        {/* Dynamic Columns */}
        {visibleColumns.map((col, idx) => (
          <td
            key={`${person.id}-${col.key}`}
            className={cn(
              "px-4 py-3 align-middle text-sm font-normal text-foreground",
              idx < visibleColumns.length - 1
                ? "border-r border-slate-200"
                : "",
              col.key === "name" && "sticky left-10 z-10 bg-inherit",
            )}
          >
            {renderCell(
              person,
              col.key,
              onEdit,
              onLend,
              onRepay,
              { copied, setCopied },
              onSync,
              accounts,
            )}
          </td>
        ))}
      </tr>

      {/* Expanded Details Row */}
      {isExpanded && (
        <tr className="bg-muted/30">
          <td colSpan={visibleColumns.length + 1} className="p-0 border-b">
            <PeopleRowDetailsV2 person={person} isExpanded={isExpanded} />
          </td>
        </tr>
      )}
    </>
  );
}
function renderCell(
  person: Person,
  key: string,
  onEdit: (p: Person) => void,
  onLend: (p: Person) => void,
  onRepay: (p: Person) => void,
  copyState: { copied: boolean; setCopied: (v: boolean) => void },
  onSync?: (pid: string) => void,
  accounts?: Account[],
) {
  const totalBalance = person.balance ?? 0;
  const currentCycleDebt = person.current_cycle_debt ?? 0;
  const { copied, setCopied } = copyState;

  switch (key) {
    case "name":
      return (
        <div className="flex items-center gap-3 group/name w-full">
          <Avatar
            className="h-10 w-10 rounded-none border border-slate-200 flex-shrink-0 cursor-pointer"
            onClick={() => onEdit(person)}
          >
            <AvatarImage
              src={person.image_url || undefined}
              alt={person.name}
              className="object-cover"
            />
            <AvatarFallback className="text-xs bg-primary/10 text-primary rounded-none">
              {person.name?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            <div className="flex items-center gap-2 w-full group/name-row">
              <div className="flex items-center gap-1 shrink-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "h-5 text-[9px] font-black uppercase transition-all border-slate-200 px-1.5",
                          copied
                            ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                            : "text-slate-400 hover:text-blue-600 hover:bg-blue-50",
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(person.id);
                          setCopied(true);
                          import("sonner").then(({ toast }) =>
                            toast.success("Copied Person ID", {
                              description: person.id,
                            }),
                          );
                          setTimeout(() => setCopied(false), 2000);
                        }}
                      >
                        {copied ? (
                          <Check className="h-3 w-3 mr-1 text-emerald-600" />
                        ) : (
                          <User className="h-3 w-3 mr-1 text-slate-400" />
                        )}
                        ID
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 border-none text-white">
                      <p className="text-[10px] font-bold">
                        Copy ID: {person.id}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `/people/${getPersonRouteId(person)}`,
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
                className="font-semibold text-sm leading-none hover:underline hover:text-blue-600 transition-colors truncate text-left"
              >
                {person.name}
              </button>

              <div className="ml-auto flex items-center gap-1.5 shrink-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `/people/${getPersonRouteId(person)}`,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                        className="h-5 w-5 text-slate-300 hover:text-blue-600 transition-all inline-flex items-center justify-center rounded hover:bg-slate-50"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 border-none text-white">
                      <p className="text-[10px] font-bold">
                        Open details in new tab
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {(person.google_sheet_url || person.sheet_link) && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={
                            person.google_sheet_url || person.sheet_link || "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-5 w-5 text-slate-300 hover:text-emerald-600 transition-all inline-flex items-center justify-center rounded hover:bg-slate-50"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FileSpreadsheet className="h-3 w-3" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-900 border-none text-white">
                        <p className="text-[10px] font-bold">
                          Open Google Sheet
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = `https://api-db.reiwarden.io.vn/_/#/collections?collection=pvl_people_001&filter=${encodeURIComponent(person.id)}&sort=-%40rowid`;
                          window.open(url, "_blank", "noopener,noreferrer");
                        }}
                        className="h-5 w-5 text-slate-300 hover:text-indigo-600 transition-all inline-flex items-center justify-center rounded hover:bg-slate-50"
                      >
                        <Database className="h-3 w-3" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 border-none text-white">
                      <p className="text-[10px] font-bold">
                        Open People DB (new tab)
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {person.is_group && (
                  <span className="text-[10px] font-black text-muted-foreground bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                    Group
                  </span>
                )}
                <SubscriptionBadges
                  subscriptions={person.subscription_details || []}
                  maxDisplay={2}
                />
              </div>
            </div>
          </div>
        </div>
      );
    case "current_tag": {
      const overdueCount = person.past_due_count || 0;
      const now = new Date();
      const currentTag = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      const cycleSheet = person.cycle_sheets?.find(
        (s) => s.cycle_tag === currentTag,
      );      return (
          <div className="w-full flex items-center justify-center gap-3 pr-2 h-full">
            <div className="w-[175px] shrink-0">
              {person.sheet_link ? (
                <ManageSheetButton
                  personId={person.id}
                  cycleTag={currentTag}
                  initialSheetUrl={cycleSheet?.sheet_url}
                  scriptLink={person.sheet_link}
                  googleSheetUrl={person.google_sheet_url}
                  sheetFullImg={person.sheet_full_img}
                  showBankAccount={person.sheet_show_bank_account ?? undefined}
                  sheetLinkedBankId={person.sheet_linked_bank_id ?? undefined}
                  showQrImage={person.sheet_show_qr_image ?? undefined}
                  isMasterSheetEnabled={person.is_master_sheet_enabled}
                  accounts={accounts}
                  className="w-full h-8"
                  buttonClassName="text-[11px] font-black rounded-none"
                  size="sm"
                  showCycleAction={true}
                  splitMode={true}
                />
              ) : (
                <div className="flex items-center justify-center gap-2 h-8 w-full border border-slate-200 bg-slate-50/50 rounded-lg px-3">
                  <span className="text-[10px] font-black text-slate-500 flex items-center gap-1.5 uppercase tracking-tight">
                    <Calendar className="h-3 w-3 opacity-50" />
                    {person.current_cycle_label || "NO TAG"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-3 h-8 flex-1">
               <div className={cn(
                  "flex items-center justify-center px-1 py-1.5 rounded-full border shadow-sm transition-all whitespace-nowrap w-[100px] shrink-0",
                  currentCycleDebt > 0 
                    ? "bg-rose-50 border-rose-100" 
                    : currentCycleDebt < 0 
                      ? "bg-emerald-50 border-emerald-100" 
                      : "bg-slate-50 border-slate-100"
               )}>
                 <span className={cn(
                   "text-[12px] font-black tabular-nums tracking-tighter whitespace-nowrap leading-none",
                   currentCycleDebt > 0 ? "text-rose-600" : currentCycleDebt < 0 ? "text-emerald-600" : "text-slate-500 uppercase tracking-widest text-[10px]"
                 )}>
                   {currentCycleDebt !== 0 ? formatMoneyVND(currentCycleDebt) : "Settled"}
                 </span>
               </div>

               {overdueCount > 0 && (
                  <div className="h-5 px-2 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 leading-none shadow-sm tooltip" title="Cycles Past Due">
                    +{overdueCount}
                  </div>
               )}
            </div>
          </div>
      );
    }
    case "current_debt": // Outstanding (including historical)
      return (
        <AmountCellV2
          amount={totalBalance}
          className="text-amber-600 font-bold"
        />
      );
    case "base_lend": // All Debt Remains (Renamed)
      if (totalBalance === 0) {
        return (
          <div className="flex items-center gap-1 p-1 px-2 rounded-full bg-emerald-50 border border-emerald-100 w-fit">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-[10px] font-black uppercase text-emerald-600 tracking-tighter">Settled</span>
          </div>
        )
      }
      return (
        <AmountCellV2
          amount={totalBalance}
          className="text-amber-600 font-bold"
        />
      );
    case "repayment": // Current Month Repaid
      return (
        <AmountCellV2
          amount={person.current_cycle_repaid || 0}
          className="text-emerald-600 font-bold"
        />
      );
    case "cashback_total": // Current Month Cashback
      return (
        <AmountCellV2
          amount={person.current_cycle_cashback || 0}
          className="text-amber-500 font-bold"
        />
      );
    case "net_lend": // Prev Debt (Historical only)
      const historicalBalance = totalBalance - currentCycleDebt;
      return (
        <AmountCellV2 amount={historicalBalance} className="text-sky-600 font-bold" />
      );
    case "balance": // Redundant (Hidden by default)
      return null;
    case "action":
      return (
        <TooltipProvider>
          <div className="action-cell flex items-center gap-1">
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLend(person);
                  }}
                >
                  <HandCoins className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-rose-900 text-white border-rose-800">
                <p>Lend Money</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRepay(person);
                  }}
                >
                  <Banknote className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-blue-900 text-white border-blue-800">
                <p>Repay Debt</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-slate-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(person);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Details</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );
    default:
      return "—";
  }
}
