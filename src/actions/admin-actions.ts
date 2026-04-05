'use server'

import { pocketbaseGetById, pocketbaseList, toPocketBaseId } from '@/services/pocketbase/server'
import { recalculateBalance } from '@/services/account.service'
import { revalidatePath } from 'next/cache'

type AccountSnapshot = {
    id: string
    name: string
    type: string
    parent_account_id?: string | null
    current_balance?: number | null
}

export async function fixAllAccountBalances() {
    try {
        // 1. Get all accounts from PB
        const response = await pocketbaseList<any>('accounts', {
            perPage: 500
        });
        const accounts = response.items;

        if (!accounts || accounts.length === 0) {
            return { success: true, message: 'No accounts found' }
        }

        // 2. Recalculate each account
        let successCount = 0
        let failCount = 0

        for (const account of accounts) {
            try {
                // recalculateBalance already uses PocketBase internal
                const result = await recalculateBalance(account.id)
                if (result) successCount++
                else failCount++
            } catch (e) {
                console.error(`[DB:PB] Failed to recalculate account ${account.name} (${account.id})`, e)
                failCount++
            }
        }

        revalidatePath('/accounts')

        return {
            success: true,
            message: `Recalculated ${successCount} accounts. Failed: ${failCount}`
        }
    } catch (error: any) {
        console.error('[DB:PB] Error in fixAllAccountBalances:', error)
        return { success: false, error: error.message }
    }
}

export async function syncSingleAccountBalanceAudit(accountId: string) {
    const logs: string[] = []
    const startedAt = new Date().toISOString()
    logs.push(`[${startedAt}] START syncSingleAccountBalanceAudit accountId=${accountId}`)

    try {
        const allResponse = await pocketbaseList<AccountSnapshot>('accounts', {
            perPage: 500,
            fields: 'id,name,type,parent_account_id,current_balance',
        })
        const allAccounts = allResponse.items || []

        const targetPbId = toPocketBaseId(accountId, 'accounts')
        const selected = allAccounts.find((item) => item.id === targetPbId)
        if (!selected) {
            logs.push(`[${new Date().toISOString()}] ERROR account not found for id=${accountId}, pbId=${targetPbId}`)
            return { success: false, error: 'Account not found', logs, affected: [] as any[] }
        }

        const rootParentId = selected.parent_account_id || selected.id
        const familyAccounts = allAccounts.filter(
            (item) => item.id === rootParentId || item.parent_account_id === rootParentId,
        )

        const affected: Array<{
            id: string
            name: string
            type: string
            beforeBalance: number
            afterBalance: number
            success: boolean
            error?: string
        }> = []

        logs.push(
            `[${new Date().toISOString()}] FAMILY root=${rootParentId}, members=${familyAccounts.length}: ${familyAccounts.map((a) => `${a.name}(${a.id})`).join(', ')}`,
        )

        for (const member of familyAccounts) {
            const beforeBalance = Number(member.current_balance || 0)
            logs.push(`[${new Date().toISOString()}] RECALC start ${member.name} (${member.id}) before=${beforeBalance}`)

            try {
                const recalculated = await recalculateBalance(member.id)
                const fresh = await pocketbaseGetById<AccountSnapshot>('accounts', member.id, undefined, 'id,name,type,current_balance')
                const afterBalance = Number(fresh?.current_balance || 0)
                logs.push(
                    `[${new Date().toISOString()}] RECALC done ${member.name} (${member.id}) ok=${recalculated} after=${afterBalance} delta=${afterBalance - beforeBalance}`,
                )

                affected.push({
                    id: member.id,
                    name: member.name,
                    type: member.type,
                    beforeBalance,
                    afterBalance,
                    success: Boolean(recalculated),
                })
            } catch (memberError: any) {
                const message = memberError?.message || String(memberError)
                logs.push(`[${new Date().toISOString()}] RECALC failed ${member.name} (${member.id}) error=${message}`)
                affected.push({
                    id: member.id,
                    name: member.name,
                    type: member.type,
                    beforeBalance,
                    afterBalance: beforeBalance,
                    success: false,
                    error: message,
                })
            }
        }

        revalidatePath('/accounts')
        logs.push(`[${new Date().toISOString()}] DONE family sync complete`)
        return {
            success: true,
            logs,
            rootParentId,
            affected,
        }
    } catch (error: any) {
        const message = error?.message || String(error)
        logs.push(`[${new Date().toISOString()}] FATAL ${message}`)
        return {
            success: false,
            error: message,
            logs,
            affected: [] as any[],
        }
    }
}
