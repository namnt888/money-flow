
const { pocketbaseList, pocketbaseUpdate } = require('../src/services/pocketbase/server');

async function repairDebtIntegrity() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    try {
        console.log('--- STARTING DEBT INTEGRITY REPAIR ---');
        
        // 1. Fetch all transactions related to people
        const response = await pocketbaseList('pvl_txn_001', { 
            filter: 'person_id != "" && status != "void"',
            perPage: 2000 
        });
        
        const txns = response.items;
        console.log(`Found ${txns.length} candidate transactions.`);
        
        let fixedCount = 0;

        for (const txn of txns) {
            const note = (txn.note || txn.description || '').toLowerCase();
            const type = (txn.type || '').toLowerCase();
            let newType = type;
            let needsUpdate = false;

            // Pattern A: Debt items accidentally marked as Repayment
            const debtKeywords = [
                '17 pm', '17 pro', 's26', 'voucher', 'điện', 'nước', 
                'icloud', 'slot', 'youtube', 'buffet', 'góp tech', 
                'góp vib', 'lending', 'triển', 'ken', 'tiger', 'đơn', 'shopping',
                'rollover from'
            ];
            const isActuallyDebt = debtKeywords.some(k => note.includes(k));

            // Pattern B: Repayment items correctly marked (to exclude from debt keywords if mixed)
            const repaymentKeywords = ['bank', 'trả', 'repay', 'rollover to', 'final'];
            const isActuallyRepayment = repaymentKeywords.some(k => note.includes(k));

            // LOGIC FOR TYPE FIX
            if (isActuallyDebt && !isActuallyRepayment && type === 'repayment') {
                newType = 'debt';
                needsUpdate = true;
                console.log(`[FIX: TYPE] Fixed ${txn.id} (${txn.note || txn.description}): repayment -> debt`);
            } else if (isActuallyRepayment && type === 'debt') {
                newType = 'repayment';
                needsUpdate = true;
                console.log(`[FIX: TYPE] Fixed ${txn.id} (${txn.note || txn.description}): debt -> repayment`);
            }
            
            // Fix sign if negative (Legacy artifacts often have - amount)
            if (txn.amount < 0) {
                needsUpdate = true;
                console.log(`[FIX: SIGN] Fixed ${txn.id} (${txn.note || txn.description}): amount sign flipped to positive`);
                txn.amount = Math.abs(txn.amount);
            }

            if (needsUpdate) {
                await pocketbaseUpdate('pvl_txn_001', txn.id, {
                    type: newType,
                    amount: Math.abs(txn.amount),
                    original_amount: Math.abs(txn.amount),
                    final_price: Math.abs(txn.final_price || txn.amount)
                });
                fixedCount++;
            }
        }

        console.log(`--- REPAIR COMPLETE: Fixed ${fixedCount} transactions ---`);
    } catch (err) {
        console.error('Repair script failed:', err);
    }
}

repairDebtIntegrity();
