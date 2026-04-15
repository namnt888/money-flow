
import { pocketbaseList } from '../src/services/pocketbase/server';

async function debug() {
    const PERSON_ID = 'wlv4acbrq11l8de'; // Tuấn
    const filter = `person_id = "${PERSON_ID}" && tag = "2025-12"`;
    
    console.log(`DEBUG: Filter = ${filter}`);
    const response = await pocketbaseList<any>('pvl_txn_001', { filter, perPage: 100 });
    
    console.log(`DEBUG: Found ${response.items.length} records`);
    for (const item of response.items) {
        console.log(`ID: ${item.id} | Note: ${item.note} | AccID: [${item.account_id}]`);
    }
}

debug().catch(console.error);
