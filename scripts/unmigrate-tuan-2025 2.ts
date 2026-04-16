
import { pocketbaseList, pocketbaseDelete } from '../src/services/pocketbase/server';

async function unmigrate() {
    console.log('🧹 Starting Un-migration (Cleaning up migrated data)...');
    
    try {
        // Find all transactions with the migration flag
        const response = await pocketbaseList<any>('pvl_txn_001', {
            filter: 'metadata.migrated = true && person_id = "wlv4acbrq11l8de"',
            perPage: 500
        });
        
        const items = response.items || [];
        console.log(`Found ${items.length} migrated entries to delete.`);
        
        let deletedCount = 0;
        for (const item of items) {
            try {
                await pocketbaseDelete('pvl_txn_001', item.id);
                console.log(`🗑️ Deleted: ${item.note} (${item.id})`);
                deletedCount++;
            } catch (err: any) {
                console.error(`❌ Failed to delete ${item.id}:`, err.message);
            }
        }
        
        console.log(`\n✨ Clean up finished! Successfully deleted ${deletedCount}/${items.length} entries.`);
    } catch (err: any) {
        console.error('❌ Un-migration failed:', err.message);
    }
}

unmigrate().catch(console.error);
