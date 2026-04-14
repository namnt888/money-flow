import { pocketbaseList } from '@/services/pocketbase/server';
import { PB_COLLECTIONS } from '@/lib/pocketbase/collections';

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'shopping': ['mua sắm', 'shopping', 'online'],
  'dining': ['ăn uống', 'nhà hàng', 'dining', 'restaurant'],
  'travel': ['du lịch', 'travel', 'vé máy bay', 'khách sạn'],
  'education': ['giáo dục', 'học tập', 'trường học'],
  'insurance': ['bảo hiểm', 'insurance'],
  'utilities': ['điện nước', 'tiện ích', 'utilities', 'billing']
};

export async function resolveCategory(query: string) {
  const normalized = query.toLowerCase();
  
  // 1. Check keyword map
  for (const [slug, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => normalized.includes(k))) {
      const records = await pocketbaseList(PB_COLLECTIONS.CATEGORIES, {
        filter: `slug = '${slug}'`,
        perPage: 1
      });
      if (records.items.length > 0) return records.items[0];
    }
  }

  // 2. Search by name
  const records = await pocketbaseList(PB_COLLECTIONS.CATEGORIES, {
    filter: `name ~ '${query}'`,
    perPage: 1
  });

  return records.items.length > 0 ? records.items[0] : null;
}