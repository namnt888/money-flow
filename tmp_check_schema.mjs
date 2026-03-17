import { pocketbaseList } from './src/services/pocketbase/server.js';

async function checkSchema() {
  const collections = ['people', 'shops', 'categories'];
  for (const col of collections) {
    try {
      console.log(`Checking collection: ${col}`);
      const res = await pocketbaseList(col, { perPage: 1 });
      if (res.items.length > 0) {
        console.log(`Fields in ${col}:`, Object.keys(res.items[0]));
      } else {
        console.log(`No records found in ${col}`);
      }
    } catch (err) {
      console.error(`Error checking ${col}:`, err.message);
    }
  }
}

checkSchema();
