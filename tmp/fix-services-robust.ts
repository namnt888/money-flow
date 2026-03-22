async function robustFixServiceShops() {
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

        // 1. Map Services to Shops
        console.log('Fetching all services...');
        const servicesRes = await fetch(`${POCKETBASE_URL}/api/collections/services/records?perPage=200`, {
            headers: { 'Authorization': token }
        });
        const servicesData = await servicesRes.json() as any;
        const services = (servicesData.items || []) as any[];
        const serviceShopMap = new Map(services.map((s: any) => [s.id, s.shop_id]));
        console.log(`Mapped ${services.length} services.`);

        // 2. Fetch Transactions with blank shop_id
        console.log('Scanning transactions with blank shop IDs...');
        let page = 1;
        let totalFixed = 0;
        let hasMore = true;

        while (hasMore) {
            const txnsRes = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?filter=(shop_id=""||shop_id=null)&page=${page}&perPage=100`, {
                headers: { 'Authorization': token }
            });
            const txnsData = await txnsRes.json() as any;
            const txns = (txnsData.items || []) as any[];
            
            if (txns.length === 0) {
                hasMore = false;
                break;
            }

            console.log(`Processing page ${page} (${txns.length} items)...`);

            for (const txn of txns) {
                const metadata = txn.metadata || {};
                const serviceId = metadata.service_id;
                
                if (serviceId) {
                    const mappedShopId = serviceShopMap.get(serviceId);
                    if (mappedShopId) {
                        console.log(`Fixing txn ${txn.id} (Metadata Srv: ${serviceId}) -> Shop ${mappedShopId}`);
                        await fetch(`${POCKETBASE_URL}/api/collections/transactions/records/${txn.id}`, {
                            method: 'PATCH',
                            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                            body: JSON.stringify({ shop_id: mappedShopId })
                        });
                        totalFixed++;
                    }
                }
            }

            if (txns.length < 50) { // If fewer items returned, likely end (actually perPage=100)
                hasMore = false;
            } else {
                page++;
            }
            
            // Safety break to avoid infinite loop
            if (page > 10) break;
        }

        console.log(`Done! Total transactions fixed: ${totalFixed}`);
    } catch (error) {
        console.error('Fatal Error:', error);
    }
}

robustFixServiceShops();
