import { pocketbaseList } from './src/services/pocketbase/server';

async function inspectServices() {
  try {
    const res = await pocketbaseList('services', { perPage: 1 });
    console.log('Services Item:', JSON.stringify(res.items[0], null, 2));
  } catch (err) {
    console.error('Inspection failed:', err);
  }
}

inspectServices();
