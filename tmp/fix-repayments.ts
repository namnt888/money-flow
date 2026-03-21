async function fixRepaymentsSelfContained() {
    const POCKETBASE_URL = 'https://api-db.reiwarden.io.vn';
    const EMAIL = 'namnt05@gmail.com';
    const PASSWORD = 'Thanhnam0@';

    try {
        console.log('Authenticating...');
        const authRes = await fetch(`${POCKETBASE_URL}/api/collections/_superusers/auth-with-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identity: EMAIL, password: PASSWORD })
        });
        const { token } = (await authRes.json()) as any;
        console.log('Authenticated.');

        console.log('Looking for "Draft Fund" account...');
        const accRes = await fetch(`${POCKETBASE_URL}/api/collections/accounts/records?filter=(name~"Draft Fund")`, {
            headers: { 'Authorization': token }
        });
        const { items: accounts } = (await accRes.json()) as any;
        console.log('Accounts found:', accounts.map((a: any) => ({ id: a.id, name: a.name })));

        console.log('Fetching all people with sheet_linked_bank_id...');
        const peopleRes = await fetch(`${POCKETBASE_URL}/api/collections/people/records?filter=(sheet_linked_bank_id!="")`, {
            headers: { 'Authorization': token }
        });
        const { items: people } = (await peopleRes.json()) as any;
        const peopleBankMap = new Map(people.map((p: any) => [p.id, p.sheet_linked_bank_id]));
        console.log(`Found ${people.length} people with default bank account configured.`);

        console.log('Fetching repayment transactions with missing to_account_id/target_account_id...');
        const txnsRes = await fetch(`${POCKETBASE_URL}/api/collections/transactions/records?filter=((type="repayment")%26%26(to_account_id=""||to_account_id=null))&perPage=200`, {
            headers: { 'Authorization': token }
        });
        const { items: txns } = (await txnsRes.json()) as any;
        console.log(`Found ${txns.length} repayment transactions to fix.`);

        for (const txn of txns) {
            const defaultBankId = peopleBankMap.get(txn.person_id);
            if (defaultBankId) {
                console.log(`Updating txn ${txn.id} (person: ${txn.person_id}) with to_account_id ${defaultBankId}`);
                await fetch(`${POCKETBASE_URL}/api/collections/transactions/records/${txn.id}`, {
                    method: 'PATCH',
                    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ to_account_id: defaultBankId })
                });
            } else {
                console.warn(`No default bank configured for person ${txn.person_id} / txn ${txn.id}`);
            }
        }
        console.log('Done!');
    } catch (error) {
        console.error('Error:', error);
    }
}

fixRepaymentsSelfContained();
