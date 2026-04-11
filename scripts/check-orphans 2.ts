
import { pocketbaseGetById } from '../src/services/pocketbase/server';

async function check() {
    const ids = ['hk10cfr1lusxorn', '3qr9j8dghueety7', '9tka6n6i1ce3jla', 'cu2294996oatqd2', 'f1s8c9c58a73wn7', 'npdueo399lci3fz', 'q96vgmie74rbl3o', '21fg0jezha0vvw2'];
    
    console.log('--- Checking Accounts ---');
    for (const id of ids) {
        try {
            const acc = await pocketbaseGetById('pvl_acc_001', id);
            console.log(`[${id}] FOUND: ${acc.name}`);
        } catch (e) {
            console.log(`[${id}] MISSING`);
        }
    }
}

check().catch(console.error);
