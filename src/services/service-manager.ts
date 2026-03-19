'use server'

import { SYSTEM_ACCOUNTS, SYSTEM_CATEGORIES } from '@/lib/constants'
import { toLegacyMMMYYFromDate, toYYYYMMFromDate } from '@/lib/month-tag'
import { autoSyncCycleSheetIfNeeded } from './sheet.service'
import { 
  getPocketBaseSubscriptions, 
  getPocketBaseSubscriptionById, 
  getPocketBaseServiceMembers,
  upsertPocketBaseSubscription,
  deletePocketBaseSubscription,
  updatePocketBaseServiceMembers
} from './pocketbase/subscription.service'
import {
  getPocketBaseBots,
  togglePocketBaseBot,
  updatePocketBaseBotConfig,
  updatePocketBaseBotLastRun
} from './pocketbase/bot-config.service'
import { createPocketBaseTransaction, loadPocketBaseTransactions, voidPocketBaseTransaction } from './pocketbase/transaction.service'

export type ServiceMember = {
  id: string;
  service_id: string;
  person_id: string; // Foreign key to people.id
  slots: number;
  is_owner: boolean;
  person?: {
    id: string;
    name: string;
    image_url?: string;
  }
};

export type Subscription = {
  id: string;
  name: string;
  price: number;
  currency: string;
  cycle_interval: number;
  next_billing_date: string | null;
  shop_id: string | null;
  default_category_id: string | null;
  note_template: string | null;
  is_active: boolean;
  max_slots: number | null;
  last_distribution_date: string | null;
  next_distribution_date: string | null;
  distribution_status: string | null;
  shop?: { id: string, name: string } | null;
  category?: { id: string, name: string } | null;
};

export async function upsertService(
  serviceData: any,
  members?: any[]
) {
  const service = await upsertPocketBaseSubscription(serviceData);

  if (members && service) {
    await updatePocketBaseServiceMembers(service.id, members);
  }

  return service;
}

export async function distributeService(serviceId: string, customDate?: string, customNoteFormat?: string) {
  console.log('[PB] Distributing service:', serviceId)

  // Step 1: Calculate Math
  // Fetch Service + Members from PocketBase
  const service = await getPocketBaseSubscriptionById(serviceId);
  const members = await getPocketBaseServiceMembers(serviceId);

  if (!service) {
    throw new Error('Service not found in PocketBase');
  }

  const initialPrice = service.price || 0
  const computedTotalSlots = members.reduce((sum, member) => sum + (Number(member.slots) || 0), 0)
  const totalSlots = service.max_slots && service.max_slots > 0 ? service.max_slots : computedTotalSlots

  if (totalSlots === 0) {
    throw new Error('Total slots is zero, cannot distribute.')
  }
  const unitCost = initialPrice / totalSlots
  console.log('[PB] Unit cost:', unitCost)

  // Timezone Fix: Force Asia/Ho_Chi_Minh
  const now = new Date();
  const vnNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
  const transactionDate = customDate ? new Date(customDate).toISOString() : vnNow.toISOString()

  // Tag Format: YYYY-MM
  const dateObj = new Date(transactionDate)
  const monthTag = toYYYYMMFromDate(dateObj)
  const legacyMonthTag = toLegacyMMMYYFromDate(dateObj)

  const createdTransactions: any[] = []

  for (const member of members) {
    const cost = unitCost * member.slots
    if (cost === 0) continue;

    const pricePerSlot = Math.round(unitCost);
    let note = '';
    const templateToUse = customNoteFormat || service.note_template;

    if (templateToUse) {
      note = templateToUse
        .replace('{service}', service.name)
        .replace('{member}', (member as any).person?.name || 'Unknown')
        .replace('{name}', service.name)
        .replace('{slots}', member.slots.toString())
        .replace('{date}', monthTag)
        .replace('{price}', pricePerSlot.toLocaleString())
        .replace('{initialPrice}', initialPrice.toLocaleString())
        .replace('{total_slots}', totalSlots.toString());
    } else {
      note = `${(member as any).person?.name || 'Unknown'} ${monthTag} Slot: ${member.slots} (${pricePerSlot.toLocaleString()})/${totalSlots}`
    }

    const canonicalMetadata = {
      service_id: serviceId,
      member_id: member.person_id,
      month_tag: monthTag,
      type: 'service_distribution'
    };

    const personId = member.is_owner ? null : member.person_id;

    const payload: any = {
      occurred_at: transactionDate,
      note: note,
      amount: -cost, // Expense is negative
      type: personId ? 'debt' : 'expense',
      account_id: SYSTEM_ACCOUNTS.DRAFT_FUND,
      category_id: SYSTEM_CATEGORIES.ONLINE_SERVICES,
      person_id: personId,
      shop_id: service.shop_id,
      metadata: canonicalMetadata,
      persisted_cycle_tag: monthTag
    };

    // Idempotency Check in PocketBase
    const existingTxns = await loadPocketBaseTransactions({
      accountId: SYSTEM_ACCOUNTS.DRAFT_FUND,
      includeVoided: true,
      limit: 10
    });

    // Filter manually as PB filter might be limited for complex metadata
    const existingTx = existingTxns.find(tx => {
      const meta = tx.metadata as any;
      return meta?.service_id === serviceId && 
             meta?.member_id === member.person_id && 
             (meta?.month_tag === monthTag || meta?.month_tag === legacyMonthTag);
    });

    let transactionId = existingTx?.id;
    let oldStatus = (existingTx as any)?.metadata?.status || 'posted';

    if (transactionId) {
      console.log('[PB] Updating existing transaction:', transactionId);
      await createPocketBaseTransaction({ // Use create as upsert if possible, but transaction service usually has distinct update
        ...payload,
        id: transactionId
      } as any); // TODO: Ensure updatePocketBaseTransaction is used if it exists
      // Check if update exists in transaction service
      const { updatePocketBaseTransaction } = await import('./pocketbase/transaction.service');
      await updatePocketBaseTransaction(transactionId, payload);
    } else {
      console.log('[PB] Creating new transaction for:', (member as any).person?.name);
      transactionId = await createPocketBaseTransaction(payload) || '';
    }

    if (transactionId) {
      createdTransactions.push({ id: transactionId });

      // Sync to Google Sheet (using existing service)
      if (personId) {
        try {
          const { syncTransactionToSheet } = await import('./sheet.service');
          const sheetPayload = {
            id: transactionId,
            occurred_at: transactionDate,
            note: note,
            tag: monthTag,
            amount: cost,
            type: 'Debt',
            shop_name: service.name || 'Service',
          };

          const action = (transactionId && existingTx && oldStatus !== 'void') ? 'update' : 'create';
          await syncTransactionToSheet(personId, sheetPayload as any, action as any);
        } catch (syncError) {
          console.error('[PB] Sheet sync error:', syncError);
        }
      }
    }
  }

  // Update service status in PB
  const nextMonth = new Date(now)
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  nextMonth.setDate(1) // Default to 1st

  await upsertPocketBaseSubscription({
    id: serviceId,
    last_distribution_date: now.toISOString(),
    next_distribution_date: nextMonth.toISOString(),
    distribution_status: 'completed'
  });

  // Trigger full sheet sync for members
  const memberIds = Array.from(new Set(members.map(m => m.person_id).filter(Boolean)))
  const { syncAllTransactions } = await import('./sheet.service')
  for (const memberId of memberIds) {
    try {
      await syncAllTransactions(memberId)
    } catch (e) {
      console.error('[PB] Full sync failed for:', memberId, e)
    }
  }

  return { transactions: createdTransactions, personIds: memberIds };
}

export async function getServices() {
  return await getPocketBaseSubscriptions();
}

export async function deleteService(serviceId: string) {
  await deletePocketBaseSubscription(serviceId);
}

export async function updateServiceMembers(
  serviceId: string,
  members: any[]
) {
  await updatePocketBaseServiceMembers(serviceId, members);
}

export async function getServiceById(id: string) {
  return await getPocketBaseSubscriptionById(id);
}

export async function getServiceBotConfig(serviceId: string) {
  const bots = await getPocketBaseBots();
  const key = `service_${serviceId}`;
  return bots.find(b => b.key === key) || null;
}

export async function saveServiceBotConfig(serviceId: string, config: any) {
  // Check if exists
  const bots = await getPocketBaseBots();
  const key = `service_${serviceId}`;
  const existing = bots.find(b => b.key === key);
  
  const payload = {
    key: key,
    name: `Bot for Service ${serviceId}`,
    is_enabled: config.isEnabled,
    config: config
  };

  if (existing) {
    await updatePocketBaseBotConfig(key, config);
  } else {
    // Need a create in bot-config.service if not found
    const { pocketbaseCreate, BOT_CONFIGS_COLLECTION } = await import('./pocketbase/bot-config.service');
    await pocketbaseCreate(BOT_CONFIGS_COLLECTION, payload);
  }
  return true
}

/**
 * Distribute all active services for the current or custom month.
 * @param customDate Optional date to distribute for (if null, uses current month)
 * @param force If true, skips the due_day check (useful for manual distribution)
 */
export async function distributeAllServices(customDate?: string, force: boolean = true) {
  let successCount = 0
  let skippedCount = 0
  let failedCount = 0
  const reports: any[] = []

  // Timezone Fix: Force Asia/Ho_Chi_Minh
  const now = new Date();
  const vnNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
  const todayDay = vnNow.getDate();

  const activeDate = customDate ? new Date(customDate) : vnNow;
  const monthTag = toYYYYMMFromDate(activeDate);

  console.log(`[PB] distributeAllServices for ${monthTag} (Force: ${force}, Today ${todayDay})`);

  // 1. Fetch all active services from PocketBase
  const services = await getPocketBaseSubscriptions();
  const activeServices = services.filter(s => s.is_active);

  if (activeServices.length === 0) {
    console.log('[PB] No active services found.');
    return { success: 0, failed: 0, skipped: 0, total: 0, reports: [] }
  }

  // 2. Load all draft fund transactions for idempotency check
  const existingTxns = await loadPocketBaseTransactions({
    accountId: SYSTEM_ACCOUNTS.DRAFT_FUND,
    includeVoided: false,
    limit: 500
  });

  // 3. Distribute each service
  for (const service of activeServices) {
    try {
      // Due Day Check (Assumed from note_template or default 1)
      const dueDay = 1; // PocketBase schema doesn't have due_day yet, defaulting to 1
      const checkDay = customDate ? activeDate.getDate() : todayDay;

      if (!force && checkDay < dueDay) {
        skippedCount++;
        reports.push({ name: service.name, status: 'skipped', reason: `Due on day ${dueDay}` });
        continue;
      }

      // Idempotency Check in PB transactions
      const alreadyDistributed = existingTxns.some(tx => {
        const meta = tx.metadata as any;
        return meta?.service_id === service.id && meta?.month_tag === monthTag;
      });

      if (alreadyDistributed) {
        skippedCount++;
        reports.push({ name: service.name, status: 'skipped', reason: 'Already distributed' });
        continue;
      }

      const result = await distributeService(service.id, customDate)

      if (result.transactions && result.transactions.length > 0) {
        successCount++
        reports.push({ name: service.name, status: 'success', count: result.transactions.length });

        // Auto-sync cycle sheets
        if (result.personIds) {
          for (const personId of result.personIds) {
            await autoSyncCycleSheetIfNeeded(personId, monthTag);
          }
        }
      } else {
        skippedCount++
        reports.push({ name: service.name, status: 'skipped', reason: 'No members' });
      }

    } catch (err: any) {
      console.error(`[PB] Failed: ${service.name}:`, err)
      failedCount++
      reports.push({ name: service.name, status: 'failed', reason: err.message });
    }
  }

  return {
    success: successCount,
    failed: failedCount,
    skipped: skippedCount,
    total: activeServices.length,
    reports
  }
}

/**
 * Recall (revoke) service distribution for a specific month
 * Voids the transactions and triggers sheet line deletion
 */
export async function recallServiceDistribution(monthTag: string) {
  console.log('[PB] Recalling distribution for:', monthTag);
  
  const transactions = await loadPocketBaseTransactions({
    accountId: SYSTEM_ACCOUNTS.DRAFT_FUND,
    includeVoided: false,
    limit: 500
  });

  const toRecall = transactions.filter(tx => {
    const meta = tx.metadata as any;
    return meta?.month_tag === monthTag && meta?.service_id;
  });

  console.log(`[PB] Found ${toRecall.length} transactions to recall`);

  for (const tx of toRecall) {
    await voidPocketBaseTransaction(tx.id);
    
    // Sync to sheet as deleted
    const meta = tx.metadata as any;
    const personId = (tx as any).person_id || meta?.member_id;
    if (personId) {
      try {
        const { syncTransactionToSheet } = await import('./sheet.service');
        await syncTransactionToSheet(personId, { id: tx.id } as any, 'delete');
      } catch (e) {
        console.error('[PB] Recall sheet sync failed:', e);
      }
    }
  }

  return { count: toRecall.length };
}
