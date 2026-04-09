import { isYYYYMM, normalizeMonthTag } from './month-tag'
import { addMonths, startOfDay, endOfDay, subDays, subMonths, isBefore, isAfter, setDate } from "date-fns";

/**
 * Utility functions for formatting month tags into readable date ranges.
 *
 * Canonical month tag format: YYYY-MM (e.g. 2025-12)
 * Legacy month tags (MMMYY) are supported on read for back-compat.
 */

/**
 * Formats a month tag into a readable date range (e.g. "25.11 - 24.12").
 */
export function formatCycleTag(tag: string, statementDay: number = 25): string {
  const normalized = normalizeMonthTag(tag)
  if (!normalized || !isYYYYMM(normalized)) return tag

  const [yearStr, monthStr] = normalized.split('-')
  const year = Number(yearStr)
  const month = Number(monthStr) // 1..12
  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) return tag

  // Example: statementDay = 20
  // Cycle starts on (statementDay) of previous month
  // Cycle ends on (statementDay - 1) of current month
  // 20.03 - 19.04
  const cycleStartDay = statementDay
  const cycleEndDay = statementDay - 1 || 28 // Handle edge case if day is 1

  const startMonth = month === 1 ? 12 : month - 1
  const endMonth = month

  const formatDay = (day: number) => String(day).padStart(2, '0')
  const formatMonth = (m: number) => String(m).padStart(2, '0')

  return `${formatDay(cycleStartDay)}.${formatMonth(startMonth)} - ${formatDay(cycleEndDay)}.${formatMonth(endMonth)}`
}

/**
 * Formats a month tag into a date range including year (e.g. "25.11.2025 - 24.12.2025").
 */
export function formatCycleTagWithYear(tag: string, statementDay: number = 25): string {
  const normalized = normalizeMonthTag(tag)
  if (!normalized || !isYYYYMM(normalized)) return tag

  const [yearStr, monthStr] = normalized.split('-')
  const year = Number(yearStr)
  const month = Number(monthStr) // 1..12
  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) return tag

  const cycleStartDay = statementDay
  const cycleEndDay = statementDay - 1 || 28

  const startMonth = month === 1 ? 12 : month - 1
  const startYear = month === 1 ? year - 1 : year
  const endMonth = month
  const endYear = year

  const formatDay = (day: number) => String(day).padStart(2, '0')
  const formatMonth = (m: number) => String(m).padStart(2, '0')

  return `${formatDay(cycleStartDay)}.${formatMonth(startMonth)}.${startYear} - ${formatDay(cycleEndDay)}.${formatMonth(endMonth)}.${endYear}`
}

export function calculateStatementCycle(date: Date, statementDay: number) {
  if (!statementDay || statementDay > 31) {
    // Fallback or handle invalid statement day
    return null;
  }

  const targetDate = startOfDay(date);
  const day = targetDate.getDate();

  // Cycle ends on statementDay.
  // Start depends on month.

  let cycleEndDate = startOfDay(setDate(targetDate, statementDay));

  // If current day > statementDay, we are in NEXT cycle (which ends next month)
  // If current day <= statementDay, we are in CURRENT cycle (which ends this month)

  if (day > statementDay) {
    cycleEndDate = addMonths(cycleEndDate, 1);
  }

  // Cycle Start is (Cycle End - 1 month) + 1 day
  const cycleStartDate = addMonths(cycleEndDate, -1);
  cycleStartDate.setDate(cycleStartDate.getDate() + 1);


  return {
    start: cycleStartDate,
    end: cycleEndDate
  };
}

/**
 * Resolves the cycle tag for a transaction based on account statement configuration.
 * Priority: 1. Persisted Tag, 2. Derived Tag, 3. Statement Day Calculation, 4. Transaction Tag
 */
export function resolveTransactionCycleTag(
  transaction: {
    persisted_cycle_tag?: string | null;
    derived_cycle_tag?: string | null;
    occurred_at?: string | null;
    date?: string | null;
    created_at?: string | null;
    tag?: string | null;
  },
  account: {
    type?: string | null;
    statement_day?: number | string | null;
    cb_cycle_type?: string | null;
    cashback_config?: unknown;
  }
): string {
  const persisted = normalizeMonthTag(transaction.persisted_cycle_tag || "");
  if (persisted) return persisted;

  const derived = normalizeMonthTag(transaction.derived_cycle_tag || "");
  if (derived) return derived;

  const statementDay = Number(account.statement_day || 0);
  const cashbackConfig = (account.cashback_config || {}) as {
    cycleType?: string;
    program?: { cycleType?: string };
  };
  const cycleType = String(
    account.cb_cycle_type || cashbackConfig.program?.cycleType || cashbackConfig.cycleType || ""
  ).toLowerCase();

  if (account.type === "credit_card") {
    const rawDate =
      transaction.occurred_at || transaction.date || transaction.created_at;
    if (rawDate) {
      const parsed = new Date(rawDate);
      if (!Number.isNaN(parsed.getTime())) {
        let year = parsed.getFullYear();
        let month = parsed.getMonth() + 1;

        if (cycleType === "calendar_month") {
          return `${year}-${String(month).padStart(2, "0")}`;
        }

        if (statementDay > 0) {
          if (parsed.getDate() > statementDay) {
            month += 1;
            if (month > 12) {
              month = 1;
              year += 1;
            }
          }
          return `${year}-${String(month).padStart(2, "0")}`;
        }

        return `${year}-${String(month).padStart(2, "0")}`;
      }
    }
  }

  return normalizeMonthTag(transaction.tag || "") || "";
}
