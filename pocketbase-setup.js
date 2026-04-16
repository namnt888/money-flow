
const POCKETBASE_URL = 'https://api-db.reiwarden.io.vn';
const POCKETBASE_EMAIL = 'namnt05@gmail.com';
const POCKETBASE_PASSWORD = 'Thanhnam0@';

function generateBatchItemNote(params) {
    const [year, month] = (params.monthYear || '').split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let monthYearStr = '';
    if (year && month) {
        monthYearStr = `${monthNames[parseInt(month) - 1]}${year}`; // e.g. Mar2026
    }
    
    const bankTypeName = params.bankType === 'MBB' ? 'Mbb' : 'Vib';
    const accountPart = params.accountName || params.receiverName || 'Unknown';
    const phasePart = params.phaseName || (params.period === 'before' ? 'Before' : 'After');
    
    return `${accountPart} ${phasePart} ${monthYearStr} by ${bankTypeName}`;
}

async function setupMetadata() {
    console.log('--- PocketBase Metadata & Note Backfill (V2 - Account & Phase Correct) ---');
    
    // 1. Auth as Admin
    const authRes = await fetch(`${POCKETBASE_URL}/api/collections/_superusers/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: POCKETBASE_EMAIL, password: POCKETBASE_PASSWORD })
    });
    
    if (!authRes.ok) throw new Error('Auth failed');
    const { token } = await authRes.json();
    console.log('Authenticated successfully.');

    // 2. Backfill Data (Recursive)
    console.log('Backfilling notes and metadata...');
    let page = 1;
    let processed = 0;
    while (true) {
        const itemsRes = await fetch(`${POCKETBASE_URL}/api/collections/batch_items/records?page=${page}&perPage=100&expand=batch_id,target_account_id,phase_id`, {
            headers: { 'Authorization': token }
        });
        const itemsData = await itemsRes.json();
        if (!itemsData.items || itemsData.items.length === 0) break;

        for (const item of itemsData.items) {
            const batch = item.expand?.batch_id;
            const account = item.expand?.target_account_id;
            const phase = item.expand?.phase_id;

            // We want to fix notes that use Receiver Name instead of Account Name
            // If the note doesn't contain account name OR if it's currently generated with the wrong pattern
            const currentNote = item.note || '';
            const accountName = account?.name;
            const receiverName = item.receiver_name;
            
            let shouldUpdate = false;
            const updatePayload = {};

            // Check if note is missing or incorrect
            const expectedNotePrefix = accountName ? accountName : receiverName;
            
            // If note is empty OR starts with receiver name but account name is available
            if (!currentNote || (accountName && currentNote.startsWith(receiverName) && accountName !== receiverName)) {
                updatePayload.note = generateBatchItemNote({
                    receiverName: receiverName,
                    accountName: accountName,
                    phaseName: phase?.label,
                    period: batch?.period || item.period,
                    monthYear: batch?.month_year || item.month_year,
                    bankType: batch?.bank_type || item.bank_type
                });
                shouldUpdate = true;
            }

            // Sync missing traceability
            if (batch && (!item.month_year || !item.bank_type)) {
                updatePayload.month_year = batch.month_year;
                updatePayload.bank_type = batch.bank_type;
                updatePayload.phase_id = batch.phase_id || null;
                shouldUpdate = true;
            }

            // Sync metadata
            if (!item.metadata || !item.metadata.batch_id) {
                updatePayload.metadata = { 
                    ...(item.metadata || {}),
                    backfilled: true, 
                    batch_id: batch?.id || item.batch_id,
                    last_updated: new Date().toISOString()
                };
                shouldUpdate = true;
            }

            if (shouldUpdate) {
                const patchRes = await fetch(`${POCKETBASE_URL}/api/collections/batch_items/records/${item.id}`, {
                    method: 'PATCH',
                    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatePayload)
                });
                if (patchRes.ok) processed++;
                else console.error(`Failed to update item ${item.id}:`, await patchRes.text());
            }
        }
        if (page >= itemsData.totalPages) break;
        page++;
    }
    
    console.log(`Setup complete. Records corrected/updated: ${processed}`);
}

setupMetadata().catch(console.error);
