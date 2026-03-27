export const dynamic = 'force-dynamic'

import { getPocketBaseAccounts } from '@/services/pocketbase/account-details.service'
import { getBankMappings } from '@/services/bank.service'
import { getSheetWebhookLinks } from '@/services/webhook-link.service'
import { getCategories } from '@/services/category.service'
import { BatchPageClientV2 } from '@/components/batch/batch-page-client-v2'
import { pocketbaseList } from '@/services/pocketbase/server'

import type { Metadata } from 'next'
import { Suspense } from 'react'
import type { Account, Category } from '@/types/moneyflow.types'

export async function generateMetadata(): Promise<Metadata> {
    const accounts = await getPocketBaseAccounts() as Account[]
    const matched = accounts.find((a) => a.name.toLowerCase().includes('mbb'))
    return {
        title: 'MBB Batch',
        icons: matched?.image_url ? { icon: matched.image_url } : undefined
    }
}

/**
 * MBB Batch page
 */
export default async function MBBBatchPage(props: {
    searchParams: Promise<{ month?: string, period?: string, phase?: string }>
}) {
    const searchParams = await props.searchParams
    const month = searchParams.month
    const bankType = 'MBB'

    const { getBatchesByType, getBatchById, getBatchSettings } = await import('@/services/batch.service')
    const { getAccountsWithActiveInstallments } = await import('@/services/installment.service')

    // 1. Parallel fetch initial metadata
    const [batches, settings, phaseResult, accounts, categories, webhookLinks, bankMappings, activeInstallmentAccounts] = await Promise.all([
        getBatchesByType(bankType),
        getBatchSettings(bankType),
        pocketbaseList<any>('batch_phases', {
            filter: `bank_type = "${bankType}" && is_active = true`,
            sort: 'sort_order',
            perPage: 100,
        }),
        getPocketBaseAccounts() as Promise<Account[]>,
        getCategories() as Promise<Category[]>,
        getSheetWebhookLinks(),
        getBankMappings(bankType),
        getAccountsWithActiveInstallments()
    ])

    const phases = phaseResult.items || []
    const visibleBatches = batches.filter((b) => !b.is_archived)
    const cutoffDay = settings?.cutoff_day || 15
    
    // 2. Determine effective month
    const effectiveMonth = month || (visibleBatches.length > 0 ? [...visibleBatches].sort((a, b) => (b.month_year || '').localeCompare(a.month_year || ''))[0]?.month_year : null)

    // 3. Smart Phase Selection Logic
    let autoSelectedPhaseId: string | null = null
    if (effectiveMonth && !searchParams.phase) {
        try {
            const monthBatches = visibleBatches.filter((b) => b.month_year === effectiveMonth)
            const monthBatchIds = monthBatches.map((b) => b.id)

            if (monthBatchIds.length > 0) {
                const filter = monthBatchIds.length === 1 
                    ? `batch_id = "${monthBatchIds[0]}"`
                    : `(${monthBatchIds.map(id => `batch_id = "${id}"`).join(' || ')})`
                
                // Keep perPage small and use system sort to avoid 400 if possible, 
                // but if it 400s we fallback to first phase
                const latestItemRes = await pocketbaseList<any>('batch_items', {
                    filter,
                    sort: '-updated',
                    perPage: 1,
                }).catch(() => null)
                
                if (latestItemRes?.items && latestItemRes.items.length > 0) {
                    autoSelectedPhaseId = latestItemRes.items[0]?.phase_id || null
                }
            }
        } catch (e: unknown) {
            console.error(`[Smart Phase Selection] Query failed for ${bankType} / ${effectiveMonth}:`, e)
        }
    }

    const selectedPhaseId = searchParams.phase || autoSelectedPhaseId || phases[0]?.id || null
    const selectedPhase = phases.find((phase: any) => phase.id === selectedPhaseId) || null
    const period = searchParams.period || selectedPhase?.period_type || 'before'

    // 4. Identify target batch
    let targetBatchId = null
    if (month) {
        const found = batches.find((b: any) =>
            b.month_year === month
            && (
                (selectedPhaseId && b.phase_id === selectedPhaseId)
                || b.period === period
                || (!b.period && period === 'before')
            ),
        )
        if (found) targetBatchId = found.id
    } else if (visibleBatches.length > 0) {
        const sorted = [...visibleBatches].sort((a: any, b: any) => (b.month_year || '').localeCompare(a.month_year || ''))
        targetBatchId = sorted[0].id
    }

    // 5. Fetch active batch details if needed
    let activeBatch = null
    if (targetBatchId) {
        activeBatch = await getBatchById(targetBatchId)
    }

    return (
        <Suspense fallback={<div className="p-8 text-center text-slate-500 animate-pulse">Loading MBB Batch...</div>}>
            <BatchPageClientV2
                batches={batches}
                accounts={accounts}
                categories={categories}
                bankMappings={bankMappings}
                webhookLinks={webhookLinks}
                bankType={bankType}
                activeBatch={activeBatch}
                activeInstallmentAccounts={activeInstallmentAccounts}
                cutoffDay={cutoffDay}
                globalSheetUrl={settings?.display_sheet_url}
                globalSheetName={settings?.display_sheet_name}
                phases={phases}
                selectedPhaseId={selectedPhaseId}
            />
        </Suspense>
    )
}
