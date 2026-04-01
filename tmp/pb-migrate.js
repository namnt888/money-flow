
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

    async function migrate() {
        console.log('--- PocketBase Migration (v0.22 Compatibility) ---');
        
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
        const headers = { 'Authorization': token, 'Content-Type': 'application/json' };

        async function patchCollection(id, newFields) {
            console.log(`Processing collection ${id}...`);
            const res = await fetch(`${POCKETBASE_URL}/api/collections/${id}`, { headers });
            const coll = await res.json();
            
            // PB v0.22 uses 'fields'. If missing, fallback to 'schema'
            const isV22 = !!coll.fields;
            const currentFields = coll.fields || coll.schema || [];
            const existingNames = currentFields.map(f => f.name);
            const updatedFields = [...currentFields];
            let changed = false;

            for (const f of newFields) {
                if (!existingNames.includes(f.name)) {
                    console.log(`  + Adding field: ${f.name}`);
                    // v0.22 fields often need more properties than old schema
                    const fieldDef = {
                        name: f.name,
                        type: f.type,
                        required: false,
                        presentable: false,
                        system: false,
                        ...f.options
                    };
                    updatedFields.push(fieldDef);
                    changed = true;
                }
            }

            if (changed) {
                const payload = {};
                if (isV22) payload.fields = updatedFields;
                else payload.schema = updatedFields;

                console.log(`  Patching with ${isV22 ? 'fields' : 'schema'}...`);
                const patchRes = await fetch(`${POCKETBASE_URL}/api/collections/${id}`, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify(payload)
                });
                if (patchRes.ok) {
                    console.log(`  Success!`);
                } else {
                    console.error(`  Failed: ${await patchRes.text()}`);
                }
            } else {
                console.log(`  No changes needed.`);
            }
        }

        const sFields = [
            { name: 'image_url', type: 'url' },
            { name: 'max_slots', type: 'number' },
            { name: 'price', type: 'number' },
            { name: 'due_day', type: 'number' },
            { name: 'shop_id', type: 'relation', options: { collectionId: 'pvl_shop_001', maxSelect: 1 } },
            { name: 'note_template', type: 'text' },
            { name: 'last_distribution_date', type: 'date' },
            { name: 'next_distribution_date', type: 'date' },
            { name: 'distribution_status', type: 'text' }
        ];

        const mFields = [
            { name: 'person_id', type: 'relation', options: { collectionId: 'people', cascadeDelete: true, maxSelect: 1 } },
            { name: 'slots', type: 'number' },
            { name: 'is_owner', type: 'bool' }
        ];

        await patchCollection('pvl_serv_001', sFields);
        await patchCollection('pbc_3832049137', mFields);
        console.log('--- Migration Finished ---');
    }

    migrate().catch(console.error);

} catch (err) {
    console.error('Fatal error:', err.message);
}
