import { pocketbaseList } from '@/services/pocketbase/server';
import { PB_COLLECTIONS } from '@/lib/pocketbase/collections';

const ALIAS_MAP: Record<string, string> = {
  'hd': 'hdbank',
  'hdbank': 'hdbank',
  'lady': 'vpbank_lady',
  'supercard': 'vib_supercard',
  'vib': 'vib',
  'vcb': 'vietcombank',
  'tech': 'techcombank',
  'techcom': 'techcombank'
};

export async function resolveAccount(query: string) {
  const normalized = query.toLowerCase();
  
  // 1. Check direct alias
  for (const [alias, slug] of Object.entries(ALIAS_MAP)) {
    if (normalized.includes(alias)) {
      const records = await pocketbaseList(PB_COLLECTIONS.ACCOUNTS, {
        filter: `slug = '${slug}' || name ~ '${slug}'`,
        perPage: 1
      });
      if (records.items.length > 0) return records.items[0];
    }
  }

  // 2. Fallback: Search by name
  const records = await pocketbaseList(PB_COLLECTIONS.ACCOUNTS, {
    filter: `name ~ '${query}'`,
    perPage: 1
  });
  
  return records.items.length > 0 ? records.items[0] : null;
}