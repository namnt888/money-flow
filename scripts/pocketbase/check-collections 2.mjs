
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local'), override: true });

const PB_URL = 'https://api-db.reiwarden.io.vn';
const PB_EMAIL = (process.env.POCKETBASE_DB_EMAIL || 'namnt05@gmail.com').trim();
const PB_PASSWORD = (process.env.POCKETBASE_DB_PASSWORD || '').trim();

async function check() {
    let authRes = await fetch(`${PB_URL}/api/collections/_superusers/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: PB_EMAIL, password: PB_PASSWORD }),
    });

    if (!authRes.ok) {
        console.error('❌ Failed to login to PocketBase');
        return;
    }

    const { token } = await authRes.json();
    const headers = { 'Content-Type': 'application/json', 'Authorization': token };

    const res = await fetch(`${PB_URL}/api/collections?perPage=200&fields=name,id`, { headers });
    const data = await res.json();
    console.log('Collections:', data.items.map(i => i.name).sort());
}

check();
