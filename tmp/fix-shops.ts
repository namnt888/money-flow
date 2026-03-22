import { pocketbaseList, pocketbaseUpdate } from '../src/services/pocketbase/server';

async function fixShops() {
    try {
        console.log('Fetching shops...');
        const shopsRaw = await pocketbaseList('shops', { filter: 'name ~ "youtube" || name ~ "icloud"' });
        const shops = shopsRaw.items as any[];
        console.log(`Found ${shops.length} shops.`);
        
        const youtubeShop = shops.find(s => s.name.toLowerCase().includes('youtube'));
        const icloudShop = shops.find(s => s.name.toLowerCase().includes('icloud'));
        
        if (!youtubeShop) console.warn('Youtube shop not found');
        if (!icloudShop) console.warn('iCloud shop not found');
        
        console.log('Fetching transactions with missing shop_id...');
        const txnsRaw = await pocketbaseList('transactions', { 
            filter: '(note ~ "youtube" || note ~ "icloud") && (shop_id = null || shop_id = "")',
            perPage: 200
        });
        const txns = txnsRaw.items as any[];
        console.log(`Found ${txns.length} transactions to fix.`);
        
        for (const txn of txns) {
            const note = (txn.note || '').toLowerCase();
            let newShopId = '';
            
            if (note.includes('youtube') && youtubeShop) {
                newShopId = youtubeShop.id;
            } else if (note.includes('icloud') && icloudShop) {
                newShopId = icloudShop.id;
            }
            
            if (newShopId) {
                console.log(`Updating txn ${txn.id} (note: ${txn.note}) with shop ${newShopId}`);
                await pocketbaseUpdate('transactions', txn.id, { shop_id: newShopId });
            }
        }
        console.log('Done!');
    } catch (error) {
        console.error('Error fixing shops:', error);
    }
}

fixShops();
