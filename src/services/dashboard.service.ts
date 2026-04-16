'use server'

import { pocketbaseList, toPocketBaseId, pocketbaseGetById } from '@/services/pocketbase/server'
import { SYSTEM_ACCOUNTS } from '@/lib/constants'
import { format } from 'date-fns'

export type DashboardStats = {
  totalAssets: number
  monthlySpend: number
  monthlyIncome: number
  debtOverview: number
  pendingBatches: {
    count: number
    totalAmount: number
  }
  fundedBatchItems: Array<{
    id: string
    account_id: string
    account_name: string
    items: Array<{
      id: string
      amount: number
      receiver_name: string | null
      note: string | null
    }>
    totalAmount: number
  }>
  pendingRefunds: {
    balance: number
    topTransactions: Array<{
      id: string
      note: string | null
      amount: number
      occurred_at: string
    }>
  }
  spendingByCategory: Array<{
    name: string
    value: number
    icon?: string | null
    image_url?: string | null
  }>
  topDebtors: Array<{
    id: string
    name: string
    balance: number
    image_url?: string | null
  }>
  outstandingByCycle: Array<{
    id: string
    person_id: string
    person_name: string
    tag: string
    amount: number
    occurred_at: string | null
  }>
  recentTransactions: Array<{
    id: string
    amount: number
    description: string | null
    occurred_at: string
    category_name: string
    category_icon: string | null
    type: 'income' | 'expense' | 'transfer' | 'debt' | 'repayment'
  }>
}

/**
 * Get Dashboard Statistics with Month/Year Filter (PocketBase Version)
 */
export async function getDashboardStats(
  month?: number,
  year?: number
): Promise<DashboardStats> {
  const defaultStats: DashboardStats = {
    totalAssets: 0,
    monthlySpend: 0,
    monthlyIncome: 0,
    debtOverview: 0,
    pendingBatches: {
      count: 0,
      totalAmount: 0,
    },
    fundedBatchItems: [],
    pendingRefunds: {
      balance: 0,
      topTransactions: [],
    },
    spendingByCategory: [],
    topDebtors: [],
    outstandingByCycle: [],
    recentTransactions: [],
  }

  try {
    // 1. Calculate date range
    const now = new Date()
    const selectedMonth = month ?? now.getMonth() + 1
    const selectedYear = year ?? now.getFullYear()

    const startOfMonth = new Date(selectedYear, selectedMonth - 1, 1).toISOString()
    const endOfMonth = new Date(selectedYear, selectedMonth, 0, 23, 59, 59, 999).toISOString()

    // 2. Fetch all independent data in parallel
    const [
      accountResp,
      expenseResp,
      incomeResp,
      debtAccountResp,
      refundAccount,
      refundTxResp,
      batchItemsResp,
      recentTxResp,
    ] = await Promise.all([
      // 2. Total Assets
      pocketbaseList<any>("accounts", {
        filter:
          'is_active = true && (type = "bank" || type = "cash" || type = "savings" || type = "investment" || type = "asset")',
        perPage: 200,
      }),
      // 3. Monthly Spend & Category Stats
      pocketbaseList<any>("transactions", {
        filter: `type = "expense" && status != "void" && date >= "${startOfMonth}" && date <= "${endOfMonth}"`,
        expand: "category_id",
        perPage: 1000,
      }),
      // 4. Monthly Income
      pocketbaseList<any>("transactions", {
        filter: `type = "income" && status != "void" && date >= "${startOfMonth}" && date <= "${endOfMonth}"`,
        perPage: 500,
      }),
      // 5. Debt Accounts
      pocketbaseList<any>("accounts", {
        filter: 'type = "debt" && current_balance > 0',
        sort: "-current_balance",
        perPage: 10,
      }),
      // 7. Refund Account
      pocketbaseGetById<any>(
        "accounts",
        toPocketBaseId(SYSTEM_ACCOUNTS.PENDING_REFUNDS, "accounts")
      ).catch(() => null),
      // 7. Refund Transactions
      pocketbaseList<any>("transactions", {
        filter: `to_account_id = "${toPocketBaseId(SYSTEM_ACCOUNTS.PENDING_REFUNDS, "accounts")}" && status != "void"`,
        sort: "-date",
        perPage: 3,
      }),
      // 8. Pending Batches
      pocketbaseList<any>("batch_items", {
        filter: 'status = "pending"',
        perPage: 500,
      }).catch(() => ({ items: [], totalItems: 0 })),
      // 9. Recent Transactions
      pocketbaseList<any>("transactions", {
        filter: 'status != "void"',
        sort: "-date",
        perPage: 5,
        expand: "category_id",
      }),
    ]);

    // ─── Process Results ──────────────────────────────────────────────────

    const totalAssets = accountResp.items.reduce(
      (sum, acc) => sum + (acc.current_balance || 0),
      0
    );

    const monthlySpend = expenseResp.items.reduce(
      (sum, tx) => sum + Math.abs(tx.amount || 0),
      0
    );

    const categoryMap = new Map<string, any>();
    expenseResp.items.forEach((tx) => {
      const cat = tx.expand?.category_id;
      if (!cat) return;

      const entry = categoryMap.get(cat.id) || {
        name: cat.name,
        value: 0,
        icon: cat.icon,
        image_url: cat.image_url,
      };
      entry.value += Math.abs(tx.amount || 0);
      categoryMap.set(cat.id, entry);
    });
    const spendingByCategory = Array.from(categoryMap.values())
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    const monthlyIncome = incomeResp.items.reduce(
      (sum, tx) => sum + Math.abs(tx.amount || 0),
      0
    );

    // ─── Debt Overview & Debtors (Requires follow-up fetch for people) ───
    const debtorAccountList = debtAccountResp.items;
    const personIds = Array.from(
      new Set(debtorAccountList.map((a) => a.holder_person_id).filter(Boolean))
    );

    const peopleResp =
      personIds.length > 0
        ? await pocketbaseList<any>("people", {
            filter: personIds.map((id) => `id="${id}"`).join(" || "),
          })
        : { items: [] };
    const peopleMap = new Map(peopleResp.items.map((p) => [p.id, p]));

    const topDebtors = debtorAccountList.slice(0, 5).map((acc) => ({
      id: acc.id,
      name: acc.holder_person_id
        ? peopleMap.get(acc.holder_person_id)?.name || acc.name
        : acc.name,
      balance: acc.current_balance || 0,
      image_url: acc.holder_person_id
        ? peopleMap.get(acc.holder_person_id)?.image_url
        : null,
    }));
    const debtOverview = topDebtors.reduce((sum, d) => sum + d.balance, 0);

    // ─── Outstanding By Cycle (Placeholder) ──────────────────────────────
    const outstandingByCycle: any[] = [];

    // ─── Process Refunds & Batches ────────────────────────────────────────
    const refundBalance = refundAccount?.current_balance || 0;
    const topRefundTransactions = refundTxResp.items.map((tx) => ({
      id: tx.id,
      note: tx.note,
      amount: Math.abs(tx.amount || 0),
      occurred_at: tx.date || tx.occurred_at,
    }));

    const pendingBatchCount = batchItemsResp.totalItems;
    const pendingBatchAmount = batchItemsResp.items.reduce(
      (sum, item) => sum + Math.abs(item.amount || 0),
      0
    );

    const recentTransactions = recentTxResp.items.map((tx) => ({
      id: tx.id,
      amount: Math.abs(tx.amount || 0),
      description: tx.note || tx.description,
      occurred_at: tx.date || tx.occurred_at,
      type: tx.type,
      category_name: tx.expand?.category_id?.name || "Uncategorized",
      category_icon: tx.expand?.category_id?.icon || null,
    }));

    return {
      totalAssets,
      monthlySpend,
      monthlyIncome,
      debtOverview,
      pendingBatches: {
        count: pendingBatchCount,
        totalAmount: pendingBatchAmount,
      },
      fundedBatchItems: [],
      pendingRefunds: {
        balance: refundBalance,
        topTransactions: topRefundTransactions,
      },
      spendingByCategory,
      topDebtors,
      outstandingByCycle,
      recentTransactions,
    };
  } catch (error) {
    if ((error as any)?.name === "AbortError") {
      console.error("[DB:PB] getDashboardStats timed out (30s)");
    } else {
      console.error("[DB:PB] getDashboardStats failed:", error);
    }
    return defaultStats;
  }
}
