○ Compiling /api/sheets/manage ...
[ManageSheet API] request:start {
  requestId: '729fe315-7a6a-4ab8-a48d-b0afce452233',
  action: 'sync',
  hasPersonId: true
}
[ManageSheet API] request {
  requestId: '729fe315-7a6a-4ab8-a48d-b0afce452233',
  personId: '79ef4v6kot33kjq',
  cycleTag: '2026',
  isMasterSheet: true
}
[ManageSheet API] target {
  requestId: '729fe315-7a6a-4ab8-a48d-b0afce452233',
  personId: '79ef4v6kot33kjq',
  pbId: '79ef4v6kot33kjq',
  cycleTag: '2026'
}
[ManageSheet API] person_cycle_sheets (PocketBase) lookup: { requestId: '729fe315-7a6a-4ab8-a48d-b0afce452233', found: true }
[DB:PB] PATCH https://api-db.reiwarden.io.vn/api/collections/person_cycle_sheets/records/ec9708tfimhi8f3
[DB:PB] body: {"updated_at":"2026-04-15T10:49:43.618Z"}
[Sheet] Profile lookup result {
  lookupId: '79ef4v6kot33kjq',
  pbId: '79ef4v6kot33kjq',
  sheet_link: 'https://script.google.com/macros/s/AKfycbzzp_guXvz4SWqW7yX2fdOa2aSib5x2lTpujaLRoW1LRT8X6vFvm_1h6d8HPw9dM70Otg/exec'
}
[syncCycleTransactions] Mapped rows diagnostics: {
  total: 8,
  missingId: 0,
  zeroAmount: 0,
  sample: [
    {
      id: 'f1cj6mriex12uj5',
      date: '2026-01-02 07:10:00.000Z',
      debt_cycle_tag: '2026-01',
      resolved_tag: '2026-01',
      amount: 41000,
      percent_back: 0,
      fixed_back: 0,
      notes: '2026-01 iCloud Slot: 1 - 246,000/6'
    },
    {
      id: '4qh5pq0gr33xqvl',
      date: '2026-01-02 17:00:00.000Z',
      debt_cycle_tag: '2026-01',
      resolved_tag: '2026-01',
      amount: 560000,
      percent_back: 0,
      fixed_back: 0,
      notes: '1.6% của 35'
    },
    {
      id: '0c1yt25bgj51hxa',
      date: '2026-01-02 17:00:00.000Z',
      debt_cycle_tag: '2026-01',
      resolved_tag: '2026-01',
      amount: 35000000,
      percent_back: 0,
      fixed_back: 0,
      notes: 'Bank M 35tr T1'
    },
    {
      id: '5sclr36zot8s6mz',
      date: '2026-01-12 17:00:00.000Z',
      debt_cycle_tag: '2026-01',
      resolved_tag: '2026-01',
      amount: 79700,
      percent_back: 0,
      fixed_back: 0,
      notes: 'Phúc Long'
    },
    {
      id: '64lo7u7wjzv8ma9',
      date: '2026-02-07 12:07:42.000Z',
      debt_cycle_tag: '2026-02',
      resolved_tag: '2026-02',
      amount: 41000,
      percent_back: 0,
      fixed_back: 0,
      notes: '2026-02 iCloud Slot: 1 - 246,000/6'
    }
  ]
}
[syncCycleTransactions] Raw PB rows sample: [
  {
    id: 'f1cj6mriex12uj5',
    occurred_at: '2026-01-02 07:10:00.000Z',
    debt_cycle_tag: '2026-01',
    tag: '2026-01'
  },
  {
    id: '4qh5pq0gr33xqvl',
    occurred_at: '2026-01-02 17:00:00.000Z',
    debt_cycle_tag: '2026-01',
    tag: '2026-01'
  },
  {
    id: '0c1yt25bgj51hxa',
    occurred_at: '2026-01-02 17:00:00.000Z',
    debt_cycle_tag: '2026-01',
    tag: '2026-01'
  }
]
[Sheet Sync] Sending 8 mapped transactions to 79ef4v6kot33kjq for cycle 2026 (sheet cycle 2026-01)
[syncCycleTransactions] Person sheet preferences: {
  personId: '79ef4v6kot33kjq',
  showBankAccount: false,
  resolvedBankInfo: 'Vib',
  showQrImage: false,
  qrImageUrl: '(not set)'
}
[syncCycleTransactions] Final payload: {
  action: 'syncTransactions',
  person_id: '79ef4v6kot33kjq',
  cycle_tag: '2026-01',
  sheet_id: '1-56IPBtp_DPiThKZYv026uQAKx5X4hAX5rB9zPyR1z4',
  rows: '[8 rows]',
  bank_account: '',
  img: ''
}
[ManageSheet API] sync result {
  requestId: '729fe315-7a6a-4ab8-a48d-b0afce452233',
  cycleTag: '2026',
  success: true,
  message: 'ok',
  syncedCount: 8
}
 POST /api/sheets/manage 200 in 20.7s (compile: 9.2s, render: 11.5s)
[people.service] Merge config for My: {
  sheet_link: true,
  google_sheet_url: true,
  sheet_linked_bank_id: true
}
[people.service] Merge config for My: {
  sheet_link: true,
  google_sheet_url: true,
  sheet_linked_bank_id: true
}
[getPeople] Filter for 79ef4v6kot33kjq: (type='debt' || type='expense' || type='repayment' || type='income' || type='transfer' || type='cashback') && status!='void' && (person_id='79ef4v6kot33kjq' || (account_id='eu78ndey2tlfz9c'))
[getPeople] Filter for 79ef4v6kot33kjq: (type='debt' || type='expense' || type='repayment' || type='income' || type='transfer' || type='cashback') && status!='void' && (person_id='79ef4v6kot33kjq' || (account_id='eu78ndey2tlfz9c'))
[DB:PB] person-cycle-sheets.get person=79ef4v6kot33kjq
 GET /people/79ef4v6kot33kjq?tag=all 200 in 5.0s (compile: 245ms, proxy.ts: 550ms, render: 4.2s)
[Stats:PB] resolve account: {
  sourceAccountId: '21h4zw0qnab76ro',
  found: true,
  pbId: '21h4zw0qnab76ro'
}
 POST /people/79ef4v6kot33kjq?tag=all 200 in 2.6s (compile: 1233ms, proxy.ts: 1342ms, render: 48ms)
[Stats:PB] resolve account: {
  sourceAccountId: '9t1j5wv4o6eu90q',
  found: true,
  pbId: '9t1j5wv4o6eu90q'
}
 POST /people/79ef4v6kot33kjq?tag=all 200 in 641ms (compile: 392ms, proxy.ts: 227ms, render: 22ms)
[Stats:PB] resolve account: {
  sourceAccountId: '04ytttr0nifvnif',
  found: true,
  pbId: '04ytttr0nifvnif'
}
 POST /people/79ef4v6kot33kjq?tag=all 200 in 469ms (compile: 201ms, proxy.ts: 232ms, render: 36ms)
[Stats:PB] resolve account: {
  sourceAccountId: 'zw40tyu0p02oxcj',
  found: true,
  pbId: 'zw40tyu0p02oxcj'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='zw40tyu0p02oxcj' && persisted_cycle_tag='2026-04'",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 0 }
[DB:PB] account spending stats: transaction query attempt { attempt: 2, filter: "account_id='zw40tyu0p02oxcj'", sort: undefined }
[DB:PB] account spending stats: transaction query succeeded { attempt: 2, count: 0 }
[DB:PB] account spending stats: all transaction query attempts exhausted, falling back to cycle snapshot { sourceAccountId: 'zw40tyu0p02oxcj', cycleTag: '2026-04' }
 POST /people/79ef4v6kot33kjq?tag=all 200 in 2.1s (compile: 393ms, proxy.ts: 230ms, render: 1450ms)
[Stats:PB] resolve account: {
  sourceAccountId: 'cu2294996oatqd2',
  found: true,
  pbId: 'cu2294996oatqd2'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='cu2294996oatqd2' && persisted_cycle_tag='2026-04'",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 0 }
[DB:PB] account spending stats: transaction query attempt { attempt: 2, filter: "account_id='cu2294996oatqd2'", sort: undefined }
[DB:PB] account spending stats: transaction query succeeded { attempt: 2, count: 0 }
[DB:PB] account spending stats: all transaction query attempts exhausted, falling back to cycle snapshot { sourceAccountId: 'cu2294996oatqd2', cycleTag: '2026-04' }
 POST /people/79ef4v6kot33kjq?tag=all 200 in 1422ms (compile: 240ms, proxy.ts: 190ms, render: 992ms)
[Stats:PB] resolve account: {
  sourceAccountId: '9tka6n6i1ce3jla',
  found: true,
  pbId: '9tka6n6i1ce3jla'
}
 POST /people/79ef4v6kot33kjq?tag=all 200 in 290ms (compile: 31ms, proxy.ts: 190ms, render: 70ms)