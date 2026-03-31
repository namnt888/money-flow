
import { pocketbaseList, pocketbaseUpdate } from '../src/services/pocketbase/server';

const PERSON_ID = 'wlv4acbrq11l8de'; // Tuấn
const BROKEN_ACCOUNT_ID = '9t34268e37m21m5';
const FALLBACK_ACCOUNT_ID = '04ytttr0nifvnif'; // Draft Fund

async function rescue() {
    console.log(`🔍 Searching for orphaned transactions linked to broken account ${BROKEN_ACCOUNT_ID}...`);
    
    try {
        const response = await pocketbaseList<any>('pvl_txn_001', {
            filter: `account_id = "${BROKEN_ACCOUNT_ID}" && person_id = "${PERSON_ID}"`,
            perPage: 500
        });
        
        const items = response.items || [];
        console.log(`Found ${items.length} orphaned entries.`);
        
        if (items.length === 0) {
            console.log('No orphaned transactions found. Maybe they have a different broken ID?');
            return;
        }

        let fixedCount = 0;
        for (const item of items) {
            try {
                await pocketbaseUpdate('pvl_txn_001', item.id, {
                    account_id: FALLBACK_ACCOUNT_ID
                });
                console.log(`✅ Fixed: ${item.note} (${item.date}) -> Linked to Draft Fund`);
                fixedCount++;
            } catch (err: any) {
                console.error(`❌ Failed to fix ${item.id}:`, err.message);
            }
        }
        
        console.log(`\n🎉 Rescue finished! Successfully fixed ${fixedCount}/${items.length} entries.`);
        console.log('Now please check the Audit Dialog again.');
        
    } catch (err: any) {
        console.error('❌ Rescue failed:', err.message);
    }
}

rescue().catch(console.error);
