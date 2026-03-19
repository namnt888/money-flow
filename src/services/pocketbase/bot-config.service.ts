/**
 * PocketBase Bot Config Service
 * Provides bot configuration read/write operations from PocketBase
 * Collection ID: pvl_bot_001
 */

import { pocketbaseList, pocketbaseGetById, pocketbaseUpdate, pocketbaseCreate, toPocketBaseId } from './server';
export { pocketbaseList, pocketbaseGetById, pocketbaseUpdate, pocketbaseCreate, toPocketBaseId };

export const BOT_CONFIGS_COLLECTION = 'pvl_bot_001';

export type PocketBaseBotConfig = {
  id: string;
  key: string;
  name: string;
  description: string | null;
  is_enabled: boolean;
  config: any;
  last_run_at: string | null;
};

/**
 * Fetch all bot configurations from PocketBase
 */
export async function getPocketBaseBots(): Promise<PocketBaseBotConfig[]> {
  const result = await pocketbaseList<PocketBaseBotConfig>(BOT_CONFIGS_COLLECTION, {
    sort: 'key',
  });
  return result.items;
}

/**
 * Toggle bot enabled status
 */
export async function togglePocketBaseBot(key: string, isEnabled: boolean) {
  // Find bot by key first
  const result = await pocketbaseList<PocketBaseBotConfig>(BOT_CONFIGS_COLLECTION, {
    filter: `key='${key}'`,
    perPage: 1,
  });
  
  const bot = result.items[0];
  if (!bot) throw new Error(`Bot with key ${key} not found in PocketBase`);
  
  return await pocketbaseUpdate(BOT_CONFIGS_COLLECTION, bot.id, { is_enabled: isEnabled });
}

/**
 * Update bot configuration
 */
export async function updatePocketBaseBotConfig(key: string, config: any) {
  const result = await pocketbaseList<PocketBaseBotConfig>(BOT_CONFIGS_COLLECTION, {
    filter: `key='${key}'`,
    perPage: 1,
  });
  
  const bot = result.items[0];
  if (!bot) throw new Error(`Bot with key ${key} not found in PocketBase`);
  
  return await pocketbaseUpdate(BOT_CONFIGS_COLLECTION, bot.id, { config });
}

/**
 * Update last run time
 */
export async function updatePocketBaseBotLastRun(key: string) {
  const result = await pocketbaseList<PocketBaseBotConfig>(BOT_CONFIGS_COLLECTION, {
    filter: `key='${key}'`,
    perPage: 1,
  });
  
  const bot = result.items[0];
  if (!bot) return;
  
  return await pocketbaseUpdate(BOT_CONFIGS_COLLECTION, bot.id, { last_run_at: new Date().toISOString() });
}
