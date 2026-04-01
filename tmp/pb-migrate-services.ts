
import dotenv from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const POCKETBASE_URL = (process.env.POCKETBASE_URL || 'https://api-db.reiwarden.io.vn').replace(/\/+$/, '');
const EMAIL = process.env.POCKETBASE_DB_EMAIL;
const PASSWORD = process.env.POCKETBASE_DB_PASSWORD;

async function migrate() {
  console.log('--- PocketBase Schema Migration Start ---');
  console.log('URL:', POCKETBASE_URL);
  console.log('Email:', EMAIL || 'NOT FOUND');

  if (!EMAIL || !PASSWORD) {
    console.error('Missing PB credentials in .env.local');
    return;
  }

  // 1. Auth helper
  async function authenticate() {
    const endpoints = [
      '/api/admins/auth-with-password',
      '/api/collections/_superusers/auth-with-password'
    ];
    for (const endpoint of endpoints) {
      try {
        console.log(`Trying auth at ${endpoint}...`);
        const res = await fetch(`${POCKETBASE_URL}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identity: EMAIL, password: PASSWORD })
        });
        if (res.ok) return (await res.json()) as any;
        console.log(`Failed ${endpoint}: ${res.status}`);
      } catch (e: any) {
        console.log(`Error at ${endpoint}: ${e.message}`);
      }
    }
    return null;
  }

  const authData = await authenticate();
  if (!authData) {
    console.error('Auth failed at all endpoints.');
    return;
  }
  const token = authData.token;
  console.log('Auth successful.');

  // 2. Fetch Collections
  async function getCollection(name: string) {
    const res = await fetch(`${POCKETBASE_URL}/api/collections/${name}`, {
      headers: { 'Authorization': token }
    });
    if (!res.ok) return null;
    return await res.json();
  }

  const servicesColl = await getCollection('services');
  const membersColl = await getCollection('service_members');

  if (!servicesColl) console.error('Collection "services" not found.');
  if (!membersColl) console.error('Collection "service_members" not found.');
  if (!servicesColl || !membersColl) return;

  // 3. Define Missed Fields
  const serviceFieldsToAdd = [
    { name: 'image_url', type: 'url' },
    { name: 'max_slots', type: 'number' },
    { name: 'price', type: 'number' },
    { name: 'due_day', type: 'number' },
    { name: 'shop_id', type: 'relation', options: { collectionId: 'shops', cascadeDelete: false, maxSelect: 1 } },
    { name: 'note_template', type: 'text' },
    { name: 'last_distribution_date', type: 'date' },
    { name: 'next_distribution_date', type: 'date' },
    { name: 'distribution_status', type: 'text' }
  ];

  const memberFieldsToAdd = [
    { name: 'person_id', type: 'relation', options: { collectionId: 'people', cascadeDelete: true, maxSelect: 1 } },
    { name: 'slots', type: 'number' },
    { name: 'is_owner', type: 'bool' }
  ];

  // 4. Update Logic
  async function updateCollectionSchema(coll: any, fields: any[]) {
    const existingNames = coll.schema.map((f: any) => f.name);
    const newSchema = [...coll.schema];
    let changed = false;

    for (const field of fields) {
      if (!existingNames.includes(field.name)) {
        console.log(`Adding field ${field.name} to ${coll.name}...`);
        newSchema.push({
            name: field.name,
            type: field.type,
            required: false,
            options: field.options || {}
        });
        changed = true;
      }
    }

    if (changed) {
      console.log(`Patching ${coll.name} with new schema...`);
      const res = await fetch(`${POCKETBASE_URL}/api/collections/${coll.id}`, {
        method: 'PATCH',
        headers: { 
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ schema: newSchema })
      });
      if (res.ok) {
        console.log(`Successfully updated ${coll.name} schema.`);
      } else {
        const errText = await res.text();
        console.error(`Failed to update ${coll.name}:`, errText);
      }
    } else {
      console.log(`${coll.name} schema is already up to date.`);
    }
  }

  await updateCollectionSchema(servicesColl, serviceFieldsToAdd);
  await updateCollectionSchema(membersColl, memberFieldsToAdd);

  console.log('--- Migration Finished ---');
}

migrate().catch(console.error);
