
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local'), override: true });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PB_URL = 'https://api-db.reiwarden.io.vn';
const PB_EMAIL = (process.env.POCKETBASE_DB_EMAIL || 'namnt05@gmail.com').trim();
const PB_PASSWORD = (process.env.POCKETBASE_DB_PASSWORD || '').trim();

if (!SUPABASE_URL || !SUPABASE_KEY || !PB_PASSWORD) {
    console.error('Missing environment variables. Please check .env.local');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function toPocketBaseId(sourceId, fallbackPrefix = 'mf3') {
    if (!sourceId) return null;
    if (/^[a-z0-9]{15}$/.test(sourceId)) return sourceId;
    const hash = crypto.createHash('sha256').update(String(sourceId)).digest();
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 15; i++) {
        result += chars[hash[i] % chars.length];
    }
    return result;
}

async function run() {
    // 1. Auth with PocketBase
    let authRes = await fetch(`${PB_URL}/api/collections/_superusers/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: PB_EMAIL, password: PB_PASSWORD }),
    });

    if (!authRes.ok) {
        console.error('❌ Failed to login to PocketBase:', await authRes.text());
        return;
    }

    const { token } = await authRes.json();
    const headers = { 'Content-Type': 'application/json', 'Authorization': token };

    console.log('🚀 Starting Backfill...');

    // A. Migrate Installments
    console.log('📦 Backfilling installments...');
    const { data: sbInstallments, error: instError } = await supabase.from('installments').select('*');
    if (instError) throw instError;

    for (const inst of sbInstallments) {
        const pbId = toPocketBaseId(inst.id, 'installments');
        const payload = {
            name: inst.name,
            original_transaction_id: toPocketBaseId(inst.original_transaction_id, 'transactions'),
            owner_id: inst.owner_id,
            debtor_id: toPocketBaseId(inst.debtor_id, 'people'),
            total_amount: parseFloat(inst.total_amount || 0),
            conversion_fee: parseFloat(inst.conversion_fee || 0),
            term_months: parseInt(inst.term_months || 0),
            monthly_amount: parseFloat(inst.monthly_amount || 0),
            start_date: inst.start_date,
            remaining_amount: parseFloat(inst.remaining_amount || 0),
            next_due_date: inst.next_due_date,
            status: inst.status || 'active',
            type: inst.type || 'credit_card'
        };

        const res = await fetch(`${PB_URL}/api/collections/installments/records`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ id: pbId, ...payload })
        });
        
        if (!res.ok && res.status !== 400) { // 400 might be "already exists"
            console.warn(`⚠️ Failed to create installment ${pbId}:`, await res.text());
        } else if (res.ok) {
            console.log(`✅ Created installment ${pbId} (${inst.name})`);
        }
    }

    // B. Backfill installment_plan_id in transactions
    console.log('💸 Backfilling installment_plan_id in transactions...');
    const { data: sbTxns, error: txnError } = await supabase.from('transactions').select('id, installment_plan_id').not('installment_plan_id', 'is', null);
    if (txnError) throw txnError;

    for (const txn of sbTxns) {
        const pbTxnId = toPocketBaseId(txn.id, 'transactions');
        const pbPlanId = toPocketBaseId(txn.installment_plan_id, 'installments');

        const res = await fetch(`${PB_URL}/api/collections/transactions/records/${pbTxnId}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ installment_plan_id: pbPlanId })
        });

        if (res.ok) {
            console.log(`✅ Updated transaction ${pbTxnId} with plan ${pbPlanId}`);
        } else {
            // Field might not exist in schema, let's try to add it to metadata instead as a fallback?
            // No, the UI expects it as a top-level field or in metadata.
            // Let's check the error.
            const text = await res.text();
            if (text.includes('installment_plan_id')) {
                console.warn(`⚠️ field installment_plan_id missing in PB transactions schema. Updating metadata instead.`);
                // Fallback: update metadata
                await fetch(`${PB_URL}/api/collections/transactions/records/${pbTxnId}`, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify({ 'metadata+': { installment_plan_id: pbPlanId } })
                });
            } else {
                console.warn(`⚠️ Failed to update transaction ${pbTxnId}:`, text);
            }
        }
    }

    // C. Migrate Service Members
    console.log('👥 Backfilling service_members...');
    // We assume the collection exists or we try to create it if we have schema knowledge.
    // However, I'll just try to upsert records into 'service_members'.
    const { data: sbMembers, error: memberError } = await supabase.from('service_members').select('*');
    if (memberError) {
        console.warn('⚠️ Supabase service_members table not found or error:', memberError.message);
    } else {
        for (const m of sbMembers) {
            const pbId = toPocketBaseId(m.id, 'service_members');
            const payload = {
                service_id: toPocketBaseId(m.service_id, 'services'),
                person_id: toPocketBaseId(m.person_id, 'people'),
                slots: parseInt(m.slots || 1),
                is_owner: m.is_owner || false,
                metadata: m.metadata || {}
            };

            const res = await fetch(`${PB_URL}/api/collections/service_members/records`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ id: pbId, ...payload })
            });
            if (res.ok) console.log(`✅ Created service_member ${pbId}`);
        }
    }

    console.log('🎉 Backfill finished!');
}

run().catch(console.error);
