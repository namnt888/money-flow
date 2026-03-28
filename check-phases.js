
const fs = require('fs');
const POCKETBASE_URL = 'https://api-db.reiwardEN.io.vn';

async function run() {
    try {
        const res = await fetch(`${POCKETBASE_URL}/api/collections/batch_phases/records?perPage=100`);
        const data = await res.json();
        fs.writeFileSync('phases_data.json', JSON.stringify(data.items, null, 2));
        console.log('Saved to phases_data.json');
    } catch (e) {
        console.error('Fetch error:', e);
    }
}
run();
