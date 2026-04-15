"use client";

import { useMemo } from "react";
import {
  TransactionWithDetails,
  Person,
  PersonCycleSheet,
} from "@/types/moneyflow.types";
import { isYYYYMM, normalizeMonthTag, toYYYYMMFromDate } from "@/lib/month-tag";
import { normalizeRate } from "@/lib/cashback";

export interface DebtCycle {
  tag: string;
  transactions: TransactionWithDetails[];
  latestDate: number;
  tagDateVal: number;
  stats: {
    lend: number;
    repay: number;
    originalLend: number;
    cashback: number;
    paidRollover: number;
    receiveRollover: number;
  };
  serverStatus?: any;
  remains: number;
  isSettled: boolean;
  isSynced?: boolean;
}

interface UsePersonDetailsProps {
  person: Person;
  transactions: TransactionWithDetails[];
  debtTags: any[];
  cycleSheets: PersonCycleSheet[];
  urlTag?: string | null;
}

export function usePersonDetails({
  person,
  transactions,
  debtTags,
  cycleSheets,
  urlTag,
}: UsePersonDetailsProps) {
  const getTxnCycleTag = (txn: TransactionWithDetails): string => {
    const metadata = (txn.metadata as any) || {};
    const metadataDebtCycle = metadata.debt_cycle_tag as string | undefined;
    const metadataPersisted = metadata.persisted_cycle_tag as string | undefined;
    const persisted = (txn as any).persisted_cycle_tag as string | undefined;
    const debtCycle = (txn as any).debt_cycle_tag as string | undefined;
    const metadataTag = metadata.tag as string | undefined;
    
    // Prioritize Debt Cycle Tag first
    const rawTag =
      debtCycle ||
      metadataDebtCycle ||
      persisted ||
      metadataPersisted ||
      txn.tag ||
      metadataTag ||
      "";
    
    const normalized = normalizeMonthTag(rawTag);
    if (normalized && normalized.trim()) {
      return normalized.trim();
    }
    if (rawTag && rawTag.trim()) {
      return rawTag.trim();
    }
    return "Untagged";
  };

  // Map for O(1) lookup of Server Side Status
  const debtTagsMap = useMemo(() => {
    const m = new Map<string, any>();
    debtTags.forEach((t) => {
      if (t && t.tag) {
        m.set(t.tag, t);
      }
    });
    return m;
  }, [debtTags]);



  const activeTransactions = useMemo(
    () => transactions.filter((txn) => {
        if (txn.status === "void") return false;
        
        // --- STRICT 2026 PERSONAL DEBT FILTER (Resilient Version) ---
        const rawTag = (txn as any).tag || (txn as any).debt_cycle_tag || '';
        const normalized = normalizeMonthTag(rawTag) || '';
        
        let finalTag = normalized;
        if (!finalTag) {
            const d = new Date(txn.occurred_at);
            if (!isNaN(d.getTime())) {
                finalTag = toYYYYMMFromDate(d);
            }
        }

        const note = (txn.note || "").toLowerCase();
        
        if (note.startsWith("bank ")) {
            // Strictly exclude shared bank transactions unless they are explicit debt/repayment
            if (txn.type === "repayment" || txn.type === "debt") return true;

            const isPersonal = note.includes("điện") || note.includes("nước") || note.includes("s26") || note.includes("đơn") || note.includes('wifi') || note.includes('rác');
            if (isPersonal) return true;

            // Otherwise, everything starting with 'bank ' is excluded from individual debt history
            return false;
        }
        return true;
    }),
    [transactions],
  );

  // Calculate overall metrics
  const metrics = useMemo(() => {
    return activeTransactions.reduce(
      (acc, txn) => {
        const absAmount = Math.abs(Number(txn.amount) || 0);
        const metadata = (txn.metadata as any) || {};

        const note = (txn.note || "").toLowerCase();
        const type_lower = (txn.type || "").toLowerCase();
        
        const isRollover = note.includes("rollover");
        const rawAmount = Number(txn.amount) || 0;
        
        // "trả" or "repay" - MUST BE POSITIVE to be a repayment
        const isRepayment = (["repayment", "repay"].includes(type_lower) || 
                           (type_lower === "income" && (note.includes("tr\u1ea3") || note.includes("repay")))) && rawAmount > 0;
        
        const isSpend = ((type_lower === "expense" || type_lower === "debt") || (type_lower === "income" && rawAmount < 0)) && 
                        !isRollover && !isRepayment;

        // Cashback calculation - Strictly Shared ONLY
        const sharePercent = Number(txn.cashback_share_percent ?? metadata.cashback_share_percent ?? 0);
        const shareFixed = Number(txn.cashback_share_fixed ?? metadata.cashback_share_fixed ?? 0);
        
        let cb = 0;
        if (sharePercent > 0 || shareFixed > 0) {
          const normalizedPercent = normalizeRate(sharePercent);
          cb = absAmount * normalizedPercent + shareFixed;
        }

        if (isSpend) {
          const net = absAmount - cb;
          acc.lend += net;
          acc.originalLend += absAmount;
          acc.cashback += cb;
        } else if (isRepayment) {
          acc.repay += absAmount;
          if (isRollover) {
            acc.paidRollover += absAmount;
          }
        } else if (isRollover) {
          acc.lend += absAmount;
          acc.receiveRollover += absAmount;
        }

        if (type_lower === "repayment" || (type_lower === "income" && !!txn.person_id)) {
          acc.paidCount += 1;
        }

        return acc;
      },
        { lend: 0, repay: 0, cashback: 0, paidCount: 0, paidRollover: 0, originalLend: 0, receiveRollover: 0 },
    );
  }, [activeTransactions]);

  // Group transactions by cycle tag
  const debtCycles = useMemo(() => {
    const groups = new Map<string, TransactionWithDetails[]>();

    // Ensure current month and urlTag are always present
    const now = new Date();
    const currentMonthTag = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    groups.set(currentMonthTag, []);
    if (urlTag && isYYYYMM(urlTag)) {
      groups.set(urlTag, []);
    }

    activeTransactions.forEach((txn) => {
      const tag = getTxnCycleTag(txn);
      if (!groups.has(tag)) {
        groups.set(tag, []);
      }
      groups.get(tag)?.push(txn);
    });

    return Array.from(groups.entries())
      .map(([tag, txns]) => {
        // Find latest date in this group
        let latestDate = 0;
        if (txns && txns.length > 0) {
          latestDate = txns.reduce((max, txn) => {
            const d = new Date(txn.occurred_at ?? txn.created_at).getTime();
            return d > max ? d : max;
          }, 0);
        } else if (isYYYYMM(tag)) {
          const parts = tag.split("-");
          const y = Number(parts[0]);
          const m = Number(parts[1]);
          latestDate = new Date(y, m - 1, 1).getTime();
        }

        let tagDateVal = 0;
        if (isYYYYMM(tag)) {
          const parts = tag.split("-");
          const year = Number(parts[0]);
          const month = Number(parts[1]);
          if (
            Number.isFinite(year) &&
            Number.isFinite(month) &&
            month >= 1 &&
            month <= 12
          ) {
            tagDateVal = new Date(year, month - 1, 1).getTime();
          }
        }

        const stats = txns.reduce(
          (acc, txn) => {
            // --- UNIFIED CLASSIFICATION LOGIC (GLOSSARY COMPLIANT) ---
            const note = (txn.note || "").toLowerCase();
            const type_lower = (txn.type || "").toLowerCase();
            const absAmount = Math.abs(Number(txn.amount) || 0);
            const metadata = (txn.metadata as any) || {};

            const isRollover = note.includes("rollover");
            const isCashback = type_lower === "cashback" || note.includes("cashback") || note.includes("refund") || (txn.category_name && txn.category_name.toLowerCase().includes("cashback"));
            const rawAmount = Number(txn.amount) || 0;

            // "trả" or "repay" - MUST BE POSITIVE to be a repayment
            const isRepayment = (["repayment", "repay"].includes(type_lower) || 
                               (type_lower === "income" && (note.includes("tr\u1ea3") || note.includes("repay")))) && rawAmount > 0 && !isCashback;
            
            // IS SPEND if:
            // 1. Explicit expense/debt type
            // 2. OR is an INCOME with a negative amount
            const isSpend = ((type_lower === "expense" || type_lower === "debt") || (type_lower === "income" && rawAmount < 0)) && 
                            !isRollover && !isCashback && !isRepayment;

            // Cashback calculation - Strictly Shared
            const sharePercent = Number(txn.cashback_share_percent ?? metadata.cashback_share_percent ?? 0);
            const shareFixed = Number(txn.cashback_share_fixed ?? metadata.cashback_share_fixed ?? 0);
            
            let cb = 0;
            if (sharePercent > 0 || shareFixed > 0) {
              const normalizedPercent = normalizeRate(sharePercent);
              cb = absAmount * normalizedPercent + shareFixed;
            }

            if (isSpend) {
              const net = absAmount - cb;
              acc.lend += net;
              acc.originalLend += absAmount;
              acc.cashback += cb;
            } else if (isCashback) {
              acc.cashback += absAmount;
              acc.lend -= absAmount;
            } else if (isRepayment) {
              acc.repay += absAmount;
              if (isRollover) {
                acc.paidRollover += absAmount;
              }
            } else if (isRollover) {
              acc.lend += absAmount;
              acc.receiveRollover += absAmount;
            }

            return acc;
          },
          {
            lend: 0,
            repay: 0,
            originalLend: 0,
            cashback: 0,
            paidRollover: 0,
            receiveRollover: 0,
          },
        );

        // Get Server Status if available
        let serverStatus = debtTagsMap.get(tag);
        if (!serverStatus) {
          const normalized = normalizeMonthTag(tag);
          if (normalized) {
            serverStatus = debtTagsMap.get(normalized);
          }
        }

        const remains = stats.lend - stats.repay;

        // Increased threshold to 1000 VND to handle small bank rounding or minute discrepancies
        const isSettled = serverStatus
          ? serverStatus.status === "settled"
          : (txns && txns.length === 0)
            ? false
            : Math.abs(remains) < 1000;

        return {
          tag,
          transactions: txns,
          latestDate,
          tagDateVal,
          stats,
          serverStatus,
          remains,
          isSettled,
          isSynced: serverStatus?.isSynced ?? false,
        } as DebtCycle;
      })
      .sort((a, b) => {
        // Priority: Date Descending
        if (a.tagDateVal > 0 && b.tagDateVal > 0) {
          return b.tagDateVal - a.tagDateVal;
        }
        if (a.tagDateVal > 0) {
          return -1;
        }
        if (b.tagDateVal > 0) {
          return 1;
        }
        return b.latestDate - a.latestDate;
      });
  }, [activeTransactions, debtTagsMap, urlTag]);

  // Available years for filtering
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    activeTransactions.forEach((txn) => {
      const tag = getTxnCycleTag(txn);
      if (isYYYYMM(tag)) {
        years.add(tag.split("-")[0]);
      } else if (tag && tag !== "Untagged") {
        years.add("Other");
      }
    });
    const currentYear = new Date().getFullYear().toString();
    years.add(currentYear);
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  }, [activeTransactions]);

  // Current cycle info
  const currentCycle = useMemo(() => {
    const now = new Date();
    const currentTag = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    return debtCycles.find((c) => c.tag === currentTag) || debtCycles[0];
  }, [debtCycles]);

  return {
    metrics,
    debtCycles,
    availableYears,
    currentCycle,
    balance: metrics.lend - metrics.repay,
    cycleSheets,
  };
}
