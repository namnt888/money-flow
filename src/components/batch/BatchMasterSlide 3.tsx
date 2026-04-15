'use client'

import { useState, useEffect, useMemo } from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { BatchMasterManager } from '@/components/batch/BatchMasterManager'
import { Sparkles, Settings } from 'lucide-react'
import { listAllBatchPhasesAction } from '@/actions/batch-phases.actions'
import { cn } from '@/lib/utils'

interface BatchMasterSlideProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    bankType: 'MBB' | 'VIB'
    accounts: any[]
    categories?: any[]
    bankMappings: any[]
    initialPhaseId?: string | null
}

export function BatchMasterSlide({
    open,
    onOpenChange,
    bankType,
    accounts,
    categories = [],
    bankMappings,
    initialPhaseId = null
}: BatchMasterSlideProps) {
    const [phases, setPhases] = useState<any[]>([])

    // Sort phases for consistent UI
    const sortedPhases = useMemo(() => {
        return [...phases].sort((a: any, b: any) => {
            if (a.period_type !== b.period_type) return a.period_type === 'before' ? -1 : 1
            return (a.cutoff_day || 0) - (b.cutoff_day || 0)
        })
    }, [phases])
    const [loadingPhases, setLoadingPhases] = useState(true)

    useEffect(() => {
        if (open) {
            loadPhases()
        }
    }, [open, bankType])

    async function loadPhases() {
        setLoadingPhases(true)
        const result = await listAllBatchPhasesAction(bankType)
        if (result.success) setPhases((result as any).data || [])
        setLoadingPhases(false)
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-4xl overflow-y-auto bg-slate-50 p-0 transition-all duration-300">
                <SheetHeader className="p-6 pb-4 border-b bg-white top-0 sticky z-10 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <SheetTitle className="flex items-center gap-2 text-xl font-black tracking-tight">
                                <Sparkles className="w-5 h-5 text-indigo-600" />
                                Master Template Checklist - {bankType}
                            </SheetTitle>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                Global Recurring Payment Targets & Phase Management
                            </p>
                        </div>
                        <div className="h-8 px-3 rounded-xl text-[9px] font-black uppercase tracking-widest gap-1.5 transition-colors bg-indigo-50 text-indigo-600 border border-indigo-100 inline-flex items-center shadow-sm">
                            <Settings className="h-3.5 w-3.5" />
                            Management Mode
                        </div>
                    </div>
                </SheetHeader>

                <div className="p-6 pb-32">
                    {/* Master Targets Manager */}
                    <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden p-6">
                        <BatchMasterManager
                            bankType={bankType}
                            accounts={accounts}
                            categories={categories}
                            bankMappings={bankMappings}
                            phasesOverride={sortedPhases}
                            initialPhaseId={initialPhaseId}
                            onPhasesChange={loadPhases}
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
