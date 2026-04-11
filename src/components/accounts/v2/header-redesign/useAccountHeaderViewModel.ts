import { useMemo } from 'react';
import { Account, Category, Transaction } from '@/types/moneyflow.types';
import { AccountSpendingStats } from '@/types/cashback.types';
import { formatCycleTagWithYear, resolveTransactionCycleTag } from '@/lib/cycle-utils';
import { formatMoneyVND } from '@/lib/utils';
import { differenceInDays, startOfDay, format } from 'date-fns';
import { normalizeCashbackConfig } from '@/lib/cashback';

export interface AccountHeaderViewModel {
  // Section 1: Identity
  identity: {
    accountName: string;
    cardNumber: string;
    ownerName: string;
    bankLogo: string;
    isParent: boolean;
    cycleTag: string;
    cycleRange: string;
    categoryPill: {
      label: string;
      rate: string;
    } | null;
  };
  // Section 2: Balance & Health
  balance: {
    available: number;
    availableFormatted: string;
    solo: number;
    soloFormatted: string;
    limit: number;
    limitFormatted: string;
    ratio: number;
    paceAmount: number;
    paceFormatted: string;
    daysRemaining: number;
    dueDateLabel: string;
    healthStatus: 'good' | 'warning' | 'danger';
    isNoWait: boolean;
  };
  // Section 3: Performance
  performance: {
    netProfit: number;
    netProfitFormatted: string;
    actualClaimed: number;
    actualClaimedFormatted: string;
    estEarned: number;
    estEarnedFormatted: string;
    actualEarn: number;
    actualEarnFormatted: string;
    sharedToGroup: number;
    sharedToGroupFormatted: string;
    goalPercent: number;
    needsAmount: number;
    needsFormatted: string;
    spentAmount: number;
    spentFormatted: string;
    cycleRange: string;
  };
}

interface UseAccountHeaderViewModelProps {
  account: Account;
  cashbackStats: AccountSpendingStats | null;
  summary?: any;
  selectedCycle?: string;
}

export function useAccountHeaderViewModel({
  account,
  cashbackStats,
  summary,
  selectedCycle,
}: UseAccountHeaderViewModelProps): AccountHeaderViewModel {
  return useMemo(() => {
    // Identity Logic
    const cardNumber = account.account_number || '**** **** ****';
    const ownerName = account.receiver_name || 'Unknown Owner';
    
    // Find active category rule for the pill
    let categoryPill = null;
    const config = normalizeCashbackConfig(account.cashback_config as any, account);
    
    // Get the highest rate rule from active rules or config
    if (cashbackStats?.activeRules && cashbackStats.activeRules.length > 0) {
      const topRule = [...cashbackStats.activeRules].sort((a, b) => b.rate - a.rate)[0];
      categoryPill = {
        label: topRule.name || 'Shopping',
        rate: `${(topRule.rate * 100).toFixed(0)}%`,
      };
    } else if (config?.levels?.[0]?.rules?.[0]) {
      const rule = config.levels[0].rules[0];
      categoryPill = {
        label: rule.description || 'Shopping',
        rate: `${(rule.rate * 100).toFixed(0)}%`,
      };
    }

    // Cycle Range Logic
    let cycleRange = '---';
    if (cashbackStats?.cycle?.start && cashbackStats?.cycle?.end) {
      const s = new Date(cashbackStats.cycle.start);
      const e = new Date(cashbackStats.cycle.end);
      if (!isNaN(s.getTime()) && !isNaN(e.getTime())) {
        cycleRange = `${format(s, 'dd.MM')} - ${format(e, 'dd.MM')}`;
      }
    }

    // Balance & Health Logic
    const available = account.current_balance || 0;
    const limit = account.credit_limit || 0;
    const solo = Math.abs(account.current_balance || 0); // Solo debt
    const ratio = limit > 0 ? (solo / limit) * 100 : 0;
    
    const today = startOfDay(new Date());
    const statementDay = account.statement_day || account.credit_card_info?.statement_day || 1;
    
    // Calculate days remaining to next statement
    let nextStatement = new Date(today.getFullYear(), today.getMonth(), statementDay);
    if (nextStatement < today) {
      nextStatement = new Date(today.getFullYear(), today.getMonth() + 1, statementDay);
    }
    const daysRemaining = differenceInDays(nextStatement, today);
    
    // Performance Logic
    const netProfit = summary?.netProfitYearly || 0;
    const actualClaimed = summary?.cashbackTotal || 0;
    const estEarned = summary?.cardYearlyCashbackTotal || 0;
    const actualEarn = cashbackStats?.earnedSoFar || 0;
    const sharedToGroup = summary?.cardYearlyCashbackGivenTotal || 0;
    
    const spentAmount = cashbackStats?.currentSpend || 0;
    const minSpend = (cashbackStats as any)?.minSpendTarget || config?.minSpendTarget || 0;
    const needsAmount = Math.max(0, minSpend - spentAmount);
    const goalPercent = minSpend > 0 ? Math.min(100, (spentAmount / minSpend) * 100) : 100;

    return {
      identity: {
        accountName: account.name,
        cardNumber,
        ownerName,
        bankLogo: account.image_url || '',
        isParent: !!account.relationships?.is_parent,
        cycleTag: selectedCycle || 'CURRENT',
        cycleRange,
        categoryPill,
      },
      balance: {
        available,
        availableFormatted: formatMoneyVND(available),
        solo,
        soloFormatted: formatMoneyVND(solo),
        limit,
        limitFormatted: formatMoneyVND(limit),
        ratio,
        paceAmount: spentAmount,
        paceFormatted: formatMoneyVND(spentAmount),
        daysRemaining,
        dueDateLabel: format(nextStatement, 'MMM dd'),
        healthStatus: ratio < 30 ? 'good' : ratio < 70 ? 'warning' : 'danger',
        isNoWait: true,
      },
      performance: {
        netProfit,
        netProfitFormatted: formatMoneyVND(netProfit),
        actualClaimed,
        actualClaimedFormatted: formatMoneyVND(actualClaimed),
        estEarned,
        estEarnedFormatted: formatMoneyVND(estEarned),
        actualEarn,
        actualEarnFormatted: formatMoneyVND(actualEarn),
        sharedToGroup,
        sharedToGroupFormatted: formatMoneyVND(sharedToGroup),
        goalPercent,
        needsAmount,
        needsFormatted: formatMoneyVND(needsAmount),
        spentAmount,
        spentFormatted: formatMoneyVND(spentAmount),
        cycleRange,
      },
    };
  }, [account, cashbackStats, summary, selectedCycle]);
}