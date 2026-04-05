"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Plus, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SmartAmountInput } from "@/components/ui/smart-amount-input";
import { formatShortVietnameseCurrency } from "@/lib/number-to-text";
import { SingleTransactionFormValues } from "../types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Account, Category } from "@/types/moneyflow.types";
import { CashbackSection } from "./cashback-section";

type AmountSectionProps = {
  accounts: Account[];
  categories: Category[];
  splitSection?: ReactNode;
};

function renderHighlightedNumericWords(text: string): ReactNode {
  const normalized = text?.trim();
  if (!normalized) return null;
  const parts = normalized.split(/(\d+[.,]?\d*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        const isNumber = /\d/.test(part);
        if (isNumber) {
          return (
            <span key={`num-${index}`} className="font-extrabold text-rose-500">
              {part}
            </span>
          );
        }

        return <span key={`txt-${index}`}>{part}</span>;
      })}
    </>
  );
}

export function AmountSection({
  accounts,
  categories,
  splitSection,
}: AmountSectionProps) {
  const form = useFormContext<SingleTransactionFormValues>();
  const amount = useWatch({ control: form.control, name: "amount" });
  const serviceFee = useWatch({ control: form.control, name: "service_fee" });
  const type = useWatch({ control: form.control, name: "type" });
  const isHideFee = type === "income" || type === "repayment";
  const isCashbackSupported = ![
    "income",
    "repayment",
    "transfer",
    "credit_pay",
  ].includes(type || "");
  const isCashbackExpanded = useWatch({
    control: form.control,
    name: "ui_is_cashback_expanded",
  });
  const quantity = useWatch({ control: form.control, name: "ui_quantity" });
  
  const categoryId = useWatch({ control: form.control, name: "category_id" });
  const sourceAccountId = useWatch({ control: form.control, name: "source_account_id" });
  const targetAccountId = useWatch({ control: form.control, name: "target_account_id" });

  const category = categories.find((c) => c.id === categoryId);
  const sourceAccount = accounts.find((a) => a.id === sourceAccountId);
  const targetAccount = accounts.find((a) => a.id === targetAccountId);

  const isInvestment =
    category?.type === "investment" ||
    sourceAccount?.type === "investment" ||
    targetAccount?.type === "investment" ||
    type === "invest";

  const [showFeeInput, setShowFeeInput] = useState<boolean>(() => {
    const existing = form.getValues("service_fee");
    return typeof existing === "number" && existing > 0;
  });

  useEffect(() => {
    if (!isHideFee && (Number(serviceFee) || 0) > 0) {
      setShowFeeInput(true);
    }
  }, [serviceFee, isHideFee]);

  useEffect(() => {
    if (isCashbackSupported) return;

    if (isCashbackExpanded) {
      form.setValue("ui_is_cashback_expanded", false, { shouldDirty: true });
    }

    if (form.getValues("cashback_mode") !== "none_back") {
      form.setValue("cashback_mode", "none_back", { shouldDirty: true });
    }

    if (form.getValues("cashback_share_percent") !== null) {
      form.setValue("cashback_share_percent", null, { shouldDirty: true });
    }

    if (form.getValues("cashback_share_fixed") !== null) {
      form.setValue("cashback_share_fixed", null, { shouldDirty: true });
    }
  }, [isCashbackSupported, isCashbackExpanded, form]);

  const isFeeVisible =
    !isHideFee && (showFeeInput || (Number(serviceFee) || 0) > 0);

  const principal = Number(amount) || 0;
  const fee = isFeeVisible ? Number(serviceFee) || 0 : 0;
  const total = principal + fee;

  const totalText = useMemo(
    () => (total > 0 ? new Intl.NumberFormat("vi-VN").format(total) : ""),
    [total],
  );

  const amountSummaryText = principal > 0
    ? formatShortVietnameseCurrency(principal)
    : "";

  const feeSummaryText = fee > 0 ? formatShortVietnameseCurrency(fee) : "";
  const totalSummaryText = total > 0 ? formatShortVietnameseCurrency(total) : "";

  const unitPrice = quantity && Number(quantity) > 0 ? total / Number(quantity) : 0;
  const unitPriceText = unitPrice > 0 ? new Intl.NumberFormat("vi-VN").format(unitPrice) : "";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-3 border-t border-slate-100 pt-4">
      {/* Row 1: Amount + Fee — same compact style as Date/Tag row */}
      <div className="flex gap-3">
        {/* Amount */}
        <div className="min-w-0 flex-1">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="flex items-center gap-1.5 text-[10px] font-bold text-violet-500 capitalize tracking-wide mb-1.5 min-h-[14px]">
                  Amount
                </FormLabel>
                <FormControl>
                  <SmartAmountInput
                    value={field.value}
                    onChange={field.onChange}
                    hideLabel
                    className="h-10 border-slate-200 bg-white px-3 text-sm font-black focus-visible:border-indigo-500"
                    placeholder="0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Line 2: text hint */}
          <p className="mt-1 text-[12px] font-semibold text-slate-500 truncate">
            {amountSummaryText
              ? renderHighlightedNumericWords(amountSummaryText)
              : <span className="font-medium text-slate-400">Input to show text</span>}
          </p>
        </div>

        {/* Fee */}
        {!isHideFee && (
          <div className="w-[130px] shrink-0">
            <p className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500 capitalize tracking-wide mb-1.5 min-h-[14px]">
              Fee
            </p>
            {isFeeVisible ? (
              <div className="flex items-center gap-1">
                <FormField
                  control={form.control}
                  name="service_fee"
                  render={({ field }) => (
                    <FormItem className="min-w-0 flex-1 space-y-0">
                      <FormControl>
                        <SmartAmountInput
                          value={field.value || undefined}
                          onChange={field.onChange}
                          hideLabel
                          placeholder="0"
                          className="h-10 border-slate-200 bg-white px-3 text-right text-sm font-black focus-visible:border-indigo-500"
                          compact
                          hideCurrencyText
                          hideCalculator
                          hideClearButton
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  type="button"
                  onClick={() => {
                    form.setValue("service_fee", null, { shouldDirty: true });
                    setShowFeeInput(false);
                  }}
                  className="flex h-10 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:text-slate-700"
                  aria-label="Remove service fee"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowFeeInput(true)}
                className="h-10 w-full border-slate-200 bg-white text-[10px] font-bold text-slate-400 hover:text-indigo-600"
              >
                <Plus className="mr-1 h-3 w-3" />
                Add fee
              </Button>
            )}
            {/* Line 2: text hint for fee */}
            <p className="mt-1 text-[12px] font-semibold text-slate-500 truncate">
              {!isHideFee
                ? (isFeeVisible && feeSummaryText
                  ? renderHighlightedNumericWords(feeSummaryText)
                  : <span className="font-medium text-slate-400">Input to show text</span>)
                : null}
            </p>
          </div>
        )}
      </div>

      {/* Row 2: Investment Quantity & Market Price */}
      {isInvestment && (
        <div className="flex gap-3">
          {/* Quantity */}
          <div className="min-w-0 flex-1">
            <FormField
              control={form.control}
              name="ui_quantity"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="flex items-center gap-1.5 text-[10px] font-bold text-sky-500 capitalize tracking-wide mb-1.5 min-h-[14px]">
                    Asset Quantity
                  </FormLabel>
                  <FormControl>
                    <SmartAmountInput
                      value={field.value || undefined}
                      onChange={field.onChange}
                      hideLabel
                      className="h-10 border-slate-200 bg-white px-3 text-sm font-black focus-visible:border-sky-500"
                      placeholder="0.00"
                      hideCurrencyText
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-1 flex items-center justify-between">
              <p className="text-[11px] font-medium text-slate-400 truncate">
                Required for P/L. e.g. 0.5 (taels/shares)
              </p>
              {unitPrice > 0 && (
                <p className="text-[11px] font-black text-sky-500 bg-sky-50 px-2 py-0.5 rounded-full animate-in fade-in zoom-in duration-200">
                  ≈ {unitPriceText} <span className="text-sky-400 font-bold">/ unit</span>
                </p>
              )}
            </div>
          </div>

          {/* Market Price (Optional) */}
          <div className="w-[140px] shrink-0">
            <FormField
              control={form.control}
              name="ui_market_price"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="flex items-center gap-1.5 text-[10px] font-bold text-teal-500 capitalize tracking-wide mb-1.5 min-h-[14px]">
                    Market Price
                  </FormLabel>
                  <FormControl>
                    <SmartAmountInput
                      value={field.value || undefined}
                      onChange={field.onChange}
                      hideLabel
                      className="h-10 border-slate-200 bg-white px-3 text-sm font-black focus-visible:border-teal-500"
                      placeholder="Optional"
                      hideCurrencyText
                      compact
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="mt-1 text-[11px] font-medium text-slate-400 truncate">
              True price (no fees)
            </p>
          </div>
        </div>
      )}

      {/* Row 3: Total */}
      <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 text-[12px] font-semibold text-slate-500 truncate">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mr-2">Total:</span>
            {totalSummaryText
              ? renderHighlightedNumericWords(totalSummaryText)
              : <span className="font-medium text-slate-400">Input to show text</span>}
          </div>
          <span className="text-sm font-black tabular-nums text-slate-900 shrink-0">
            {totalText}
          </span>
        </div>
      </div>

      {splitSection ? <div>{splitSection}</div> : null}

      {/* Cashback toggle */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Cashback Reward
          </p>
          <p className="text-[10px] text-slate-400">
            {isCashbackSupported
              ? "Toggle to reveal optimizations"
              : "Disabled for In/Transfer types"}
          </p>
        </div>
        <Switch
          checked={Boolean(isCashbackExpanded)}
          onCheckedChange={(checked) =>
            form.setValue("ui_is_cashback_expanded", checked)
          }
          disabled={!isCashbackSupported}
        />
      </div>

      {/* Cashback detail (expanded) */}
      {isCashbackSupported && (
        <CashbackSection
          accounts={accounts}
          categories={categories}
          hideHeader
        />
      )}
    </div>
  );
}
