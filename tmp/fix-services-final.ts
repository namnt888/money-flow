async function fixServicesAndShops() {
    const POCKETBASE_URL = 'https://api-db.reiwarden.io.vn';
    const EMAIL = 'namnt05@gmail.com';
    const PASSWORD = 'Thanhnam0@';

    try {
        console.log('Authenticating...');
        const authRes = await fetch(`${POCKETBASE_URL}/api/collections/_superusers/auth-with-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identity: EMAIL, password: PASSWORD })
        });
        const { token } = (await authRes.json()) as any;
        console.log('Authenticated.');

        // 1. Find Shops
        console.log('Fetching shops for Youtube and iCloud...');
        const shopsRes = await fetch(`${POCKETBASE_URL}/api/collections/shops/records?filter=(name~"youtube"||name~"icloud"||name~"apple")`, {
            headers: { 'Authorization': token }
        });
        const { items: shops } = (await shopsRes.json()) as any;
        console.log('Shops found:', shops.map((s: any) => ({ id: s.id, name: s.name })));

        const youtubeShop = shops.find((s: any) => s.name.toLowerCase().includes('youtube'));
        const icloudShop = shops.find((s: any) => s.name.toLowerCase().includes('icloud') || s.name.toLowerCase().includes('apple'));

        // 2. Find Services
        console.log('Fetching services...');
        const servicesRes = await fetch(`${POCKETBASE_URL}/api/collections/services/records?perPage=100`, {
            headers: { 'Authorization': token }
        });
        const { items: services } = (await servicesRes.json()) as any;
        
        const youtubeService = services.find((s: any) => s.name.toLowerCase().includes('youtube'));
        const icloudService = services.find((s: any) => s.name.toLowerCase().includes('icloud') || s.name.toLowerCase().includes('apple'));

        if (youtubeService && youtubeShop) {
            console.log(`Updating Youtube Service (${youtubeService.id}) with shop ${youtubeShop.id}`);
            await fetch(`${POCKETBASE_URL}/api/collections/services/records/${youtubeService.id}`, {
                method: 'PATCH',
                headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                body: JSON.stringify({ shop_id: youtubeShop.id })
            });
        }

        if (icloudService && icloudShop) {
            console.log(`Updating iCloud Service (${icloudService.id}) with shop ${icloudShop.id}`);
            await fetch(`${POCKETBASE_URL}/api/collections/services/records/${icloudService.id}`, {
                method: 'PATCH',
                headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                body: JSON.stringify({ shop_id: icloudShop.id })
            });
        }

        // 3. Update Transactions
        console.log('Fetching transactions with service_id in metadata...');
        const txnsRes = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?perPage=200&sort=-created`, {
            headers: { 'Authorization': token }
        });
        const { items: txns } = (await txnsRes.json()) as any;
        console.log(`Checking ${txns.length} recent transactions...`);

        const serviceShopMap = new Map();
        if (youtubeService && youtubeShop) serviceShopMap.set(youtubeService.id, youtubeShop.id);
        if (icloudService && icloudShop) serviceShopMap.set(icloudService.id, icloudShop.id);

        let fixedCount = 0;
        for (const txn of txns) {
            const serviceId = txn.metadata?.service_id;
            if (serviceId && serviceShopMap.has(serviceId)) {
                const targetShopId = serviceShopMap.get(serviceId);
                if (txn.shop_id !== targetShopId) {
                    console.log(`Updating txn ${txn.id} (Metadata: ${serviceId}) -> Shop ${targetShopId}`);
                    await fetch(`${POCKETBASE_URL}/api/collections/transactions/records/${txn.id}`, {
                        method: 'PATCH',
                        headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                        body: JSON.stringify({ shop_id: targetShopId })
                    });
                    fixedCount++;
                }
            }
        }

        console.log(`Done! Fixed ${fixedCount} transactions.`);
    } catch (error) {
        console.error('Error:', error);
    }
}

fixServicesAndShops();
