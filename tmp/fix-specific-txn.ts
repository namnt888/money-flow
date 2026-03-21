async function fixTargetServiceTxn() {
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

        // Target: s8i2m6la6mwsuq6
        // Service: wjfv3ypqyatgqh9
        
        console.log('Fetching service info...');
        const srvRes = await fetch(`${POCKETBASE_URL}/api/collections/services/records/wjfv3ypqyatgqh9`, {
            headers: { 'Authorization': token }
        });
        const service = await srvRes.json() as any;
        console.log('Service Info:', { id: service.id, name: service.name, shop_id: service.shop_id });

        if (service.shop_id) {
            console.log('Updating transaction s8i2m6la6mwsuq6...');
            await fetch(`${POCKETBASE_URL}/api/collections/transactions/records/s8i2m6la6mwsuq6`, {
                method: 'PATCH',
                headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                body: JSON.stringify({ shop_id: service.shop_id })
            });
            console.log('Transaction updated.');
        } else {
            console.warn('Target service has NO shop_id configured!');
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

fixTargetServiceTxn();
