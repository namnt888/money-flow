async function fixServiceShopsSelfContained() {
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

        console.log('Fetching all services...');
        const servicesRes = await fetch(`${POCKETBASE_URL}/api/collections/services/records?perPage=200`, {
            headers: { 'Authorization': token }
        });
        const { items: services } = (await servicesRes.json()) as any;
        const serviceShopMap = new Map(services.map((s: any) => [s.id, s.shop_id]));
        console.log(`Found ${services.length} services.`);

        console.log('Fetching all transactions with service_id in metadata but missing shop_id...');
        // We can't filter by metadata values directly in PB filter string easily if they are nested, 
        // but we can look for any transaction where shop_id is empty and metadata is present.
        const txnsRes = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?filter=(shop_id=""||shop_id=null)&perPage=200&sort=-created`, {
            headers: { 'Authorization': token }
        });
        const { items: txns } = (await txnsRes.json()) as any;
        console.log(`Checking ${txns.length} transactions with blank shop IDs...`);

        let fixedCount = 0;
        for (const txn of txns) {
            const metadata = (txn.metadata && typeof txn.metadata === 'object') ? txn.metadata : {};
            const serviceId = metadata.service_id;
            
            if (serviceId) {
                const shopIdFromService = serviceShopMap.get(serviceId);
                if (shopIdFromService) {
                    console.log(`Updating txn ${txn.id} (Metadata Service: ${serviceId}) with shop ${shopIdFromService}`);
                    await fetch(`${POCKETBASE_URL}/api/collections/transactions/records/${txn.id}`, {
                        method: 'PATCH',
                        headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                        body: JSON.stringify({ shop_id: shopIdFromService })
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

fixServiceShopsSelfContained();
