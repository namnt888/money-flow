
const POCKETBASE_URL = 'https://api-db.reiwarden.io.vn';
const EMAIL = 'namnt05@gmail.com';
const PASSWORD = 'Thanhnam0@';

async function run() {
  const authRes = await fetch(`${POCKETBASE_URL}/api/collections/_superusers/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: EMAIL, password: PASSWORD }),
  });
  const authData = await authRes.json();
  const token = authData.token;

  const personId = 'wlv4acbrq11l8de'; // Tuấn
  const cycle = '2026-03';

  const txnsRes = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?filter=(person_id='${personId}') && tag='${cycle}'&perPage=500&sort=-occurred_at`, {
    headers: { 'Authorization': token }
  });
  
  const txnsData = await txnsRes.json();
  const txns = txnsData.items;

  console.log(`Analyzing ${txns.length} transactions for ${personId} in ${cycle}`);

  let originalAmount = 0; // Spend (Normal)
  let repaymentAmount = 0; // Repay (Normal)
  let cashbackTotal = 0; // Cashback
  let previousDebt = 0; // Rollovers

  txns.forEach(t => {
    const amount = Number(t.amount || 0);
    const type = t.type;
    const note = (t.note || '').toLowerCase();
    
    // Categorization Logic according to MONEY_GLOSSARY.md
    
    const isRollover = note.includes('rollover');
    const isCashback = type === 'cashback' || note.includes('cashback');
    const isRepayment = type === 'repayment' || type === 'repay' || (type === 'income' && (note.includes('trả') || note.includes('repay'))) && !isCashback;
    const isSpend = (type === 'expense' || type === 'debt') && !isRollover && !isCashback && !isRepayment;

    if (isRollover) {
        // Only count positive rollover as "Previous Debt" incoming? 
        // Actually Rollover from 2026-02 usually means debt coming IN.
        // In the logs it was: [debt] Amt: -27667 | Note: Rollover from 2026-02
        // Wait, if Amt is NEGATIVE for a debt transaction, what does it mean?
        // Let's assume absolute value for the metrics but keep signs in mind.
        previousDebt += Math.abs(amount);
        console.log(`[ROLLOVER] ${t.note}: ${amount}`);
    } else if (isCashback) {
        cashbackTotal += Math.abs(amount);
        console.log(`[CASHBACK] ${t.note}: ${amount}`);
    } else if (isRepayment) {
        repaymentAmount += Math.abs(amount);
        console.log(`[REPAYMENT] ${t.note}: ${amount}`);
    } else if (isSpend) {
        originalAmount += Math.abs(amount);
        console.log(`[SPEND] ${t.note}: ${amount}`);
    } else {
        console.log(`[UNKNOWN TYPE: ${type}] ${t.note}: ${amount}`);
    }
  });

  console.log('\n--- PHASE B VERIFICATION RESULTS ---');
  console.log('1. Original Amount (Base):', originalAmount);
  console.log('2. Cashback Total:', cashbackTotal);
  console.log('3. Net Amount (Base - Cashback):', originalAmount - cashbackTotal);
  console.log('4. Repayment Amount (Settled):', repaymentAmount);
  console.log('5. Remaining Amount (Net - Repayment):', (originalAmount - cashbackTotal) - repaymentAmount);
  console.log('6. Previous Debt:', previousDebt);
}

run().catch(console.error);
