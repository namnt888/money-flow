"use client";

import React from "react";
import { Account } from "@/types/moneyflow.types";
import { HeaderCashbackViewModel } from "./useAccountHeaderViewModel";
import { formatMoneyVND } from "@/lib/utils";
import { Target, CheckCircle2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeaderCashbackBlockProps {
  viewModel: HeaderCashbackViewModel;
  account: Account;
}

/**
 * Cashback Block - Hiển thị thông tin hoàn tiền
 * - Min Spend Target
 * - Current Spend vs Target
 * - Earned Cashback
 */
export function HeaderCashbackBlock({ viewModel, account }: HeaderCashbackBlockProps) {
  // Nếu không có config hoàn tiền, không hiển thị
  if (!account.cashback_config) {
    return null;
  }

  const { cycleMetricSnapshot, selectedCycle } = viewModel;

  if (!cycleMetricSnapshot) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
        <TrendingUp className="h-4 w-4" />
        <span>Cashback is not available or still loading.</span>
      </div>
    );
  }

  const { currentSpend, minSpendTarget, earned, qualified, needsToSpend } = cycleMetricSnapshot;
  const isTargetMet = needsToSpend === 0;

  return (
    <div className="space-y-3 p-3 bg-muted/30 rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-amber-500" />
          <h3 className="text-sm font-medium">Cashback Progress</h3>
        </div>
        {selectedCycle && (
          <Badge variant="outline" className="text-[10px]">
            {selectedCycle}
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        {/* Min Spend Target Progress */}
        {minSpendTarget > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <Target className="h-3 w-3" /> Min Spend Target
              </span>
              <span className="font-medium tabular-nums">
                {formatMoneyVND(currentSpend)} / {formatMoneyVND(minSpendTarget)}
              </span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isTargetMet ? "bg-green-500" : "bg-amber-500"
                }`}
                style={{ width: `${Math.min((currentSpend / minSpendTarget) * 100, 100)}%` }}
              ></div>
            </div>
            {!isTargetMet && (
              <p className="text-[10px] text-amber-600/80 mt-1">
                Need to spend {formatMoneyVND(needsToSpend)} more to qualify
              </p>
            )}
          </div>
        )}

        {/* Earned amount */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm text-muted-foreground">Estimated Earned</span>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tabular-nums text-green-600">
              +{formatMoneyVND(earned)}
            </span>
            {isTargetMet && <CheckCircle2 className="h-4 w-4 text-green-500" />}
          </div>
        </div>
      </div>
    </div>
  );
}