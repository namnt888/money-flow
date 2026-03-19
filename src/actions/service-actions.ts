'use server'

import { upsertService, distributeService, deleteService, updateServiceMembers, getServiceBotConfig, saveServiceBotConfig, distributeAllServices } from '@/services/service-manager'
import { processBatchInstallments } from '@/services/installment.service'
import { revalidatePath } from 'next/cache'
import { SYSTEM_ACCOUNTS, SYSTEM_CATEGORIES } from '@/lib/constants'
import { createPocketBaseTransaction, loadPocketBaseTransactions, updatePocketBaseTransaction } from '@/services/pocketbase/transaction.service'

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

export async function distributeServiceAction(serviceId: string, customDate?: string, customNoteFormat?: string) {
  try {
    const result = await distributeService(serviceId, customDate, customNoteFormat)

    // Recalculate balance for DRAFT_FUND as it's the account used
    const { recalculateBalance } = await import('@/services/account.service')
    await recalculateBalance(SYSTEM_ACCOUNTS.DRAFT_FUND)

    revalidatePath('/services')
    revalidatePath('/')
    revalidatePath('/transactions')
    return { success: true, transactions: result.transactions }
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

export async function confirmServicePaymentAction(serviceId: string, accountId: string, amount: number, date: string, monthTag: string) {
  const metadata = {
    service_id: serviceId,
    month_tag: monthTag,
    type: 'service_payment'
  }

  // Check for existing payment in PocketBase
  const existingTxns = await loadPocketBaseTransactions({
    accountId: accountId,
    includeVoided: false,
    limit: 10
  });

  const existingTx = existingTxns.find(tx => {
    const meta = tx.metadata as any;
    return meta?.service_id === serviceId && meta?.month_tag === monthTag && meta?.type === 'service_payment';
  });

  // Transfer from Bank (accountId) to Draft Fund
  const payload: any = {
    occurred_at: new Date(date).toISOString(),
    note: `Payment for Service ${monthTag}`,
    tag: monthTag, // Mapping to persisted_cycle_tag in payload builder
    type: 'transfer',
    account_id: accountId,               // Source: Real Bank
    target_account_id: SYSTEM_ACCOUNTS.DRAFT_FUND, // Target: Draft Fund
    amount: -Math.abs(amount),           // Outflow from source
    category_id: SYSTEM_CATEGORIES.ONLINE_SERVICES,
    metadata: metadata,
    person_id: null,
    shop_id: null,
    persisted_cycle_tag: monthTag
  }

  let transactionId = existingTx?.id;

  if (transactionId) {
    await updatePocketBaseTransaction(transactionId, payload);
  } else {
    transactionId = await createPocketBaseTransaction(payload) || '';
  }

  // Recalculate balances for both accounts
  const { recalculateBalance } = await import('@/services/account.service')
  await Promise.all([
    recalculateBalance(accountId),
    recalculateBalance(SYSTEM_ACCOUNTS.DRAFT_FUND)
  ])

  revalidatePath(`/services/${serviceId}`)
  revalidatePath('/accounts')
  return { success: true }
}

export async function getServicePaymentStatusAction(serviceId: string, monthTag: string) {
  const transactions = await loadPocketBaseTransactions({
    accountId: SYSTEM_ACCOUNTS.DRAFT_FUND,
    includeVoided: false,
    limit: 100
  });

  const transaction = transactions.find(tx => {
    const meta = tx.metadata as any;
    return meta?.service_id === serviceId && meta?.month_tag === monthTag && meta?.type === 'service_payment';
  });

  if (!transaction) {
    return { confirmed: false, amount: 0 }
  }

  const amount = Math.abs(transaction.amount)
  return { confirmed: true, amount: amount, transactionId: transaction.id }
}


export async function runAllServiceDistributionsAction(date?: string) {
  try {
    const result = await distributeAllServices(date)

    // Recalculate DRAFT_FUND balance after mass distribution
    const { recalculateBalance } = await import('@/services/account.service')
    await recalculateBalance(SYSTEM_ACCOUNTS.DRAFT_FUND)

    // Also run Installment Batch Processing
    try {
      await processBatchInstallments(date)
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
    const { recallServiceDistribution } = await import('@/services/service-manager')
    const result = await recallServiceDistribution(monthTag)

    // Recalculate balance for DRAFT_FUND
    const { recalculateBalance } = await import('@/services/account.service')
    await recalculateBalance(SYSTEM_ACCOUNTS.DRAFT_FUND)

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
  const { getServices } = await import('@/services/service-manager')
  return await getServices()
}
