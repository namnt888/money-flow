
import 'dotenv/config';
import dotenv from 'dotenv';
import path from 'path';
import { createHash } from 'crypto';
import fetch from 'node-fetch';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const POCKETBASE_URL = (process.env.POCKETBASE_URL || 'https://api-db.reiwarden.io.vn').replace(/\/+$/, '');
const POCKETBASE_EMAIL = (process.env.POCKETBASE_DB_EMAIL || '').trim();
const POCKETBASE_PASSWORD = (process.env.POCKETBASE_DB_PASSWORD || '').trim();

async function getAuthToken() {
  const authEndpoints = [
    '/api/collections/_superusers/auth-with-password',
    '/api/admins/auth-with-password'
  ];

  for (const endpoint of authEndpoints) {
    try {
      console.log(`Trying auth at: ${POCKETBASE_URL}${endpoint}`);
      const resp = await fetch(`${POCKETBASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: POCKETBASE_EMAIL, password: POCKETBASE_PASSWORD })
      });
      if (resp.ok) {
        const data = await resp.json() as any;
        return data.token;
      } else {
        const text = await resp.text();
        console.log(`Failed at ${endpoint}: [${resp.status}] ${text}`);
      }
    } catch (e: any) {
      console.log(`Error at ${endpoint}: ${e.message}`);
    }
  }
  throw new Error('Auth failed');
}

async function run() {
  console.log(`PocketBase URL: ${POCKETBASE_URL}`);
  console.log(`PocketBase Email: ${POCKETBASE_EMAIL}`);
  if (!POCKETBASE_EMAIL || !POCKETBASE_PASSWORD) {
    console.log('CRITICAL: Missing credentials in ENV');
    return;
  }

  const token = await getAuthToken();
  const headers = { Authorization: token, 'Content-Type': 'application/json' };

  // 1. Get all services
  const svcResp = await fetch(`${POCKETBASE_URL}/api/collections/services/records?perPage=500`, { headers });
  const svcs = (await svcResp.json() as any).items;
  
  console.log(`Total Services: ${svcs.length}`);
  const activeSvcs = svcs.filter((s: any) => s.is_active !== false);
  console.log(`Active Services: ${activeSvcs.length}`);

  for (const s of activeSvcs) {
    console.log(`- [${s.id}] ${s.name} (Due: ${s.due_day || s.billing_day || 1}, Last: ${s.last_distribution_date})`);
  }

  // 2. Check for transactions in April 2026
  const monthTag = '2026-04';
  const txnResp = await fetch(`${POCKETBASE_URL}/api/collections/pvl_txn_001/records?filter=tag="${monthTag}"&perPage=500`, { headers });
  const txns = (await txnResp.json() as any).items;

  const svcTxns = txns.filter((t: any) => t.metadata && t.metadata.service_id);
  console.log(`\nService Transactions for ${monthTag}: ${svcTxns.length}`);
  for (const t of svcTxns) {
    console.log(`- TXN: ${t.id} for Service: ${t.metadata.service_id} (Note: ${t.note})`);
  }
}

run().catch(console.error);
