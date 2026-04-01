
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const config = {};
    envContent.split(/\r?\n/).forEach(line => {
        const match = line.match(/^\s*([^#=]+)=(.*)$/);
        if (match) {
            config[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
        }
    });

    const POCKETBASE_URL = (config.POCKETBASE_URL || 'https://api-db.reiwarden.io.vn').replace(/\/+$/, '');
    const EMAIL = config.POCKETBASE_DB_EMAIL;
    const PASSWORD = config.POCKETBASE_DB_PASSWORD;

    async function check() {
        console.log('--- PocketBase Deep Discovery ---');
        
        // Auth
        let token = '';
        const endpoints = ['/api/collections/_superusers/auth-with-password', '/api/admins/auth-with-password'];
        for (const ep of endpoints) {
            try {
                const res = await fetch(`${POCKETBASE_URL}${ep}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identity: EMAIL, password: PASSWORD })
                });
                if (res.ok) {
                    const data = await res.json();
                    token = data.token;
                    break;
                }
            } catch (e) {}
        }

        if (!token) return console.error('Auth failed.');

        const headers = { 'Authorization': token };
        
        // Fetch ALL collections to find the one named 'services'
        console.log('Fetching all collections list...');
        const res = await fetch(`${POCKETBASE_URL}/api/collections?perPage=200`, { headers });
        const list = await res.json();
        
        if (!list || !list.items) {
            console.error('Failed to list collections. Response:', list);
            return;
        }

        const target = list.items.find(c => c.name === 'services');
        if (!target) {
            console.error('No collection named "services" found in the list!');
            console.log('Available collections:', list.items.map(c => `${c.name}(${c.id})`).join(', '));
            return;
        }

        console.log(`\nTARGET FOUND:`);
        console.log(`Name: ${target.name}`);
        console.log(`ID:   ${target.id}`);
        console.log(`Type: ${target.type}`);
        
        // In older PB it's .schema, in some wrappers/responses it might be .fields
        const schema = target.schema || target.fields || [];
        console.log('\nACTUAL COLUMNS ON SERVER:');
        schema.forEach((f, i) => {
            console.log(`${i+1}. ${f.name} (${f.type})`);
        });

        // Search for 'service_members' too
        const members = list.items.find(c => c.name === 'service_members');
        if (members) {
            console.log(`\nMEMBERS COLLECTION FOUND: ${members.id}`);
            const mSchema = members.schema || members.fields || [];
            mSchema.forEach((f, i) => {
                console.log(`${i+1}. ${f.name} (${f.type})`);
            });
        }
    }

    check().catch(console.error);

} catch (err) {
    console.error('Fatal error:', err.message);
}
