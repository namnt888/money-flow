async function checkTxCounts() {
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

        const res1 = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?perPage=1`, {
            headers: { 'Authorization': token }
        });
        const d1 = await res1.json() as any;
        console.log('Query by name "transactions": totalItems =', d1.totalItems);

        const res2 = await fetch(`${POCKETBASE_URL}/api/collections/pvl_txn_001/records?perPage=1`, {
            headers: { 'Authorization': token }
        });
        const d2 = await res2.json() as any;
        console.log('Query by ID "pvl_txn_001": totalItems =', d2.totalItems);

        // Try a different query
        const res3 = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?filter=(status!="void")&perPage=1`, {
            headers: { 'Authorization': token }
        });
        const d3 = await res3.json() as any;
        console.log('Query by name "transactions" with status check: totalItems =', d3.totalItems);

    } catch (err) { console.error(err); }
}
checkTxCounts();
