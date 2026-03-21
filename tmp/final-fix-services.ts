async function finalFixServices() {
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

        // 1. Find the Shops
        const shopsRes = await fetch(`${POCKETBASE_URL}/api/collections/shops/records?filter=(name~"youtube"||name~"apple"||name~"icloud")`, {
            headers: { 'Authorization': token }
        });
        const { items: shops } = (await shopsRes.json()) as any;
        console.log('Shops found:', shops.map((s: any) => ({ id: s.id, name: s.name })));

        const youtubeShopId = shops.find((s: any) => s.name.toLowerCase().includes('youtube'))?.id;
        const icloudShopId = shops.find((s: any) => s.name.toLowerCase().includes('apple') || s.name.toLowerCase().includes('icloud'))?.id;

        if (!youtubeShopId) console.warn('Youtube shop NOT found');
        if (!icloudShopId) console.warn('iCloud shop NOT found');

        // 2. Update the Services
        if (youtubeShopId) {
            console.log('Setting shop_id for Youtube Service...');
            await fetch(`${POCKETBASE_URL}/api/collections/services/records/wjfv3ypqyatgqh9`, {
                method: 'PATCH',
                headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                body: JSON.stringify({ shop_id: youtubeShopId })
            });
        }
        if (icloudShopId) {
            console.log('Setting shop_id for iCloud Service...');
            await fetch(`${POCKETBASE_URL}/api/collections/services/records/dnuh7x7d077qkat`, {
                method: 'PATCH',
                headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                body: JSON.stringify({ shop_id: icloudShopId })
            });
        }

        // 3. Update ALL Transactions by scanning Note or Metadata
        console.log('Fetching transactions to backfill...');
        const txRes = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?perPage=500&sort=-created`, {
            headers: { 'Authorization': token }
        });
        const { items: txs } = (await txRes.json()) as any;
        console.log(`Scanning ${txs.length} transactions...`);

        let fixed = 0;
        for (const t of txs) {
            const note = (t.note || '').toLowerCase();
            const serviceId = t.metadata?.service_id;
            let targetShop = '';

            if (serviceId === 'wjfv3ypqyatgqh9' || note.includes('youtube')) targetShop = youtubeShopId;
            else if (serviceId === 'dnuh7x7d077qkat' || note.includes('icloud')) targetShop = icloudShopId;

            if (targetShop && t.shop_id !== targetShop) {
                console.log(`Updating txn ${t.id} (${t.note}) -> shop ${targetShop}`);
                await fetch(`${POCKETBASE_URL}/api/collections/transactions/records/${t.id}`, {
                    method: 'PATCH',
                    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ shop_id: targetShop })
                });
                fixed++;
            }
        }
        console.log(`Done! Fixed ${fixed} transactions and 2 services.`);

    } catch (err) { console.error(err); }
}

finalFixServices();
