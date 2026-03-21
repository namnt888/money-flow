async function definitiveFix() {
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

        // 1. Update Services
        console.log('Updating Youtube Service...');
        const res1 = await fetch(`${POCKETBASE_URL}/api/collections/services/records/wjfv3ypqyatgqh9`, {
            method: 'PATCH',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
            body: JSON.stringify({ shop_id: youtubeShopId })
        });
        console.log('Youtube Update Status:', res1.status);

        console.log('Updating iCloud Service...');
        const res2 = await fetch(`${POCKETBASE_URL}/api/collections/services/records/dnuh7x7d077qkat`, {
            method: 'PATCH',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
            body: JSON.stringify({ shop_id: icloudShopId })
        });
        console.log('iCloud Update Status:', res2.status);

        // 2. Scan ALL transactions for backfill
        console.log('Fetching ALL transactions...');
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
            let targetShop = '';

            if (serviceId === 'wjfv3ypqyatgqh9' || note.includes('youtube')) targetShop = youtubeShopId;
            else if (serviceId === 'dnuh7x7d077qkat' || note.includes('icloud') || note.includes('apple')) targetShop = icloudShopId;

            if (targetShop && (!t.shop_id || t.shop_id === '')) {
                console.log(`Fixing txn ${t.id} (${t.note}) -> shop ${targetShop}`);
                const patchRes = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records/${t.id}`, {
                    method: 'PATCH',
                    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ shop_id: targetShop })
                });
                if (patchRes.ok) fixed++;
                else console.error(`Failed to patch txn ${t.id}: ${patchRes.status}`);
            }
        }
        console.log(`DONE. Fixed ${fixed} records.`);
    } catch (err) { console.error(err); }
}
definitiveFix();
