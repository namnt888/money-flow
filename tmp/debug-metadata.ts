async function debugServiceMetadata() {
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

        const txRes = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?sort=-created&perPage=20`, {
            headers: { 'Authorization': token }
        });
        const txData = await txRes.json() as any;
        const txs = txData.items || [];
        
        console.log('Recent transactions metadata audit:');
        txs.forEach((t: any) => {
            console.log(`ID: ${t.id}, Note: ${t.note}, ShopID: "${t.shop_id}", Metadata keys: ${Object.keys(t.metadata || {}).join(',')}`);
            if (t.metadata?.service_id) {
                console.log(`  -> SERVICE ID FOUND: ${t.metadata.service_id}`);
            }
        });

        console.log('All Services info:');
        const srvRes = await fetch(`${POCKETBASE_URL}/api/collections/services/records`, {
            headers: { 'Authorization': token }
        });
        const srvData = await srvRes.json() as any;
        srvData.items.forEach((s: any) => {
            console.log(`ID: ${s.id}, Name: ${s.name}, ShopID: ${s.shop_id}`);
        });

    } catch (err) { console.error(err); }
}

debugServiceMetadata();
