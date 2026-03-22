import { pocketbaseGetById } from '../src/services/pocketbase/server.ts';
pocketbaseGetById('transactions', 's8i2m6la6mwsuq6').then(res => console.log(JSON.stringify(res, null, 2)));
