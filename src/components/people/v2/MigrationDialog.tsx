"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RotateCw, AlertTriangle, CheckCircle2, User, Search, Play, Loader2 } from "lucide-react";
import { syncPeopleDebtAction } from "@/actions/people-actions";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface MigrationPerson {
    id: string;
    name: string;
    hasCycles: boolean;
    balance: number;
    isSelected: boolean;
}

interface MigrationDialogProps {
    people: any[];
    trigger?: React.ReactNode;
}

export function MigrationDialog({ people, trigger }: MigrationDialogProps) {
    const [open, setOpen] = useState(false);
    const [statusList, setStatusList] = useState<MigrationPerson[]>([]);
    const [isChecking, setIsChecking] = useState(false);
    const [isMigrating, setIsMigrating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [onlyMissing, setOnlyMissing] = useState(true);

    // Initial load: determine who has data
    useEffect(() => {
        if (open) {
            const list = people.map(p => {
                const balance = (p.current_cycle_debt || 0) + (p.outstanding_debt || 0);
                const hasCycles = (p.synced_cycle_count || 0) > 0;
                
                return {
                    id: p.id,
                    name: p.name,
                    hasCycles,
                    balance,
                    isSelected: false
                };
            }).filter(p => !p.hasCycles || Math.abs(p.balance) > 100); // Relaxed filter from 1000 to 100 to catch smaller debts
            
            // By default, select only those who definitely have NO cycles
            setStatusList(list.map(p => ({ ...p, isSelected: !p.hasCycles })));
        }
    }, [open, people]);

    const filteredList = statusList.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = onlyMissing ? !p.hasCycles : true;
        return matchesSearch && matchesFilter;
    });

    const toggleSelectAll = (checked: boolean) => {
        const filteredIds = new Set<string>(filteredList.map(p => p.id));
        setStatusList(prev => prev.map(p => ({
            ...p,
            isSelected: filteredIds.has(p.id) ? checked : p.isSelected
        })));
    };

    const togglePerson = (id: string) => {
        setStatusList(prev => prev.map(p => 
            p.id === id ? { ...p, isSelected: !p.isSelected } : p
        ));
    };

    const handleMigrate = async () => {
        const selected = statusList.filter(p => p.isSelected);
        if (selected.length === 0) return;

        setIsMigrating(true);
        setProgress(0);
        
        let successCount = 0;
        let failCount = 0;

        for (let i = 0; i < selected.length; i++) {
            const person = selected[i];
            try {
                // We use 'all' tag to sync all relevant historical cycles for this person
                await syncPeopleDebtAction(person.id, 'all');
                successCount++;
                
                // Update local state to show migrated status
                setStatusList(prev => prev.map(p => 
                    p.id === person.id ? { ...p, hasCycles: true, isSelected: false } : p
                ));
            } catch (err) {
                console.error(`Migration failed for ${person.name}:`, err);
                failCount++;
            }
            setProgress(((i + 1) / selected.length) * 100);
        }

        toast.success(`Migration completed: ${successCount} success, ${failCount} failed.`);
        setIsMigrating(false);
        setProgress(0);
    };

    const selectedCount = statusList.filter(p => p.isSelected).length;
    const allFilteredSelected = filteredList.length > 0 && filteredList.every(p => p.isSelected);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" className="gap-2 border-indigo-200 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-100">
                        <RotateCw className="h-4 w-4" /> Migration Manager
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden border-slate-200 shadow-2xl rounded-2xl">
                <DialogHeader className="p-6 pb-4 border-b bg-slate-50/50">
                    <div className="flex items-center justify-between gap-3 mb-1">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100">
                                <RotateCw className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-black text-slate-900 tracking-tight">Data Migration Hub</DialogTitle>
                                <DialogDescription className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                    Populating people_debt_cycles collection for legacy data
                                </DialogDescription>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white hover:bg-slate-50"
                                onClick={() => toggleSelectAll(true)}
                                disabled={isMigrating || filteredList.length === 0}
                            >
                                Select All
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100"
                                onClick={() => toggleSelectAll(false)}
                                disabled={isMigrating || selectedCount === 0}
                            >
                                Uncheck All
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Toolbar */}
                    <div className="px-6 py-4 flex items-center gap-4 border-b border-slate-100 bg-white">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <Input 
                                placeholder="Search by name..." 
                                className="pl-10 h-10 border-slate-200 bg-slate-50/50 focus:bg-white rounded-lg text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-slate-50 border-slate-100">
                            <Checkbox 
                                id="onlyMissing" 
                                checked={onlyMissing} 
                                onCheckedChange={(c) => setOnlyMissing(!!c)} 
                            />
                            <label htmlFor="onlyMissing" className="text-[11px] font-black text-slate-600 uppercase cursor-pointer">
                                Unmigrated Only
                            </label>
                        </div>
                    </div>

                    {/* Content List */}
                    <div className="flex-1 overflow-y-auto p-2">
                        <div className="space-y-1">
                            {filteredList.length === 0 ? (
                                <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-3">
                                    <CheckCircle2 className="h-10 w-10 opacity-20" />
                                    <span className="text-sm font-bold uppercase tracking-widest opacity-50">All systems migrated</span>
                                </div>
                            ) : (
                                filteredList.map(person => (
                                    <div 
                                        key={person.id}
                                        className={cn(
                                            "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                                            person.isSelected 
                                                ? "bg-indigo-50/50 border-indigo-200 shadow-sm" 
                                                : person.hasCycles 
                                                    ? "bg-emerald-50/30 border-emerald-100/50 opacity-60" 
                                                    : "bg-white border-slate-100 hover:border-slate-200"
                                        )}
                                        onClick={() => !person.hasCycles && togglePerson(person.id)}
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className={cn(
                                                "h-10 w-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                                                person.hasCycles ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"
                                            )}>
                                                {person.hasCycles ? <CheckCircle2 className="h-5 w-5" /> : <User className="h-5 w-5" />}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-black text-slate-900 truncate tracking-tight">{person.name}</span>
                                                <span className="text-[10px] font-bold text-slate-400 tabular-nums">
                                                    Balance: {person.balance.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 shrink-0">
                                            {person.hasCycles ? (
                                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">Synced</span>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-1 rounded">Missing</span>
                                                    <Checkbox 
                                                        checked={person.isSelected} 
                                                        onCheckedChange={() => togglePerson(person.id)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 border-t bg-slate-50/50 block">
                    {isMigrating && (
                        <div className="mb-6 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[11px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                                    <Loader2 className="h-3 w-3 animate-spin" /> 
                                    Migrating data streams...
                                </span>
                                <span className="text-sm font-black text-slate-900 tabular-nums">{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-2.5 bg-slate-200" />
                        </div>
                    )}

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 flex flex-col">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target population</span>
                           <span className="text-sm font-black text-slate-900 tracking-tight leading-none mt-0.5">
                                {selectedCount === 0 ? "Select people to begin" : `Migrating ${selectedCount} profiles`}
                           </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" className="h-11 px-6 font-black uppercase text-[11px] tracking-widest text-slate-500" onClick={() => setOpen(false)} disabled={isMigrating}>
                                Cancel
                            </Button>
                            <Button 
                                className="h-11 px-8 gap-2 bg-slate-900 hover:bg-black text-white font-black uppercase text-[11px] tracking-widest shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-50"
                                onClick={handleMigrate}
                                disabled={selectedCount === 0 || isMigrating}
                            >
                                {isMigrating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4 fill-white" />}
                                Run Migrate
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
