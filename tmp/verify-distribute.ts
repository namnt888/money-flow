
import 'dotenv/config';
import dotenv from 'dotenv';
import path from 'path';
import { distributeAllServices } from '../src/services/service-manager';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function verify() {
  console.log('--- LOCAL VERIFICATION START (Simulating April 1st) ---');
  try {
    // Mocking April 1st, 2026
    const result = await distributeAllServices('2026-04-01');
    console.log('--- RESULT ---');
    console.log(JSON.stringify(result, null, 2));
  } catch (e: any) {
    console.error('CRITICAL ERROR:', e.message);
  }
}

verify().catch(console.error);
