async function robustFinalFix() {
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
        if (!authRes.ok) throw new Error(`Auth failed: ${authRes.status}`);
        const { token } = (await authRes.json()) as any;

        const youtubeShopId = 'l7rc1n0fh514o1s';
        const icloudShopId = '99x6d3asee6b33v';
        const serviceMap = {
            'wjfv3ypqyatgqh9': youtubeShopId,
            'dnuh7x7d077qkat': icloudShopId
        };

        // 1. Update Services
        console.log('Verifying services...');
        for (const [srvId, shpId] of Object.entries(serviceMap)) {
            const res = await fetch(`${POCKETBASE_URL}/api/collections/services/records/${srvId}`, {
                method: 'PATCH',
                headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                body: JSON.stringify({ shop_id: shpId })
            });
            console.log(`Service ${srvId} update: ${res.status}`);
        }

        // 2. Scan Items
        console.log('Scanning transactions...');
        const txRes = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?perPage=500`, {
            headers: { 'Authorization': token }
        });
        if (!txRes.ok) throw new Error(`TX fetch failed: ${txRes.status}`);
        
        const txBody = await txRes.json() as any;
        const items = txBody.items || [];
        console.log(`Found ${items.length} records. Processing...`);

        let fixed = 0;
        for (const t of items) {
            const serviceId = t.metadata?.service_id;
            const note = (t.note || '').toLowerCase();
            let shopId = '';

            if (serviceId === 'wjfv3ypqyatgqh9' || note.includes('youtube')) shopId = youtubeShopId;
            else if (serviceId === 'dnuh7x7d077qkat' || note.includes('icloud') || note.includes('apple')) shopId = icloudShopId;

            if (shopId && (!t.shop_id || t.shop_id === '')) {
                console.log(`Fixing ${t.id} (${t.note})`);
                await fetch(`${POCKETBASE_URL}/api/collections/transactions/records/${t.id}`, {
                    method: 'PATCH',
                    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ shop_id: shopId })
                });
                fixed++;
            }
        }
        console.log(`DONE. Fixed ${fixed} records.`);
    } catch (err) { console.error(err); }
}
robustFinalFix();
