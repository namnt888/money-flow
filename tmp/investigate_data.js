
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

  const personId = 'wlv4acbrq11l8de';
  const cycle = '2026-03';

  // Fetch using person_id filter
  const filter = `person_id='${personId}' && (tag='${cycle}' || debt_cycle_tag='${cycle}' || persisted_cycle_tag='${cycle}')`;
  const url = `${POCKETBASE_URL}/api/collections/transactions/records?filter=${encodeURIComponent(filter)}&perPage=500`;

  const txnsRes = await fetch(url, { headers: { 'Authorization': token } });
  const txnsData = await txnsRes.json();

  console.log(`Found ${txnsData.items.length} transactions`);

  txnsData.items.forEach(t => {
    console.log(`Note: ${t.note.padEnd(30)} | Type: ${t.type.padEnd(10)} | Tag: ${t.tag.padEnd(8)} | Amt: ${t.amount.toString().padEnd(10)} | From: ${t.account_id.padEnd(15)} | To: ${t.to_account_id}`);
  });
}

run().catch(console.error);
