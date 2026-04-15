'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Trash2, Edit2, Loader2, GripVertical, CheckCircle2, Circle, AlertCircle } from 'lucide-react'
import { listAllBatchPhasesAction, createBatchPhaseAction, updateBatchPhaseAction, deleteBatchPhaseAction } from '@/actions/batch-phases.actions'
import { getBatchMasterItemsAction } from '@/actions/batch-master.actions'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

interface BatchPhaseManagerProps {
    bankType: 'MBB' | 'VIB'
    onSuccess?: () => void
}

export function BatchPhaseManager({ bankType, onSuccess }: BatchPhaseManagerProps) {
    const [phases, setPhases] = useState<any[]>([])
    const [masterItems, setMasterItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [editingPhase, setEditingPhase] = useState<any | null>(null)
    const [saving, setSaving] = useState(false)

    // Form state
    const [label, setLabel] = useState('')
    const [periodType, setPeriodType] = useState<'before' | 'after'>('before')
    const [cutoffDay, setCutoffDay] = useState<number>(15)
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([])

    useEffect(() => {
        loadData()
    }, [bankType])

    async function loadData() {
        setLoading(true)
        try {
            const [phasesResult, itemsResult] = await Promise.all([
                listAllBatchPhasesAction(bankType),
                getBatchMasterItemsAction(bankType)
            ])
            if (phasesResult.success) setPhases(phasesResult.data || [])
            if (itemsResult.success) setMasterItems(itemsResult.data || [])
        } catch (error) {
            console.error('Failed to load phase data', error)
        } finally {
            setLoading(false)
        }
    }

    function handleAdd() {
        setEditingPhase(null)
        setLabel('')
        setPeriodType('before')
        setCutoffDay(15)
        setSelectedItemIds([])
        setIsEditing(true)
    }

    function handleEdit(phase: any) {
        setEditingPhase(phase)
        setLabel(phase.label)
        setPeriodType(phase.period_type)
        setCutoffDay(phase.cutoff_day)
        
        // Find items currently linked to this phase
        const linkedIds = masterItems
            .filter(item => item.phase_id === phase.id)
            .map(item => item.id)
        setSelectedItemIds(linkedIds)
        
        setIsEditing(true)
    }

    async function handleSave() {
        if (!label) {
            toast.error('Phase label is required')
            return
        }

        setSaving(true)
        try {
            let result
            if (editingPhase) {
                result = await updateBatchPhaseAction(editingPhase.id, {
                    label,
                    periodType,
                    cutoffDay,
                    itemIds: selectedItemIds
                })
            } else {
                result = await createBatchPhaseAction({
                    bankType,
                    label,
                    periodType,
                    cutoffDay,
                    itemIds: selectedItemIds
                })
            }

            if (result.success) {
                toast.success(editingPhase ? 'Phase updated' : 'Phase created')
                loadData()
                setIsEditing(false)
                if (onSuccess) onSuccess()
            } else {
                toast.error(result.error || 'Failed to save phase')
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this phase? Master items will be unlinked.')) return

        setSaving(true)
        try {
            const result = await deleteBatchPhaseAction(id)
            if (result.success) {
                toast.success('Phase deleted')
                loadData()
                if (onSuccess) onSuccess()
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setSaving(false)
        }
    }

    const toggleItem = (itemId: string) => {
        setSelectedItemIds(prev => 
            prev.includes(itemId) 
                ? prev.filter(id => id !== itemId) 
                : [...prev, itemId]
        )
    }

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                <Loader2 className="h-8 w-8 animate-spin mb-4 text-indigo-500" />
                <p className="text-xs font-black uppercase tracking-widest">Loading Phases...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {!isEditing ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Phases Management</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Define budget periods and link master accounts.</p>
                        </div>
                        <Button onClick={handleAdd} size="sm" className="bg-indigo-600 hover:bg-indigo-700 h-9 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100">
                            <Plus className="h-3.5 w-3.5 mr-2" />
                            New Phase
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {phases.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed rounded-2xl border-slate-100 bg-slate-50/50">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No custom phases defined.</p>
                            </div>
                        ) : (
                            phases.map(phase => (
                                <div 
                                    key={phase.id}
                                    className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border bg-slate-50",
                                            phase.period_type === 'before' ? "text-emerald-600 border-emerald-50" : "text-amber-600 border-amber-50"
                                        )}>
                                            {phase.period_type === 'before' ? 'P1' : 'P2'}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-black text-slate-900 uppercase tracking-tight text-sm">{phase.label}</span>
                                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 border-slate-100">
                                                    Cutoff: {phase.cutoff_day}
                                                </Badge>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                                {masterItems.filter(i => i.phase_id === phase.id).length} linked accounts
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl" onClick={() => handleEdit(phase)}>
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl" onClick={() => handleDelete(phase.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                            {editingPhase ? 'Edit Phase' : 'Create New Phase'}
                        </h4>
                        <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="h-8 px-3 rounded-lg font-bold text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900">
                            Cancel
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phase Label</Label>
                            <Input 
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                placeholder="e.g. Early Phase"
                                className="h-11 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cutoff Day</Label>
                            <Input 
                                type="number"
                                value={cutoffDay}
                                onChange={(e) => setCutoffDay(Number(e.target.value))}
                                min={1}
                                max={31}
                                className="h-11 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Period Type</Label>
                        <Tabs value={periodType} onValueChange={(v: any) => setPeriodType(v)} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-slate-100 rounded-xl p-1 h-11">
                                <TabsTrigger value="before" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-emerald-600">Before Cutoff (P1)</TabsTrigger>
                                <TabsTrigger value="after" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-amber-600">After Cutoff (P2)</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center justify-between">
                            <span>Select Accounts (Master Items)</span>
                            <span className="text-indigo-600">{selectedItemIds.length} selected</span>
                        </Label>
                        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                            {masterItems.length === 0 ? (
                                <p className="text-[10px] text-center py-4 text-slate-400 font-bold uppercase">No master items found for {bankType}</p>
                            ) : (
                                masterItems.map(item => {
                                    const isSelected = selectedItemIds.includes(item.id)
                                    const isOtherLinked = item.phase_id && item.phase_id !== editingPhase?.id
                                    const otherPhaseName = isOtherLinked ? phases.find(p => p.id === item.phase_id)?.label || 'Other' : ''
                                    
                                    return (
                                        <div 
                                            key={item.id}
                                            onClick={() => !isOtherLinked && toggleItem(item.id)}
                                            className={cn(
                                                "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                                                isSelected ? "bg-indigo-50 border-indigo-200 ring-1 ring-indigo-100" : "bg-white border-slate-100 hover:border-slate-200",
                                                isOtherLinked && "opacity-60 cursor-not-allowed grayscale-[0.3]"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-none bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                                                    {item.accounts?.image_url ? (
                                                        <img src={item.accounts.image_url} alt="" className="w-full h-full object-contain" />
                                                    ) : (
                                                        <div className="text-[8px] font-black text-slate-400 uppercase">{item.bank_name?.substring(0, 3)}</div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-bold text-xs text-slate-900 truncate uppercase">{item.receiver_name}</div>
                                                    <div className="text-[9px] text-slate-400 font-bold uppercase truncate">{item.bank_name} • {item.bank_number}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {isOtherLinked && (
                                                    <Badge variant="outline" className="bg-slate-50 text-[8px] font-black uppercase text-slate-400 border-slate-200">
                                                        In: {otherPhaseName}
                                                    </Badge>
                                                )}
                                                {isSelected ? <CheckCircle2 className="h-4 w-4 text-indigo-600" /> : <Circle className="h-4 w-4 text-slate-200" />}
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                        <Button 
                            onClick={handleSave} 
                            disabled={saving} 
                            className="bg-indigo-600 hover:bg-indigo-700 h-11 px-8 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100"
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Phase & Link Accounts'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
