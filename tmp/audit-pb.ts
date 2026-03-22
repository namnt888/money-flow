async function auditPocketBase() {
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

        console.log('Fetching collections...');
        const collectionsRes = await fetch(`${POCKETBASE_URL}/api/collections`, {
            headers: { 'Authorization': token }
        });
        const collData = await collectionsRes.json() as any;
        console.log('Available collections:', collData.items.map((c: any) => ({ name: c.name, id: c.id })));

        console.log('Checking Youtube Service Record...');
        const srvRes = await fetch(`${POCKETBASE_URL}/api/collections/services/records/wjfv3ypqyatgqh9`, {
            headers: { 'Authorization': token }
        });
        const service = await srvRes.json() as any;
        console.log('Youtube Service ShopID:', service.shop_id);

    } catch (err) { console.error(err); }
}
auditPocketBase();
