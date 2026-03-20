'use server'

import { logSource } from '@/lib/pocketbase/fallback-helpers'
import {
  pocketbaseList,
  pocketbaseGetById,
  pocketbaseRequest,
  toPocketBaseId,
  pocketbaseUpdate,
  pocketbaseCreate,
  pocketbaseDelete
} from './pocketbase/server'
import { Database } from '@/types/database.types'
import { SYSTEM_ACCOUNTS, SYSTEM_CATEGORIES } from '@/lib/constants'
import { toLegacyMMMYYFromDate, toYYYYMMFromDate } from '@/lib/month-tag'
import { autoSyncCycleSheetIfNeeded } from './sheet.service'

// ServiceMember type for service distribution
// Uses person_id to match database schema after migration
type ServiceMember = {
  id: string;
  service_id: string;
  person_id: string; // Foreign key to people.id
  slots: number;
  is_owner: boolean;
  people?: {
    id: string;
    name: string;
    is_owner?: boolean;
    accounts?: any[];
  }
};
type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert'];
type SubscriptionUpdate = Database['public']['Tables']['subscriptions']['Update'];

export async function upsertService(
  serviceData: SubscriptionInsert | SubscriptionUpdate,
  members?: Omit<ServiceMember, 'id' | 'service_id' | 'people'>[]
) {
  const context = `upsertService:${(serviceData as any).name}`;
  logSource('PB', context);

  const pbServiceId = (serviceData as any).id 
    ? toPocketBaseId((serviceData as any).id, 'services') 
    : toPocketBaseId(`${(serviceData as any).name}-${Date.now()}`, 'services');
  
  // 1. Upsert service
  let service: any;
  const isExisting = (serviceData as any).id ? true : false;

  if (isExisting) {
    service = await pocketbaseUpdate('services', pbServiceId, {
      ...serviceData,
      amount: (serviceData as any).price ?? (serviceData as any).amount,
      billing_day: (serviceData as any).due_day ?? (serviceData as any).billing_day,
      shop_id: (serviceData as any).shop_id ? toPocketBaseId((serviceData as any).shop_id, 'shops') : null,
      image_url: (serviceData as any).image_url || null
    });
  } else {
    service = await pocketbaseCreate('services', {
      id: pbServiceId,
      ...serviceData,
      amount: (serviceData as any).price ?? (serviceData as any).amount,
      billing_day: (serviceData as any).due_day ?? (serviceData as any).billing_day,
      shop_id: (serviceData as any).shop_id ? toPocketBaseId((serviceData as any).shop_id, 'shops') : null,
      image_url: (serviceData as any).image_url || null
    });
  }

  const serviceId = service.id;

  if (members) {
    // 2. Delete existing members
    const existingMembers = await pocketbaseList<any>('service_members', {
      filter: `service_id="${serviceId}"`,
      perPage: 100
    });
    for (const m of existingMembers.items) {
      await pocketbaseDelete('service_members', m.id);
    }

    // 3. Insert new members
    for (const member of members) {
      const personId = toPocketBaseId(member.person_id, 'people');
      await pocketbaseCreate('service_members', {
        id: toPocketBaseId(`${serviceId}-${personId}`, 'service_members'),
        service_id: serviceId,
        person_id: personId,
        slots: member.slots,
        is_owner: member.is_owner
      });
    }
  }
  return service;
}

export async function distributeService(
  serviceId: string, 
  customDate?: string, 
  customNoteFormat?: string, 
  noteSuffix: string = '',
  options?: { source?: string }
) {
  const context = `distributeService:${serviceId}`;
  logSource('PB', context);

  try {
    const pbServiceId = toPocketBaseId(serviceId, 'services');
    let service = await pocketbaseGetById<any>('services', pbServiceId, 'shop_id');
    if (!service) throw new Error('Service not found in PB');
    
    // Schema resilience mapping
    service = {
      ...service,
      price: service.price ?? service.amount ?? 0,
      due_day: service.due_day ?? service.billing_day ?? 1,
      shop: service.expand?.shop_id
    };

    const membersRes = await pocketbaseList<any>('service_members', {
      filter: `service_id="${pbServiceId}"`,
      expand: 'person_id'
    });
    
    const members = membersRes.items.map(m => ({
      ...m,
      people: m.expand?.person_id
    })) as unknown as ServiceMember[];

    const initialPrice = service.price ?? service.amount ?? 0;
    const computedTotalSlots = members.reduce((sum, member) => sum + (Number(member.slots) || 0), 0);
    const totalSlots = service.max_slots && service.max_slots > 0 ? service.max_slots : computedTotalSlots;

    if (totalSlots === 0) {
      console.warn(`[Distribute] Service ${service.name} has 0 total slots. Skipping.`);
      throw new Error('Total slots is zero, cannot distribute.');
    }
    const unitCost = initialPrice / totalSlots;

    const now = new Date();
    const vnTimeStr = now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    const vnNow = new Date(vnTimeStr);
    
    const activeDate = customDate ? new Date(customDate) : vnNow;
    const year = activeDate.getFullYear();
    const month = activeDate.getMonth();
    const day = Math.min(service.due_day || 1, 28); 
    const dateObj = new Date(year, month, day, 9, 0, 0); 
    
    const transactionDate = dateObj.toISOString();
    const monthTag = toYYYYMMFromDate(dateObj);
    const createdTransactions: any[] = [];

    for (const member of members) {
      const cost = unitCost * member.slots;
      if (cost === 0) continue;

      let note = '';
      const pricePerSlot = Math.round(unitCost);
      const templateToUse = customNoteFormat || service.note_template;

      if (templateToUse) {
        note = templateToUse
          .replace('{service}', service.name)
          .replace('{member}', member.people?.name || 'Unknown')
          .replace('{name}', service.name)
          .replace('{slots}', member.slots.toString())
          .replace('{date}', monthTag)
          .replace('{price}', pricePerSlot.toLocaleString())
          .replace('{initialPrice}', initialPrice.toLocaleString())
          .replace('{total_slots}', totalSlots.toString());
      } else {
        note = `${member.people?.name || 'Unknown'} ${monthTag} Slot: ${member.slots} (${pricePerSlot.toLocaleString()})/${totalSlots}`;
      }

      if (noteSuffix) {
        note += noteSuffix;
      }

      const canonicalMetadata = { 
        service_id: serviceId, 
        member_id: member.person_id, 
        month_tag: monthTag,
        source: options?.source || 'manual'
      };
      const personId = member.is_owner ? null : member.person_id;

      const pbTxnId = toPocketBaseId(`svc-${serviceId}-${member.person_id}-${monthTag}`, 'transactions');
      const payload = {
        id: pbTxnId,
        date: transactionDate,
        occurred_at: transactionDate,
        note: note,
        description: note,
        metadata: canonicalMetadata,
        tag: monthTag,
        shop_id: service.shop_id,
        amount: -cost,
        final_price: -cost,
        type: personId ? 'debt' : 'expense',
        status: 'posted',
        account_id: toPocketBaseId(SYSTEM_ACCOUNTS.DRAFT_FUND, 'accounts'),
        category_id: toPocketBaseId(SYSTEM_CATEGORIES.ONLINE_SERVICES, 'categories'),
        person_id: personId ? toPocketBaseId(personId, 'people') : null
      };

      const filter = `metadata~"${serviceId}" && metadata~"${member.person_id}" && metadata~"${monthTag}"`;
      const existingTxns = await pocketbaseList<any>('transactions', {
        filter,
        perPage: 1
      });

      let transactionId: string;
      if (existingTxns.items.length > 0) {
        transactionId = existingTxns.items[0].id;
        await pocketbaseUpdate('transactions', transactionId, payload);
      } else {
        const newTx = await pocketbaseCreate<any>('transactions', payload);
        transactionId = newTx.id;
      }

      createdTransactions.push({ id: transactionId });

      if (personId) {
        try {
          const { syncTransactionToSheet } = await import('./sheet.service');
          await syncTransactionToSheet(personId, {
            id: transactionId,
            occurred_at: transactionDate,
            note: note,
            tag: monthTag,
            amount: cost,
            type: 'Debt',
            shop_name: service.name || 'Service'
          } as any, 'create');
        } catch (syncError) {
          console.error('[Sheet Sync] Failed:', syncError);
        }
      }
    }

    const nextMonth = new Date(now);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(service.due_day || 1);

    await pocketbaseUpdate('services', pbServiceId, {
      last_distribution_date: now.toISOString(),
      next_distribution_date: nextMonth.toISOString(),
      distribution_status: 'completed'
    });

    return { transactions: createdTransactions, personIds: Array.from(new Set(members.map(m => m.person_id).filter(Boolean))) };
  } catch (error) {
    console.error(`[DB:PB] ${context} failed`, error);
    throw error;
  }
}

export async function getServices() {
  const context = 'getServices';
  const res = await pocketbaseList<any>('services', {
    sort: 'name',
    expand: 'shop_id'
  });
  // Fetch members for each service
  const services = await Promise.all(res.items.map(async (s) => {
    const membersRes = await pocketbaseList<any>('service_members', {
      filter: `service_id="${s.id}"`,
      expand: 'person_id'
    });
    return {
      ...s,
      price: s.price ?? s.amount ?? 0,
      amount: s.amount ?? s.price ?? 0,
      due_day: s.due_day ?? s.billing_day ?? 1,
      billing_day: s.billing_day ?? s.due_day ?? 1,
      shop: s.expand?.shop_id,
      service_members: membersRes.items.map(m => ({
        ...m,
        person: m.expand?.person_id
      }))
    };
  }));
  return services;
}

export async function deleteService(serviceId: string) {
  const context = `deleteService:${serviceId}`;
  logSource('PB', context);

  const pbId = toPocketBaseId(serviceId, 'services');
  const members = await pocketbaseList<any>('service_members', { filter: `service_id="${pbId}"` });
  for (const m of members.items) {
    await pocketbaseDelete('service_members', m.id);
  }
  await pocketbaseDelete('services', pbId);
}

export async function updateServiceMembers(
  serviceId: string,
  members: Omit<ServiceMember, 'id' | 'service_id' | 'people'>[]
) {
  const context = `updateServiceMembers:${serviceId}`;
  logSource('PB', context);

  const pbId = toPocketBaseId(serviceId, 'services');
  const existing = await pocketbaseList<any>('service_members', { filter: `service_id="${pbId}"` });
  for (const m of existing.items) {
    await pocketbaseDelete('service_members', m.id);
  }
  for (const member of members) {
    const personId = toPocketBaseId(member.person_id, 'people');
    await pocketbaseCreate('service_members', {
      id: toPocketBaseId(`${pbId}-${personId}`, 'service_members'),
      service_id: pbId,
      person_id: personId,
      slots: Number(member.slots) || 0,
      is_owner: member.is_owner
    });
  }
}

export async function getServiceById(id: string) {
  const context = `getServiceById:${id}`;
  const pbId = toPocketBaseId(id, 'services');
  const s = await pocketbaseGetById<any>('services', pbId, 'shop_id');
  const membersRes = await pocketbaseList<any>('service_members', {
    filter: `service_id="${pbId}"`,
    expand: 'person_id'
  });
  return {
    ...s,
    price: s.price ?? s.amount ?? 0,
    amount: s.amount ?? s.price ?? 0,
    due_day: s.due_day ?? s.billing_day ?? 1,
    billing_day: s.billing_day ?? s.due_day ?? 1,
    shop: s.expand?.shop_id,
    service_members: membersRes.items.map(m => ({
      ...m,
      person: m.expand?.person_id
    }))
  };
}

export async function getServiceBotConfig(serviceId: string) {
  const context = `getServiceBotConfig:${serviceId}`;
  const key = `service_${serviceId}`;
  const res = await pocketbaseList<any>('bot_configs', { filter: `key="${key}"`, perPage: 1 });
  return res.items[0] || null;
}

export async function saveServiceBotConfig(serviceId: string, config: any) {
  const context = `saveServiceBotConfig:${serviceId}`;
  logSource('PB', context);

  const key = `service_${serviceId}`;
  const payload = {
    key: key,
    name: `Bot for Service ${serviceId}`,
    is_enabled: config.isEnabled,
    config: config
  };

  const existing = await pocketbaseList<any>('bot_configs', { filter: `key="${key}"`, perPage: 1 });
  if (existing.items.length > 0) {
    await pocketbaseUpdate('bot_configs', existing.items[0].id, payload);
  } else {
    await pocketbaseCreate('bot_configs', payload);
  }
  return true;
}

/**
 * Distribute all active services for the current or custom month.
 * @param customDate Optional date to distribute for (if null, uses current month)
 * @param force If true, skips the due_day check (useful for manual distribution)
 */
export async function distributeAllServices(
  customDate?: string, 
  force: boolean = false, 
  noteSuffix: string = '',
  options?: { source?: string }
) {
  const context = 'distributeAllServices';
  logSource('PB', context);

  try {
    const now = new Date();
    const vnTimeStr = now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    const vnNow = new Date(vnTimeStr);
    const activeDate = customDate ? new Date(customDate) : vnNow;
    const monthTag = toYYYYMMFromDate(activeDate);

    // Get all services to handle null is_active if needed
    const servicesRes = await pocketbaseList<any>('services', { sort: 'name' });
    console.error(`🔴 [DistributeAll] Fetched ${servicesRes.items.length} total services from PB`);
    
    const services = servicesRes.items.filter(s => s.is_active !== false); // Active or null
    console.error(`🔴 [DistributeAll] ${services.length} services after 'is_active !== false' filter`);
    
    if (services.length === 0) {
      console.error('🔴 [DistributeAll] No active services found. Returning early.');
      return { success: 0, failed: 0, skipped: 0, total: 0, reports: [] };
    }

    let successCount = 0, skippedCount = 0, failedCount = 0;
    const reports: any[] = [];

    for (const service of services) {
      try {
        const dueDay = service.due_day || service.billing_day || 1;
        const checkDay = activeDate.getDate();

        if (!force && checkDay < dueDay) {
          skippedCount++;
          console.error(`  - Skipped: Due on day ${dueDay} (current: ${checkDay})`);
          reports.push({ name: service.name, status: 'skipped', reason: `Due on day ${dueDay}` });
          continue;
        }

        const currentPrice = service.price ?? service.amount ?? 0;
        if (currentPrice === 0) {
          skippedCount++;
          console.error(`  - Skipped: Zero Price`);
          reports.push({ name: service.name, status: 'skipped', reason: 'Zero Price' });
          continue;
        }

        // More robust metadata check: look for the exact ID and month tag in metadata keys
        const filter = `status="posted" && metadata.service_id="${service.id}" && metadata.month_tag="${monthTag}"`;
        const existingTx = await pocketbaseList<any>('transactions', {
          filter,
          perPage: 1
        });

        if (existingTx.items.length > 0) {
          skippedCount++;
          console.error(`  - Skipped: Already distributed for ${monthTag} (found transaction ${existingTx.items[0].id})`);
          reports.push({ name: service.name, status: 'skipped', reason: `Already distributed for ${monthTag}` });
          continue;
        }

        console.error(`🔴 [DistributeAll] Triggering distributeService`);        // Standard distribution logic
        const result = await distributeService(service.id, customDate, undefined, noteSuffix, options);
        if (result.transactions?.length > 0) {
          successCount++;
          reports.push({ name: service.name, status: 'success', count: result.transactions.length });
          for (const personId of result.personIds) {
            await autoSyncCycleSheetIfNeeded(personId, monthTag);
          }
        } else {
          skippedCount++;
          reports.push({ name: service.name, status: 'skipped', reason: 'No members' });
        }
      } catch (err) {
        failedCount++;
        reports.push({ name: service.name, status: 'failed', reason: (err as any).message });
      }
    }
    return { success: successCount, failed: failedCount, skipped: skippedCount, total: services.length, reports };
  } catch (error) {
    console.error(`[DB:PB] ${context} failed`, error);
    throw error;
  }
}

/**
 * Recall (revoke) service distribution for a specific month
 * Voids the transactions and triggers sheet line deletion
 */
export async function recallServiceDistribution(monthTag: string) {
  const context = `recallServiceDistribution:${monthTag}`;
  logSource('PB', context);

    const filter = `status="posted" && metadata.month_tag="${monthTag}" && metadata.service_id != ""`;
    const txnsRes = await pocketbaseList<any>('transactions', {
      filter,
    expand: 'shop_id'
  });
  const txns = txnsRes.items;
  if (txns.length === 0) return { success: true, count: 0 };

  const { syncTransactionToSheet } = await import('./sheet.service');
  const { recalculateBalance } = await import('./account.service');
  let recalledCount = 0;

  for (const txn of txns) {
    await pocketbaseUpdate('transactions', txn.id, { status: 'void' });
    recalledCount++;

    if (txn.person_id) {
      const sheetPayload = {
        id: txn.id,
        occurred_at: txn.occurred_at,
        amount: Math.abs(Number(txn.amount)),
        note: txn.note,
        tag: monthTag,
        shop_name: txn.expand?.shop_id?.name || 'Service',
        type: 'Debt'
      };
      await syncTransactionToSheet(txn.person_id, sheetPayload as any, 'delete');
    }
  }
  await recalculateBalance(toPocketBaseId(SYSTEM_ACCOUNTS.DRAFT_FUND, 'accounts'));
  return { success: true, count: recalledCount };
}
