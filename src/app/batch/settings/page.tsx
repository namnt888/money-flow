import { BatchSettingsPage } from '@/components/batch/batch-settings-page'
import { getBatchSettingsAction } from '@/actions/batch-settings.actions'
import { getAccountsAction } from '@/actions/account-actions'

export default async function SettingsPage() {
    // Fetch data on the server for faster initial load
    const [mbbResult, vibResult, accounts] = await Promise.all([
        getBatchSettingsAction('MBB'),
        getBatchSettingsAction('VIB'),
        getAccountsAction()
    ])

    const initialSettings = {
        MBB: mbbResult.success ? (mbbResult as any).data : null,
        VIB: vibResult.success ? (vibResult as any).data : null
    }

    return (
        <BatchSettingsPage 
            initialAccounts={Array.isArray(accounts) ? accounts : []} 
            initialSettings={initialSettings}
        />
    )
}
