"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { format, subMonths } from "date-fns";
import { CalendarIcon, Tag, RefreshCw, History, Check, X, Users } from "lucide-react";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Collapsible,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SingleTransactionFormValues } from "../types";
import { Person } from "@/types/moneyflow.types";
import { Combobox } from "@/components/ui/combobox";
import { PersonAvatar } from "@/components/ui/person-avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

type BasicInfoSectionProps = {
    people: Person[];
    operationMode?: 'add' | 'edit' | 'duplicate';
    onAddNewPerson?: () => void;
    onOpenMultiCycleRepay?: (personId: string) => void;
    repayAllocationPreview?: Array<{ tag: string; amount: number }>;
    volunteerRepayEnabled?: boolean;
};

function parseDateInput(value: string): Date | null {
    const trimmed = value.trim();
    if (!trimmed) return null;

    const compact = trimmed.match(/^(\d{2})(\d{2})(\d{4})$/);
    if (compact) {
        const day = Number(compact[1]);
        const month = Number(compact[2]);
        const year = Number(compact[3]);
        const parsed = new Date(year, month - 1, day);
        if (
            parsed.getFullYear() === year &&
            parsed.getMonth() === month - 1 &&
            parsed.getDate() === day
        ) {
            return parsed;
        }
        return null;
    }

    const dmyMatch = trimmed.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
    if (dmyMatch) {
        const day = Number(dmyMatch[1]);
        const month = Number(dmyMatch[2]);
        const year = Number(dmyMatch[3]);
        const parsed = new Date(year, month - 1, day);
        if (
            parsed.getFullYear() === year &&
            parsed.getMonth() === month - 1 &&
            parsed.getDate() === day
        ) {
            return parsed;
        }
        return null;
    }

    const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (isoMatch) {
        const year = Number(isoMatch[1]);
        const month = Number(isoMatch[2]);
        const day = Number(isoMatch[3]);
        const parsed = new Date(year, month - 1, day);
        if (
            parsed.getFullYear() === year &&
            parsed.getMonth() === month - 1 &&
            parsed.getDate() === day
        ) {
            return parsed;
        }
    }

    return null;
}

export function BasicInfoSection({ people, operationMode, onAddNewPerson, onOpenMultiCycleRepay, repayAllocationPreview = [], volunteerRepayEnabled = false }: BasicInfoSectionProps) {
    const form = useFormContext<SingleTransactionFormValues>();

    // Sync Tag with Date - ONLY if empty and in ADD mode
    const occurredAt = useWatch({ control: form.control, name: "occurred_at" });
    const amountValue = useWatch({ control: form.control, name: "amount" });
    const noteValue = useWatch({ control: form.control, name: "note" });
    const selectedType = useWatch({ control: form.control, name: "type" });
    const selectedPersonId = useWatch({ control: form.control, name: "person_id" });
    const [typedDate, setTypedDate] = useState('');
    const [isMultiCycleOpen, setIsMultiCycleOpen] = useState(false);
    const hasRepayAmount = Number(amountValue || 0) > 0;
    const selectedPerson = useMemo(
        () => people.find((person) => person.id === selectedPersonId) || null,
        [people, selectedPersonId],
    );
    const selectedPersonOutstandingDebt = Number(
        selectedPerson?.outstanding_debt ?? selectedPerson?.current_cycle_debt ?? 0,
    );
    const canMarkAsRepay = operationMode === "edit" && !!selectedPersonId;
    const remainingAfterRepay = Math.max(0, selectedPersonOutstandingDebt - Number(amountValue || 0));
    const isVolunteerEnabled = volunteerRepayEnabled || /#Volunteer_Repay/i.test(String(noteValue || ""));

    const peopleItems = useMemo(
        () =>
            people.map((person) => ({
                value: person.id,
                label: person.name,
                icon: (
                    <PersonAvatar
                        name={person.name}
                        imageUrl={person.image_url}
                        size="sm"
                    />
                ),
            })),
        [people],
    );

    useEffect(() => {
        if (occurredAt && operationMode === 'add') {
            const currentTag = form.getValues("tag");
            const dateTag = format(occurredAt, "yyyy-MM");

            // Only auto-update if tag is empty OR it looks like a year-month tag
            // We want it to be dynamic but not overwrite custom manual tags
            const isManualTag = currentTag && !/^\d{4}-\d{2}$/.test(currentTag);

            if (!currentTag || !isManualTag) {
                form.setValue("tag", dateTag);
            }
        }
    }, [occurredAt, form, operationMode]);

    useEffect(() => {
        setTypedDate(occurredAt ? format(occurredAt, "dd/MM/yyyy") : '');
    }, [occurredAt]);

    return (
        <div className="space-y-3">

            {/* ROW 1: Date (full width) */}
            <FormField
                control={form.control}
                name="occurred_at"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel className="flex items-center gap-1.5 text-[10px] font-bold text-sky-500 capitalize tracking-wide mb-1.5 min-h-[14px]">
                            <CalendarIcon className="w-3 h-3" />
                            Date
                        </FormLabel>
                        <Popover>
                            <div className="flex items-center gap-2">
                                <FormControl>
                                    <Input
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="dd/mm/yyyy"
                                        value={typedDate}
                                        onChange={(e) => {
                                            const next = e.target.value;
                                            setTypedDate(next);

                                            const parsedDate = parseDateInput(next);
                                            if (!parsedDate) return;

                                            const current = field.value || new Date();
                                            parsedDate.setHours(
                                                current.getHours(),
                                                current.getMinutes(),
                                                current.getSeconds(),
                                                current.getMilliseconds(),
                                            );
                                            field.onChange(parsedDate);
                                        }}
                                        onBlur={() => {
                                            const next = typedDate.trim();
                                            if (!next) {
                                                field.onChange(undefined);
                                                return;
                                            }

                                            const parsedDate = parseDateInput(next);
                                            if (!parsedDate) {
                                                setTypedDate(field.value ? format(field.value, "dd/MM/yyyy") : '');
                                                return;
                                            }

                                            const current = field.value || new Date();
                                            parsedDate.setHours(
                                                current.getHours(),
                                                current.getMinutes(),
                                                current.getSeconds(),
                                                current.getMilliseconds(),
                                            );
                                            field.onChange(parsedDate);
                                            setTypedDate(format(parsedDate, "dd/MM/yyyy"));
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key !== 'Enter') return;

                                            const next = typedDate.trim();
                                            if (!next) {
                                                field.onChange(undefined);
                                                return;
                                            }

                                            const parsedDate = parseDateInput(next);
                                            if (!parsedDate) return;

                                            const current = field.value || new Date();
                                            parsedDate.setHours(
                                                current.getHours(),
                                                current.getMinutes(),
                                                current.getSeconds(),
                                                current.getMilliseconds(),
                                            );
                                            field.onChange(parsedDate);
                                            setTypedDate(format(parsedDate, "dd/MM/yyyy"));
                                        }}
                                        className="h-10 border-slate-200 bg-white"
                                    />
                                </FormControl>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        className="h-10 w-10 p-0 border-slate-200 bg-white shrink-0"
                                    >
                                        <CalendarIcon className="h-4 w-4 opacity-60" />
                                    </Button>
                                </PopoverTrigger>
                            </div>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(newDate) => {
                                        if (!newDate) return;
                                        const current = field.value || new Date();
                                        const preserved = new Date(newDate);
                                        preserved.setHours(current.getHours(), current.getMinutes(), current.getSeconds(), current.getMilliseconds());
                                        field.onChange(preserved);
                                    }}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    footer={(
                                        <div className="flex items-center justify-end border-t border-slate-100 px-2 py-2 mt-2">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 px-2 text-xs text-blue-600 hover:text-blue-700"
                                                onClick={() => {
                                                    const today = new Date();
                                                    const current = field.value || today;
                                                    const next = new Date(today);
                                                    next.setHours(current.getHours(), current.getMinutes(), current.getSeconds(), current.getMilliseconds());
                                                    field.onChange(next);
                                                }}
                                            >
                                                Today
                                            </Button>
                                        </div>
                                    )}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* ROW 2: People + Debt Tag Cycle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormField
                    control={form.control}
                    name="person_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-500 capitalize tracking-wide mb-1.5 min-h-[14px]">
                                <Users className="w-3 h-3" />
                                Involved Person
                            </FormLabel>
                            <FormControl>
                                <Combobox
                                    items={peopleItems}
                                    value={field.value || undefined}
                                    onValueChange={(value) => field.onChange(value ?? null)}
                                    placeholder="Personal Flow (No one)"
                                    hideTriggerBadge
                                    className="w-full h-10 bg-white border-slate-200"
                                    onAddNew={onAddNewPerson}
                                    addLabel="Person"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center justify-between gap-2 text-[10px] font-bold text-emerald-500 capitalize tracking-wide mb-1.5 min-h-[14px]">
                                <span className="inline-flex items-center gap-1.5">
                                    <Tag className="w-3 h-3" />
                                    Debt Tag Cycle
                                </span>
                                {(selectedType === "repayment" || operationMode === "edit") && !!selectedPersonId && (
                                    <button
                                        type="button"
                                        onClick={() => setIsMultiCycleOpen((prev) => !prev)}
                                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-600 hover:bg-slate-50"
                                    >
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                "h-4 px-1.5 border-none bg-transparent text-[9px] font-black uppercase tracking-wide",
                                                isMultiCycleOpen ? "text-blue-600" : "text-slate-500"
                                            )}
                                        >
                                            {isMultiCycleOpen ? "Hide" : "Show"}
                                        </Badge>
                                        <ChevronDown className={cn("h-3.5 w-3.5 text-slate-400 transition-transform", isMultiCycleOpen && "rotate-180")} />
                                    </button>
                                )}
                            </FormLabel>
                            <div className="relative flex gap-1">
                                <div className="relative flex-1">
                                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Debt Tag Cycle"
                                        className="pl-9 pr-16 bg-white border-slate-200 h-10"
                                        {...field}
                                        value={field.value || ''}
                                    />
                                    <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-slate-400 hover:text-blue-600 transition-colors"
                                                    title="Recent Tags"
                                                >
                                                    <History className="h-4 w-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40 p-1" align="end">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[10px] font-semibold text-slate-500 px-2 py-1 bg-slate-50 rounded-sm mb-1">
                                                        Recent Cycles
                                                    </span>
                                                    {Array.from({ length: 3 }).map((_, i) => {
                                                        const date = subMonths(new Date(), i);
                                                        const tag = format(date, "yyyy-MM");
                                                        return (
                                                            <button
                                                                key={tag}
                                                                type="button"
                                                                onClick={() => field.onChange(tag)}
                                                                className={cn(
                                                                    "text-xs px-2 py-1.5 rounded-sm hover:bg-slate-100 text-left transition-colors flex items-center justify-between group",
                                                                    field.value === tag && "bg-blue-50 text-blue-600 font-medium hover:bg-blue-100"
                                                                )}
                                                            >
                                                                <span>{tag}</span>
                                                                {field.value === tag && <Check className="h-3 w-3" />}
                                                            </button>
                                                        )
                                                    })}
                                                    <div className="h-px bg-slate-100 my-1" />
                                                    <button
                                                        type="button"
                                                        onClick={() => field.onChange(format(new Date(), "yyyy-MM"))}
                                                        className="text-xs px-2 py-1.5 rounded-sm hover:bg-slate-100 text-left text-slate-500 hover:text-slate-800 flex items-center gap-1.5"
                                                    >
                                                        <RefreshCw className="h-3 w-3" />
                                                        <span>Current</span>
                                                    </button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                            <FormMessage />
                            {(selectedType === "repayment" || operationMode === "edit") && !!selectedPersonId && (
                                <Collapsible open={isMultiCycleOpen} onOpenChange={setIsMultiCycleOpen}>
                                    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50/80 px-2.5 py-2">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge className={cn(
                                                "h-5 px-2 rounded-full text-[10px] font-black uppercase tracking-wide border",
                                                selectedType !== "repayment"
                                                    ? "bg-slate-100 text-slate-600 border-slate-200"
                                                    : hasRepayAmount
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                    : "bg-amber-50 text-amber-700 border-amber-200"
                                            )}>
                                                {selectedType !== "repayment"
                                                    ? "Switch to Repayment"
                                                    : hasRepayAmount
                                                        ? "Ready for Multi-Cycle"
                                                        : "Amount required"}
                                            </Badge>
                                            <Badge variant="outline" className="h-5 px-2 rounded-full border-slate-200 bg-white text-slate-500 text-[10px] font-black uppercase tracking-wide">
                                                {hasRepayAmount ? new Intl.NumberFormat("en-US").format(Number(amountValue || 0)) : "Type amount"}
                                            </Badge>
                                        </div>
                                        <CollapsibleContent className="pt-2 space-y-2">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className={cn(
                                                        "h-6 px-2 text-[11px] font-semibold rounded-full border transition-colors",
                                                        hasRepayAmount
                                                            ? "text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200 bg-white"
                                                            : "text-slate-400 border-slate-200 bg-slate-100 hover:bg-slate-100"
                                                    )}
                                                    onClick={() => {
                                                        if (selectedType !== "repayment") {
                                                            toast.warning("Mark as Repay All first")
                                                            return
                                                        }
                                                        if (!hasRepayAmount) {
                                                            toast.warning("Enter amount first before opening Multi-Cycle Repay")
                                                            return
                                                        }
                                                        if (selectedPersonId) onOpenMultiCycleRepay?.(selectedPersonId)
                                                    }}
                                                    aria-disabled={!hasRepayAmount}
                                                >
                                                    Open Multi-Cycle Repay
                                                </Button>

                                                {canMarkAsRepay && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-6 px-2 text-[11px] font-semibold rounded-full border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
                                                        onClick={() => {
                                                            if (!hasRepayAmount) {
                                                                toast.warning("Enter amount first before marking as repay all")
                                                                return
                                                            }

                                                            if (remainingAfterRepay > 10000) {
                                                                toast.warning(
                                                                    `Remaining debt after repay is ${new Intl.NumberFormat("en-US").format(remainingAfterRepay)} (>10k)`,
                                                                )
                                                            } else {
                                                                toast.success("Marked as repay all")
                                                            }

                                                            form.setValue("type", "repayment", { shouldDirty: true })
                                                        }}
                                                    >
                                                        Mark as Repay All
                                                    </Button>
                                                )}

                                                {canMarkAsRepay && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className={cn(
                                                            "h-6 px-2 text-[11px] font-semibold rounded-full border",
                                                            isVolunteerEnabled
                                                                ? "border-amber-300 bg-amber-100 text-amber-900 hover:bg-amber-200"
                                                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                                        )}
                                                        onClick={() => {
                                                            const currentNote = String(form.getValues("note") || "");
                                                            const hasTag = /#Volunteer_Repay/i.test(currentNote);
                                                            const nextNote = hasTag
                                                                ? currentNote.replace(/\s*#Volunteer_Repay/gi, "").replace(/\s{2,}/g, " ").trim()
                                                                : `${currentNote} #Volunteer_Repay`.trim();
                                                            form.setValue("note", nextNote, { shouldDirty: true });
                                                            toast.info(hasTag ? "Volunteer tag removed" : "Volunteer tag enabled");
                                                        }}
                                                    >
                                                        Volunteer
                                                    </Button>
                                                )}
                                            </div>

                                            {remainingAfterRepay > 10000 && (
                                                <div className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2 text-[11px] text-amber-800">
                                                    Remaining debt after this repayment is {new Intl.NumberFormat("en-US").format(remainingAfterRepay)}. Consider opening multi-cycle repay allocation.
                                                </div>
                                            )}

                                            {selectedType === "repayment" && repayAllocationPreview.length > 0 && (
                                                <div className="rounded-md border border-emerald-200 bg-emerald-50/40 p-2">
                                                    <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide mb-1">Applied Multi-Cycle Allocation</div>
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        {repayAllocationPreview.map((item) => (
                                                            <Badge
                                                                key={item.tag}
                                                                variant="outline"
                                                                className="h-5 rounded-full border-emerald-200 bg-white text-emerald-700 px-2 text-[10px] font-black"
                                                            >
                                                                {item.tag}: {new Intl.NumberFormat("en-US").format(item.amount)}
                                                            </Badge>
                                                        ))}
                                                        {volunteerRepayEnabled && (
                                                            <Badge className="h-5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2 text-[10px] font-black uppercase tracking-wide">
                                                                #Volunteer_Repay
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </CollapsibleContent>
                                    </div>
                                </Collapsible>
                            )}
                        </FormItem>
                    )}
                />
            </div>

            {/* ROW 3: Note */}
            <FormField
                control={form.control}
                name="note"
                render={({ field }) => {
                    // Calculate #nosync label based on selected person
                    const personId = form.getValues("person_id");
                    const selectedPerson = people?.find(p => p.id === personId);
                    const hasSheet = !!selectedPerson?.google_sheet_url;
                    const nosyncLabel = hasSheet ? "+ Not sync" : "+ #nosync";

                    return (
                        <FormItem>
                            <div className="flex items-center justify-between px-1 mb-1.5">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Note</span>
                                <span
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent focus stealing issues
                                        const current = field.value || "";
                                        if (!current.includes("#nosync")) {
                                            const newValue = current ? `${current} #nosync` : "#nosync";
                                            field.onChange(newValue);
                                        }
                                    }}
                                    className="text-[10px] text-slate-400 hover:text-blue-600 hover:bg-slate-100 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                                    title="Click to add #nosync tag"
                                >
                                    {nosyncLabel}
                                </span>
                            </div>
                            <FormControl>
                                <div className="relative">
                                    <Textarea
                                        placeholder="Add a note..."
                                        className="resize-none min-h-[60px] bg-white border-slate-200 pr-8"
                                        {...field}
                                        value={field.value || ''}
                                    />
                                    {field.value && (
                                        <button
                                            type="button"
                                            onClick={() => field.onChange("")}
                                            className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    );
                }}
            />

        </div>
    );
}
