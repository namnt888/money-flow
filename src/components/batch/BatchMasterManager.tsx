'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, Edit2, Loader2, AlertCircle, Search } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { deleteBatchMasterItemAction, getBatchMasterItemsAction, updateBatchMasterItemAction } from '@/actions/batch-master.actions'
import { listBatchPhasesAction } from '@/actions/batch-phases.actions'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { BatchMasterItemSlide } from './BatchMasterItemSlide'
import { createBatchPhaseAction, updateBatchPhaseAction, deleteBatchPhaseAction, listBatchPhasesAction as listPhasesServerAction } from '@/actions/batch-phases.actions'
import { Settings2, XCircle, Settings, PlusCircle, ArrowRight, Check, Clock, CalendarCheck } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Sheet as PhaseSheet,
    SheetContent as PhaseSheetContent,
    SheetHeader as PhaseSheetHeader,
    SheetTitle as PhaseSheetTitle,
    SheetFooter as PhaseSheetFooter,
} from "@/components/ui/sheet"
import { Select as CustomSelect } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { DayOfMonthPicker } from '@/components/ui/day-of-month-picker'

interface BatchMasterManagerProps {
    bankType: 'MBB' | 'VIB'
    accounts: any[]
    categories?: any[]
    bankMappings: any[]
    phasesOverride?: any[]
    initialPhaseId?: string | null
    onPhasesChange?: () => void
}

export function BatchMasterManager({ 
    bankType, 
    accounts, 
    categories = [], 
    bankMappings, 
    phasesOverride, 
    initialPhaseId = null,
    onPhasesChange
}: BatchMasterManagerProps) {
    const [items, setItems] = useState<any[]>([])
    const [phases, setPhases] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isSlideOpen, setIsSlideOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<any | null>(null)

    const [searchQuery, setSearchQuery] = useState('')
    
    // Phase Management State
    const [isPhaseEditDialogOpen, setIsPhaseEditDialogOpen] = useState(false)
    const [isPhaseDeleteDialogOpen, setIsPhaseDeleteDialogOpen] = useState(false)
    const [editingPhase, setEditingPhase] = useState<any | null>(null)
    const [isSavingPhase, setIsSavingPhase] = useState(false)
    
    // New Phase fields
    const [phaseLabel, setPhaseLabel] = useState('')
    const [phaseCutoffDay, setPhaseCutoffDay] = useState(15)
    const [phasePeriodType, setPhasePeriodType] = useState<'before' | 'after'>('before')
    
    // Delete Phase fields
    const [phaseToDelete, setPhaseToDelete] = useState<any | null>(null)
    const [moveItemsToPhaseId, setMoveItemsToPhaseId] = useState<string | null>(null)
    const [isDeletingPhase, setIsDeletingPhase] = useState(false)

    useEffect(() => {
        loadItems()
    }, [bankType])

    useEffect(() => {
        if (phasesOverride && phasesOverride.length > 0) {
            setPhases(phasesOverride)
        }
    }, [phasesOverride])

    const filteredItems = items.filter(i => {
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        return (
            i.receiver_name?.toLowerCase().includes(query) ||
            i.bank_name?.toLowerCase().includes(query) ||
            i.bank_number?.toLowerCase().includes(query)
        )
    })

    async function loadItems() {
        setLoading(true)
        try {
            const [itemsResult, phasesResult] = await Promise.all([
                getBatchMasterItemsAction(bankType),
                phasesOverride && phasesOverride.length > 0
                    ? Promise.resolve({ success: true, data: phasesOverride })
                    : listBatchPhasesAction(bankType)
            ])
            if (itemsResult.success) {
                setItems(itemsResult.data || [])
            }
            if (phasesResult.success) {
                setPhases(phasesResult.data || [])
            }
        } catch (error) {
            console.error('Info: Failed to load master items', error)
        } finally {
            setLoading(false)
        }
    }

    function handleAdd() {
        setSelectedItem(null)
        setIsSlideOpen(true)
    }

    function handleEdit(item: any) {
        setSelectedItem(item)
        setIsSlideOpen(true)
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this master item?')) return

        try {
            const result = await deleteBatchMasterItemAction(id)
            if (result.success) {
                toast.success('Item removed')
                setItems(prev => prev.filter(i => i.id !== id))
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    // Phase Action Handlers
    function handleOpenAddPhase() {
        setEditingPhase(null)
        setPhaseLabel('Before 15')
        setPhaseCutoffDay(15)
        setPhasePeriodType('before')
        setIsPhaseEditDialogOpen(true)
    }

    function handleOpenEditPhase(phase: any, e: React.MouseEvent) {
        e.stopPropagation()
        setEditingPhase(phase)
        setPhaseLabel(phase.label)
        setPhaseCutoffDay(phase.cutoff_day)
        setPhasePeriodType(phase.period_type)
        setIsPhaseEditDialogOpen(true)
    }

    // Auto-update Label when type or day changes
    useEffect(() => {
        if (!isPhaseEditDialogOpen) return; // Only update while editing
        
        const typeStr = phasePeriodType === 'before' ? 'Before' : 'After'
        const newLabel = `${typeStr} ${phaseCutoffDay || ''}`.trim()
        
        // Only auto-update if label was empty, matches the current auto-format, or we're adding a new phase
        // Actually, user requested "không nhập tay name nữa", so we just force it.
        setPhaseLabel(newLabel)
    }, [phasePeriodType, phaseCutoffDay, isPhaseEditDialogOpen])

    async function handleSavePhase() {
        if (!phaseLabel.trim()) return
        setIsSavingPhase(true)
        try {
            let result;
            if (editingPhase) {
                result = await updateBatchPhaseAction(editingPhase.id, {
                    label: phaseLabel,
                    cutoffDay: phaseCutoffDay,
                    periodType: phasePeriodType
                })
            } else {
                result = await createBatchPhaseAction({
                    bankType,
                    label: phaseLabel,
                    cutoffDay: phaseCutoffDay,
                    periodType: phasePeriodType
                })
            }

            if (result.success) {
                toast.success(editingPhase ? 'Phase updated' : 'Phase created')
                setIsPhaseEditDialogOpen(false)
                loadItems() // Refresh all
                onPhasesChange?.()
            } else {
                toast.error(result.error || 'Failed to save phase')
            }
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setIsSavingPhase(false)
        }
    }

    function handleInitiateDeletePhase(phase: any, e: React.MouseEvent) {
        e.stopPropagation()
        const itemsInPhase = items.filter(i => i.phase_id === phase.id || (!i.phase_id && i.cutoff_period === phase.period_type))
        
        if (itemsInPhase.length > 0) {
            setPhaseToDelete({ ...phase, itemsCount: itemsInPhase.length })
            setMoveItemsToPhaseId(phases.find(p => p.id !== phase.id)?.id || null)
            setIsPhaseDeleteDialogOpen(true)
        } else {
            // No items, can delete directly or confirm
            if (confirm(`Delete phase "${phase.label}"?`)) {
                executeDeletePhase(phase.id)
            }
        }
    }

    async function executeDeletePhase(id: string, moveToId?: string | null) {
        setIsDeletingPhase(true)
        try {
            // If we need to move items first
            if (moveToId) {
                const itemsToMove = items.filter(i => i.phase_id === id || (!i.phase_id && i.cutoff_period === (phaseToDelete?.period_type)))
                
                for (const item of itemsToMove) {
                    await updateBatchMasterItemAction(item.id, { phase_id: moveToId })
                }
                toast.info(`Moved ${itemsToMove.length} items to new phase`)
            }

            const result = await deleteBatchPhaseAction(id)
            if (result.success) {
                toast.success('Phase deleted')
                setIsPhaseDeleteDialogOpen(false)
                loadItems()
                onPhasesChange?.()
            }
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setIsDeletingPhase(false)
        }
    }

    if (loading) {
        return (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p>Loading master list...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Master List ({bankType})</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Define recurring payment targets for the 12-month grid.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Plus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600 z-10" />
                        <Button onClick={handleAdd} size="sm" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100 font-bold text-xs h-10 px-6 pl-10 rounded-xl">
                            ADD TARGET
                        </Button>
                    </div>
                </div>
            </div>


            <Tabs defaultValue={initialPhaseId || phases[0]?.id || 'before'} className="w-full">
                <div className="flex items-center gap-2 mb-2 overflow-x-auto no-scrollbar pb-1">
                    <TabsList className="bg-slate-100 p-1 rounded-2xl h-14 shadow-inner border border-slate-200 justify-start w-fit">
                        {phases.length > 0 ? phases.map((phase) => (
                            (() => {
                                const phaseCount = filteredItems.filter(i => i.phase_id === phase.id || (!i.phase_id && i.cutoff_period === phase.period_type)).length
                                return (
                                    <TabsTrigger
                                        key={phase.id}
                                        value={phase.id}
                                        className="group relative rounded-xl px-4 h-full shrink-0 border border-transparent data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:border-indigo-700 data-[state=active]:shadow-md font-black text-xs uppercase tracking-widest transition-all"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>{phase.label}</span>
                                            <span className={cn(
                                                "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[9px] leading-none transition-colors",
                                                "border-slate-300/70 bg-white/70 text-slate-500 group-data-[state=active]:border-indigo-400/50 group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white"
                                            )}>
                                                {phaseCount}
                                            </span>
                                        </div>
                                    </TabsTrigger>
                                )
                            })()
                        )) : ['before', 'after'].map(p => (
                            <TabsTrigger
                                key={p}
                                value={p}
                                className="rounded-xl px-8 h-full shrink-0 border border-transparent data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:border-indigo-700 data-[state=active]:shadow-md font-black text-xs uppercase tracking-widest transition-all"
                            >
                                {p === 'before' ? 'Phase 1' : 'Phase 2'}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleOpenAddPhase}
                        className="h-14 w-14 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all shrink-0"
                    >
                        <PlusCircle className="h-5 w-5" />
                    </Button>
                </div>

                {(phases.length > 0 ? phases : [{ id: 'before', period_type: 'before', label: 'Phase 1' }, { id: 'after', period_type: 'after', label: 'Phase 2' }]).map((phase: any) => (
                    <TabsContent key={phase.id} value={phase.id} className="mt-6 space-y-6">
                        {/* Phase Header with Search & Info */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                    <Settings2 className="h-5 w-5 text-indigo-600" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{phase.label || 'Phase Detail'}</h4>
                                        <div className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            phase.period_type === 'before' ? "bg-blue-500" : "bg-amber-500"
                                        )} />
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                        Cutoff Day: {phase.cutoff_day || 15} • {phase.period_type === 'before' ? 'Early Cycle' : 'Late Cycle'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 ml-2">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={(e) => handleOpenEditPhase(phase, e)}
                                        className="h-8 w-8 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                                    >
                                        <Edit2 className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={(e) => handleInitiateDeletePhase(phase, e)}
                                        className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>

                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search in phase..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 h-10 bg-slate-50 border-transparent hover:bg-white hover:border-slate-200 transition-all rounded-xl text-xs font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {filteredItems.filter(i => phases.length > 0
                                ? (i.phase_id === phase.id || (!i.phase_id && i.cutoff_period === phase.period_type))
                                : i.cutoff_period === phase.period_type
                            ).length === 0 ? (
                                <div className="text-center py-16 border-2 border-dashed rounded-3xl border-slate-100 bg-slate-50/50">
                                    <p className="text-sm font-bold text-slate-400 italic">No targets found in this phase.</p>
                                </div>
                            ) : (
                                filteredItems.filter(i => phases.length > 0
                                    ? (i.phase_id === phase.id || (!i.phase_id && i.cutoff_period === phase.period_type))
                                    : i.cutoff_period === phase.period_type
                                ).map(item => (
                                    <div
                                        key={item.id}
                                        className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-sm transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-none bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                                                {item.accounts?.image_url ? (
                                                    <img src={item.accounts.image_url} alt="" className="w-full h-full object-contain rounded-none" />
                                                ) : (
                                                    <div className="font-black text-[12px] text-slate-400 uppercase tracking-tighter">
                                                        {item.bank_name?.substring(0, 3)}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-black text-slate-900 uppercase tracking-tight text-sm">{item.receiver_name}</span>
                                                    <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-100 text-[9px] font-black px-1.5 h-4 uppercase tracking-wider">
                                                        {item.bank_name}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <span className="text-[11px] font-bold text-slate-400 tabular-nums">{item.bank_number}</span>
                                                    {item.accounts ? (
                                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600/70">
                                                            <div className="w-1 h-1 rounded-full bg-emerald-400" />
                                                            {item.accounts.name}
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500/70">
                                                            <AlertCircle className="h-2.5 w-2.5" /> Missing Account Link
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl" onClick={() => handleEdit(item)}>
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl" onClick={() => handleDelete(item.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            <BatchMasterItemSlide
                isOpen={isSlideOpen}
                onOpenChange={setIsSlideOpen}
                bankType={bankType}
                accounts={accounts}
                categories={categories}
                bankMappings={bankMappings}
                item={selectedItem}
                onSuccess={loadItems}
                phases={phases}
            />

            {/* Phase Edit Sheet (Slide) */}
            <PhaseSheet open={isPhaseEditDialogOpen} onOpenChange={setIsPhaseEditDialogOpen}>
                <PhaseSheetContent className="w-full sm:max-w-md overflow-y-auto bg-slate-50 p-0 flex flex-col">
                    <PhaseSheetHeader className="p-6 bg-indigo-600 text-white shrink-0">
                        <div className="bg-indigo-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg border border-indigo-400">
                             <Settings2 className="h-6 w-6" />
                        </div>
                        <PhaseSheetTitle className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                            {editingPhase ? 'Update Phase' : 'New Phase'}
                        </PhaseSheetTitle>
                        <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest mt-1">Configuring payment cycle windows</p>
                    </PhaseSheetHeader>
                    
                    <div className="flex-1 p-6 space-y-8 bg-white">
                        {/* Auto-Label Display */}
                        <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex flex-col items-center justify-center text-center shadow-inner">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Generated Label</span>
                            <div className="text-3xl font-black text-indigo-600 tracking-tighter uppercase px-6 py-2 bg-white rounded-2xl shadow-sm border border-slate-100">
                                {phaseLabel}
                            </div>
                        </div>

                        {/* Period Type Picker */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <ArrowRight className="h-3 w-3" />
                                Selection Period
                            </label>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div 
                                    onClick={() => setPhasePeriodType('before')}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-6 rounded-[32px] border-2 cursor-pointer transition-all gap-2",
                                        phasePeriodType === 'before' 
                                            ? "bg-indigo-50 border-indigo-600 ring-2 ring-indigo-100 shadow-lg shadow-indigo-100" 
                                            : "bg-white border-slate-100 hover:border-indigo-200"
                                    )}
                                >
                                    <div className={cn(
                                        "h-10 w-10 rounded-xl flex items-center justify-center",
                                        phasePeriodType === 'before' ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-slate-100 text-slate-400"
                                    )}>
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <span className={cn("font-black uppercase tracking-tight text-sm", phasePeriodType === 'before' ? "text-indigo-900" : "text-slate-400")}>Early Cycle</span>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">1st - 15th Approx.</span>
                                </div>

                                <div 
                                    onClick={() => setPhasePeriodType('after')}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-6 rounded-[32px] border-2 cursor-pointer transition-all gap-2",
                                        phasePeriodType === 'after' 
                                            ? "bg-indigo-50 border-indigo-600 ring-2 ring-indigo-100 shadow-lg shadow-indigo-100" 
                                            : "bg-white border-slate-100 hover:border-indigo-200"
                                    )}
                                >
                                    <div className={cn(
                                        "h-10 w-10 rounded-xl flex items-center justify-center",
                                        phasePeriodType === 'after' ? "bg-amber-600 text-white shadow-lg shadow-amber-100" : "bg-slate-100 text-slate-400"
                                    )}>
                                        <CalendarCheck className="h-6 w-6" />
                                    </div>
                                    <span className={cn("font-black uppercase tracking-tight text-sm", phasePeriodType === 'after' ? "text-indigo-900" : "text-slate-400")}>Late Cycle</span>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">16th - End Approx.</span>
                                </div>
                            </div>
                        </div>

                        {/* Cutoff Day Selection */}
                        <div className="space-y-3 pb-8">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <ArrowRight className="h-3 w-3" />
                                Status Cutoff Day
                            </label>
                            
                            <div className="bg-slate-50 p-4 rounded-[32px] border border-slate-100">
                                <DayOfMonthPicker 
                                    value={phaseCutoffDay} 
                                    onChange={(day) => day && setPhaseCutoffDay(day)} 
                                    className="h-14 rounded-[20px] bg-white border-slate-200 font-black text-indigo-600 text-lg shadow-sm focus:ring-indigo-500" 
                                />
                                <p className="text-[9px] font-bold text-slate-400 text-center mt-3 uppercase tracking-wider px-4 leading-relaxed">
                                    Determines when items in this phase are considered "Past Due" or transition between months.
                                </p>
                            </div>
                        </div>
                    </div>

                    <PhaseSheetFooter className="p-6 bg-slate-50 border-t flex flex-col gap-2 shrink-0">
                        <Button 
                            onClick={handleSavePhase} 
                            disabled={!phaseLabel.trim() || isSavingPhase}
                            className="w-full h-16 rounded-[24px] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-200"
                        >
                            {isSavingPhase ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            {editingPhase ? 'Update Phase Window' : 'Create Phase Window'}
                        </Button>
                        <Button 
                            variant="ghost" 
                            onClick={() => setIsPhaseEditDialogOpen(false)} 
                            className="w-full h-10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600"
                        >
                            Cancel
                        </Button>
                    </PhaseSheetFooter>
                </PhaseSheetContent>
            </PhaseSheet>

            {/* Phase Delete Dialog with Move logic */}
            <Dialog open={isPhaseDeleteDialogOpen} onOpenChange={setIsPhaseDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-[32px] border-none shadow-2xl overflow-hidden p-0">
                    <div className="bg-rose-600 p-6 text-white shrink-0">
                        <DialogTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                            <XCircle className="h-5 w-5" />
                            Delete Phase?
                        </DialogTitle>
                        <p className="text-rose-100 text-[10px] font-bold uppercase tracking-widest mt-1">This phase has items that need a new home</p>
                    </div>

                    <div className="p-6 space-y-6 bg-white">
                        <div className="flex items-start gap-4 p-4 bg-rose-50 rounded-2xl border border-rose-100">
                            <AlertCircle className="h-5 w-5 text-rose-500 mt-0.5" />
                            <div>
                                <h4 className="font-black text-rose-900 text-sm">Critical Warning</h4>
                                <p className="text-rose-700 text-xs mt-1 font-medium leading-relaxed">
                                    Phase <strong>"{phaseToDelete?.label}"</strong> currently contains <strong>{phaseToDelete?.itemsCount}</strong> recurring items. 
                                    You must choose where to move them before deleting.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <ArrowRight className="h-3 w-3" />
                                Destination Phase
                            </label>
                            
                            <div className="grid grid-cols-1 gap-2">
                                {phases.filter(p => p.id !== phaseToDelete?.id).map(p => (
                                    <div 
                                        key={p.id}
                                        onClick={() => setMoveItemsToPhaseId(p.id)}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all",
                                            moveItemsToPhaseId === p.id 
                                                ? "bg-indigo-50 border-indigo-600 ring-2 ring-indigo-100" 
                                                : "bg-white border-slate-100 hover:border-slate-200"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "h-1.5 w-1.5 rounded-full",
                                                p.period_type === 'before' ? "bg-blue-500" : "bg-amber-500"
                                            )} />
                                            <span className="font-black text-slate-900 text-sm">{p.label}</span>
                                        </div>
                                        {moveItemsToPhaseId === p.id && <Check className="h-4 w-4 text-indigo-600" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="p-6 pt-0 bg-white">
                        <Button 
                            variant="ghost" 
                            disabled={isDeletingPhase}
                            onClick={() => setIsPhaseDeleteDialogOpen(false)} 
                            className="h-12 px-6 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-500"
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="destructive"
                            disabled={!moveItemsToPhaseId || isDeletingPhase}
                            onClick={() => executeDeletePhase(phaseToDelete.id, moveItemsToPhaseId)}
                            className="h-12 px-8 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-[11px] uppercase tracking-widest shadow-lg shadow-rose-100"
                        >
                            {isDeletingPhase ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            MOVE & DELETE
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

