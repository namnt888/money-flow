/**
 * PocketBase Subscription Service
 * Provides subscription (services) and service members read/write operations from PocketBase
 * Collection IDs: pvl_sub_001 (subscriptions), pvl_smb_001 (service_members)
 */

import { pocketbaseList, pocketbaseGetById, pocketbaseCreate, pocketbaseUpdate, pocketbaseDelete, toPocketBaseId } from './server';

export const SUBSCRIPTIONS_COLLECTION = 'pvl_sub_001';
export const SERVICE_MEMBERS_COLLECTION = 'pvl_smb_001';

export type PocketBaseSubscription = {
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
  expand?: {
    shop_id?: any;
    default_category_id?: any;
  };
};

export type PocketBaseServiceMember = {
  id: string;
  service_id: string;
  person_id: string;
  slots: number;
  is_owner: boolean;
  expand?: {
    person_id?: any;
  };
};

/**
 * Map PB Subscription to domain Subscription type
 */
function mapSubscription(record: PocketBaseSubscription) {
  return {
    id: record.id,
    name: record.name,
    price: Number(record.price),
    currency: record.currency || 'VND',
    cycle_interval: record.cycle_interval || 1,
    next_billing_date: record.next_billing_date,
    shop_id: record.shop_id,
    default_category_id: record.default_category_id,
    note_template: record.note_template,
    is_active: record.is_active,
    max_slots: record.max_slots,
    last_distribution_date: record.last_distribution_date,
    next_distribution_date: record.next_distribution_date,
    distribution_status: record.distribution_status,
    shop: record.expand?.shop_id ? { id: record.expand.shop_id.id, name: record.expand.shop_id.name } : null,
    category: record.expand?.default_category_id ? { id: record.expand.default_category_id.id, name: record.expand.default_category_id.name } : null,
  };
}

/**
 * Map PB Service Member to domain ServiceMember type
 */
function mapServiceMember(record: PocketBaseServiceMember) {
  return {
    id: record.id,
    service_id: record.service_id,
    person_id: record.person_id,
    slots: record.slots || 1,
    is_owner: record.is_owner || false,
    person: record.expand?.person_id ? { 
      id: record.expand.person_id.id, 
      name: record.expand.person_id.name,
      image_url: record.expand.person_id.image_url 
    } : null,
  };
}

/**
 * Fetch all active subscriptions from PocketBase
 */
export async function getPocketBaseSubscriptions() {
  const result = await pocketbaseList<PocketBaseSubscription>(SUBSCRIPTIONS_COLLECTION, {
    filter: 'is_active=true',
    expand: 'shop_id,default_category_id',
    perPage: 100,
  });
  
  return result.items.map(mapSubscription);
}

/**
 * Fetch subscription members
 */
export async function getPocketBaseServiceMembers(serviceId: string) {
  const result = await pocketbaseList<PocketBaseServiceMember>(SERVICE_MEMBERS_COLLECTION, {
    filter: `service_id='${serviceId}'`,
    expand: 'person_id',
    perPage: 100,
  });
  
  return result.items.map(mapServiceMember);
}

/**
 * Fetch subscription by ID
 */
export async function getPocketBaseSubscriptionById(id: string) {
  const record = await pocketbaseGetById<PocketBaseSubscription>(SUBSCRIPTIONS_COLLECTION, id, 'shop_id,default_category_id');
  return mapSubscription(record);
}

/**
 * Upsert subscription in PocketBase
 */
export async function upsertPocketBaseSubscription(data: Partial<PocketBaseSubscription> & { id?: string }) {
  if (data.id) {
    const pbId = toPocketBaseId(data.id);
    return await pocketbaseUpdate<PocketBaseSubscription>(SUBSCRIPTIONS_COLLECTION, pbId, data);
  } else {
    return await pocketbaseCreate<PocketBaseSubscription>(SUBSCRIPTIONS_COLLECTION, data);
  }
}

/**
 * Delete subscription from PocketBase
 */
export async function deletePocketBaseSubscription(id: string) {
  const pbId = toPocketBaseId(id);
  
  // Also delete members
  const members = await getPocketBaseServiceMembers(pbId);
  await Promise.all(members.map(m => pocketbaseDelete(SERVICE_MEMBERS_COLLECTION, m.id)));
  
  return await pocketbaseDelete(SUBSCRIPTIONS_COLLECTION, pbId);
}

/**
 * Update service members in PocketBase
 */
export async function updatePocketBaseServiceMembers(serviceId: string, members: any[]) {
  const pbServiceId = toPocketBaseId(serviceId);
  
  // Get existing members
  const existingMembersResult = await pocketbaseList<PocketBaseServiceMember>(SERVICE_MEMBERS_COLLECTION, {
    filter: `service_id='${pbServiceId}'`,
  });
  const existingMembers = existingMembersResult.items;
  
  // Identify members to delete
  const incomingPersonIds = new Set(members.map(m => toPocketBaseId(m.person_id)));
  const toDelete = existingMembers.filter(m => !incomingPersonIds.has(m.person_id));
  
  await Promise.all(toDelete.map(m => pocketbaseDelete(SERVICE_MEMBERS_COLLECTION, m.id)));
  
  // Identify members to upsert
  for (const member of members) {
    const pbPersonId = toPocketBaseId(member.person_id);
    const existing = existingMembers.find(m => m.person_id === pbPersonId);
    
    const payload = {
      service_id: pbServiceId,
      person_id: pbPersonId,
      slots: member.slots || 1,
      is_owner: !!member.is_owner,
    };
    
    if (existing) {
      await pocketbaseUpdate(SERVICE_MEMBERS_COLLECTION, existing.id, payload);
    } else {
      await pocketbaseCreate(SERVICE_MEMBERS_COLLECTION, payload);
    }
  }
}
