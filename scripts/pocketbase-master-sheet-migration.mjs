import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

async function migrate() {
    console.log('Authenticating with PocketBase Admin...');
    await pb.admins.authWithPassword('namnt05@gmail.com', 'Thanhnam0@');
    console.log('Authenticated successfully!');

    try {
        const collection = await pb.collections.getOne('people');
        const hasField = collection.schema.some(f => f.name === 'is_master_sheet_enabled');
        if (!hasField) {
            console.log('Field not found. Adding is_master_sheet_enabled to people collection...');
            collection.schema.push({
                system: false,
                id: 'is_mstr_sht_enabled_' + Math.random().toString().substring(2, 6),
                name: 'is_master_sheet_enabled',
                type: 'bool',
                required: false,
                presentable: false,
                unique: false,
                options: {}
            });
            await pb.collections.update('people', collection);
            console.log('Migration completed successfully: Field is_master_sheet_enabled added!');
        } else {
            console.log('Field is_master_sheet_enabled already exists in the collection. Skipping migration.');
        }
    } catch (e) {
        console.error('Migration failed:', e);
    }
}

migrate();
