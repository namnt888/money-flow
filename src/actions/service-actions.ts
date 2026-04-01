'use server'

import { 
  upsertService, 
  distributeService, 
  deleteService, 
  updateServiceMembers, 
  getServiceBotConfig, 
  saveServiceBotConfig, 
  distributeAllServices,
  recallServiceDistribution,
  getServices,
  getGlobalServiceBotConfig,
  saveGlobalServiceBotConfig
} from '@/services/service-manager'
import { processBatchInstallments } from '@/services/installment.service'
import { revalidatePath } from 'next/cache'
import { SYSTEM_ACCOUNTS, SYSTEM_CATEGORIES } from '@/lib/constants'
import { pocketbaseList, pocketbaseUpdate, pocketbaseCreate, toPocketBaseId } from '@/services/pocketbase/server'

// TODO: Define a proper type for members
export async function updateServiceMembersAction(
  serviceId: string,
  members: any[]
) {
  await updateServiceMembers(serviceId, members)
  // revalidatePath('/services') // Disable to prevent loop
}

export async function upsertServiceAction(serviceData: any) {
  try {
    const result = await upsertService(serviceData)
    revalidatePath('/services')
    revalidatePath(`/services/${(result as any).id}`)
    return { success: true, data: result }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function distributeServiceAction(
  serviceId: string, 
  customDate?: string, 
  customNoteFormat?: string, 
  source: string = 'manual'
) {
  try {
    const result = await distributeService(serviceId, customDate, customNoteFormat, '', { source })
    
    // Recalculate balance for DRAFT_FUND as it's the account used
    const { recalculateBalance } = await import('@/services/account.service')
    await recalculateBalance(toPocketBaseId(SYSTEM_ACCOUNTS.DRAFT_FUND, 'accounts'))

    revalidatePath('/services')
    revalidatePath('/')
    revalidatePath('/transactions')
    return { success: true, ...result }
  } catch (error: any) {
    return { success: false, error: error.message, transactions: [] }
  }
}

export async function deleteServiceAction(serviceId: string) {
  try {
    await deleteService(serviceId)
    revalidatePath('/services')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getServiceBotConfigAction(serviceId: string) {
  return await getServiceBotConfig(serviceId)
}

export async function saveServiceBotConfigAction(serviceId: string, config: any) {
  const result = await saveServiceBotConfig(serviceId, config)
  revalidatePath(`/services/${serviceId}`)
  return result
}

export async function getGlobalServiceBotConfigAction() {
  return await getGlobalServiceBotConfig()
}

export async function saveGlobalServiceBotConfigAction(config: any) {
  const result = await saveGlobalServiceBotConfig(config)
  revalidatePath('/services')
  return result
}

export async function confirmServicePaymentAction(serviceId: string, accountId: string, amount: number, date: string, monthTag: string) {
  const metadata = {
    service_id: serviceId,
    month_tag: monthTag,
    type: 'service_payment'
  }

  // Check for existing payment in PB
  const filter = `metadata.service_id="${serviceId}" && metadata.month_tag="${monthTag}" && metadata.type="service_payment"`
  const existingRes = await pocketbaseList<any>('transactions', {
    filter,
    perPage: 1
  })

  const existingTx = existingRes.items[0]
  let transactionId = existingTx?.id

  // Single Table Architecture: Transfer from Bank (accountId) to Draft Fund
  const pbSourceAccountId = toPocketBaseId(accountId, 'accounts')
  const pbTargetAccountId = toPocketBaseId(SYSTEM_ACCOUNTS.DRAFT_FUND, 'accounts')
  const pbCategoryId = toPocketBaseId(SYSTEM_CATEGORIES.ONLINE_SERVICES, 'categories')

  const payload = {
    occurred_at: new Date(date).toISOString(),
    note: `Payment for Service ${monthTag}`,
    tag: monthTag,
    type: 'transfer',
    status: 'posted',
    account_id: pbSourceAccountId,               // Source: Real Bank
    to_account_id: pbTargetAccountId, // Target: Draft Fund
    amount: -Math.abs(amount),           // Outflow from source
    category_id: pbCategoryId,
    metadata: metadata,
    person_id: null,
    shop_id: null
  }

  if (existingTx) {
    // Update existing transaction
    await pocketbaseUpdate('transactions', transactionId, payload)
  } else {
    // Create new transaction
    const transaction = await pocketbaseCreate<any>('transactions', payload)
    transactionId = transaction.id
  }

  // Recalculate balances for both accounts
  const { recalculateBalance } = await import('@/services/account.service')
  await Promise.all([
    recalculateBalance(pbSourceAccountId),
    recalculateBalance(pbTargetAccountId)
  ])

  revalidatePath(`/services/${serviceId}`)
  revalidatePath('/accounts')
  return { success: true }
}

export async function getServicePaymentStatusAction(serviceId: string, monthTag: string) {
  const filter = `metadata.service_id="${serviceId}" && metadata.month_tag="${monthTag}" && metadata.type="service_payment"`
  const res = await pocketbaseList<any>('transactions', {
    filter,
    perPage: 1
  })

  const transaction = res.items[0]

  if (!transaction) {
    return { confirmed: false, amount: 0 }
  }

  // In single table, amount is negative for transfer source.
  // We want to return positive amount paid.
  const amount = Math.abs(Number(transaction.amount))

  return { confirmed: true, amount: amount, transactionId: transaction.id }
}

export async function runAllServiceDistributionsAction(customDate?: string, options: { isTest?: boolean, source?: string } = {}) {
  console.log('[Action] runAllServiceDistributionsAction started', { customDate, options });
  try {
    const noteSuffix = options.isTest ? ' #Test' : '';
    const result = await distributeAllServices(customDate, options.isTest, noteSuffix, { source: options.source });

    // Recalculate DRAFT_FUND balance after mass distribution
    const { recalculateBalance } = await import('@/services/account.service')
    await recalculateBalance(toPocketBaseId(SYSTEM_ACCOUNTS.DRAFT_FUND, 'accounts'))

    // Also run Installment Batch Processing
    try {
      await processBatchInstallments(undefined) // Pass undefined for date to use current date
    } catch (e) {
      console.error('Error processing installments:', e)
    }

    revalidatePath('/services')
    revalidatePath('/')
    revalidatePath('/transactions')
    return result
  } catch (error: any) {
    console.error('Error running all distributions:', error)
    return { success: 0, failed: 0, skipped: 0, total: 0, reports: [], error: error.message }
  }
}

export async function recallServiceDistributionAction(monthTag: string) {
  try {
    const result = await recallServiceDistribution(monthTag)

    // Recalculate balance for DRAFT_FUND
    const { recalculateBalance } = await import('@/services/account.service')
    await recalculateBalance(toPocketBaseId(SYSTEM_ACCOUNTS.DRAFT_FUND, 'accounts'))

    revalidatePath('/services')
    revalidatePath('/transactions')
    revalidatePath('/')

    return { success: true, count: result.count }
  } catch (error: any) {
    console.error('Error recalling service distribution:', error)
    return { success: false, error: error.message }
  }
}

export async function getServicesAction() {
  return await getServices()
}
