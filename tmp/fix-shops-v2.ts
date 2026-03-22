async function fixShopsSelfContained() {
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
        
        if (!authRes.ok) {
            throw new Error(`Auth failed: ${await authRes.text()}`);
        }
        
        const { token } = (await authRes.json()) as any;
        console.log('Authenticated.');

        console.log('Fetching shops...');
        const shopsRes = await fetch(`${POCKETBASE_URL}/api/collections/shops/records?filter=(name~"youtube"||name~"icloud")`, {
            headers: { 'Authorization': token }
        });
        const { items: shops } = (await shopsRes.json()) as any;
        console.log(`Found ${shops.length} shops.`);

        const youtubeShop = shops.find((s: any) => s.name.toLowerCase().includes('youtube'));
        const icloudShop = shops.find((s: any) => s.name.toLowerCase().includes('icloud'));

        console.log('Fetching transactions with missing shop_id...');
        const txnsRes = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?filter=((note~"youtube"||note~"icloud")%26%26(shop_id=null||shop_id=""))&perPage=200`, {
            headers: { 'Authorization': token }
        });
        const { items: txns } = (await txnsRes.json()) as any;
        console.log(`Found ${txns.length} transactions to fix.`);

        for (const txn of txns) {
            const note = (txn.note || '').toLowerCase();
            let newShopId = '';
            if (note.includes('youtube') && youtubeShop) newShopId = youtubeShop.id;
            else if (note.includes('icloud') && icloudShop) newShopId = icloudShop.id;

            if (newShopId) {
                console.log(`Updating txn ${txn.id} (note: ${txn.note}) with shop ${newShopId}`);
                await fetch(`${POCKETBASE_URL}/api/collections/transactions/records/${txn.id}`, {
                    method: 'PATCH',
                    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ shop_id: newShopId })
                });
            }
        }
        console.log('Done!');
    } catch (error) {
        console.error('Error:', error);
    }
}

fixShopsSelfContained();
