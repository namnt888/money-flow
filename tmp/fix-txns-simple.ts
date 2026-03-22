async function fixTxnsSimple() {
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

        console.log('Fetching transactions...');
        const txRes = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?perPage=250&sort=-created`, {
            headers: { 'Authorization': token }
        });
        const data = await txRes.json() as any;
        const txs = data.items || [];
        
        console.log(`Found ${txs.length} transactions to scan.`);
        let fixed = 0;

        for (const t of txs) {
            const note = (t.note || '').toLowerCase();
            const serviceId = (t.metadata || {}).service_id;
            let targetShop = '';

            if (serviceId === 'wjfv3ypqyatgqh9' || note.includes('youtube')) targetShop = youtubeShopId;
            else if (serviceId === 'dnuh7x7d077qkat' || note.includes('icloud')) targetShop = icloudShopId;

            if (targetShop && t.shop_id !== targetShop) {
                console.log(`Fixing txn ${t.id} -> shop ${targetShop}`);
                await fetch(`${POCKETBASE_URL}/api/collections/transactions/records/${t.id}`, {
                    method: 'PATCH',
                    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ shop_id: targetShop })
                });
                fixed++;
            }
        }
        console.log(`DONE. Fixed ${fixed} records.`);
    } catch (err) { console.error(err); }
}
fixTxnsSimple();
