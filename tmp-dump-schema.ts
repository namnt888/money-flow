
import PocketBase from 'pocketbase';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function dumpSchema() {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    await pb.admins.authWithPassword(
        process.env.POCKETBASE_ADMIN_EMAIL!,
        process.env.POCKETBASE_ADMIN_PASSWORD!
    );

    const collection = await pb.collections.getOne('batch_items');
    console.log(JSON.stringify(collection.schema, null, 2));
}

dumpSchema();
