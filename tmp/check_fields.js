
const POCKETBASE_URL = 'https://api-db.reiwarden.io.vn';
const EMAIL = 'namnt05@gmail.com';
const PASSWORD = 'Thanhnam0@';

async function run() {
  const authRes = await fetch(`${POCKETBASE_URL}/api/collections/_superusers/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: EMAIL, password: PASSWORD }),
  });
  const authData = await authRes.json();
  const token = authData.token;

  // 1. Check transaction fields
  const sampleRes = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?perPage=1`, {
    headers: { 'Authorization': token }
  });
  const sample = await sampleRes.json();
  console.log('--- SAMPLE TRANSACTION FIELDS ---');
  console.log(Object.keys(sample.items[0]));
}

run().catch(console.error);
