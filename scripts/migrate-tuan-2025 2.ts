
import { pocketbaseCreate, toPocketBaseId } from '../src/services/pocketbase/server';

const PERSON_ID = 'wlv4acbrq11l8de'; // Tuấn
const ACCOUNT_ID = '04ytttr0nifvnif'; // Draft fund
const CAT_LEND = 'dqg133qgkmwyczh'; // Lending
const CAT_REPAY = '3cfym8hdgms8ekj'; // Repayment

const DATA_TO_MIGRATE = [
    ['2025-11-28', '17 PM 256 - Giao Nhu Ngoc', 35790000, 150000, 'debt'],
    ['2025-11-28', '17 PM 256 - Giao Ngoc My', 35790000, 150000, 'debt'],
    ['2025-11-28', '17 PM 256 - Giao Anh Le', 35790000, 150000, 'debt'],
    ['2025-12-01', 'DEC25 Youtube Slot: 1 - 166,000/6', 27667, 0, 'debt'],
    ['2025-12-09', 'Nước T11', 121871, 0, 'debt'],
    ['2025-12-10', 'Điện T11', 1400352, 14004, 'debt'],
    ['2025-12-11', 'Tiger Crystal - Đơn 2', 722390, 0, 'debt'],
    ['2025-12-11', 'Ken silver - Đơn 2', 834960, 0, 'debt'],
    ['2025-12-11', 'Ken Silver - Đơn 1', 834960, 0, 'debt'],
    ['2025-12-11', 'Tiger Crystal - Đơn 1', 722390, 0, 'debt'],
    ['2025-12-15', '17 PM giao Truc Vo', 34190000, 0, 'debt'],
    ['2025-12-15', 'Bank N50', 50000000, 0, 'repayment'],
    ['2025-12-19', 'Bank N 50', 50000000, 0, 'repayment'],
    ['2025-12-24', 'Bank N 50 24.12', 50000000, 0, 'repayment'],
    ['2025-12-24', '17 Pro 256 góp Vib - Giao Nam', 30999000, 0, 'debt'],
    ['2026-01-02', 'Bank N 65', 65000000, 0, 'repayment'],
    ['2026-01-13', 'Repay to clear Cycle 2025-12 (Rollover Sync)', 2158586, 0, 'repayment'],
];

async function migrate() {
    console.log('🚀 Starting Migration for Tuấn (2025-12)...');
    let successCount = 0;
    
    for (const [dateStr, note, amount, cb, type] of DATA_TO_MIGRATE as any[]) {
        try {
            const isoDate = new Date(dateStr).toISOString();
            const pbId = toPocketBaseId(crypto.randomUUID(), 'mf3');
            
            const payload = {
                id: pbId,
                date: isoDate,
                occurred_at: isoDate,
                note: note,
                description: note,
                amount: type === 'repayment' ? amount : -amount,
                category_id: type === 'repayment' ? CAT_REPAY : CAT_LEND,
                person_id: PERSON_ID,
                account_id: ACCOUNT_ID,
                to_account_id: null,
                target_account_id: null,
                type: type,
                tag: dateStr.startsWith('2025-11') || dateStr.startsWith('2025-12') ? '2025-12' : '2026-01',
                cashback_share_fixed: cb,
                status: 'posted',
                currency: 'VND',
                metadata: { migrated: true, original_date: dateStr }
            };
            
            await pocketbaseCreate('pvl_txn_001', payload);
            console.log(`✅ [${dateStr}] Created: ${note} | Amount: ${payload.amount.toLocaleString()} VND`);
            successCount++;
        } catch (err: any) {
            console.error(`❌ [${dateStr}] Failed: ${note}`, err.message);
        }
    }
    
    console.log(`\n🎉 Migration Finished! Successfully created ${successCount}/${DATA_TO_MIGRATE.length} entries.`);
}

migrate().catch(console.error);
