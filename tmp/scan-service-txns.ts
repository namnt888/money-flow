async function scanAndUpdateServiceTxns() {
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

        const youtubeShopId = 'l7rc1n0fh514o1s';
        const icloudShopId = '99x6d3asee6b33v';
        const serviceMap = {
            'wjfv3ypqyatgqh9': youtubeShopId,
            'dnuh7x7d077qkat': icloudShopId
        };
        
        console.log('Fetching all transactions (page 1)...');
        const txRes = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?perPage=500&sort=-created`, {
            headers: { 'Authorization': token }
        });
        const data = await txRes.json() as any;
        const txs = data.items || [];
        console.log(`Scanning ${txs.length} transactions...`);

        let fixed = 0;
        for (const t of txs) {
            const serviceId = t.metadata?.service_id;
            const note = (t.note || '').toLowerCase();
            
            let shopToSet = '';
            if (serviceId && serviceMap[serviceId]) {
                shopToSet = serviceMap[serviceId];
            } else if (note.includes('youtube')) {
                shopToSet = youtubeShopId;
            } else if (note.includes('icloud') || note.includes('apple')) {
                shopToSet = icloudShopId;
            }

            if (shopToSet && (!t.shop_id || t.shop_id === '')) {
                console.log(`Fixing txn ${t.id} (${t.note}) -> shop ${shopToSet}`);
                await fetch(`${POCKETBASE_URL}/api/collections/transactions/records/${t.id}`, {
                    method: 'PATCH',
                    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ shop_id: shopToSet })
                });
                fixed++;
            }
        }
        console.log(`DONE. Fixed ${fixed} records.`);
    } catch (err) { console.error(err); }
}
scanAndUpdateServiceTxns();
