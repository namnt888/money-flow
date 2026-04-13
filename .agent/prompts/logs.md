 ○ Compiling /people/[id] ...
[DB:PB] transactions.unified.list { limit: 1000, includeVoided: true, includeHistoryCount: false }
[DB:PB] accounts.getAll
[DB:PB] people.list → 28 records
[people.service] Merge config for Lâm: {
  sheet_link: true,
  google_sheet_url: true,
  sheet_linked_bank_id: true
}
[people.service] Merge config for Lâm: {
  sheet_link: true,
  google_sheet_url: true,
  sheet_linked_bank_id: true
}
[getPeople] Filter for 4wxl4cpp7u4adbb: (type='debt' || type='expense' || type='repayment' || type='income' || type='transfer' || type='cashback') && status!='void' && (person_id='4wxl4cpp7u4adbb' || (account_id='m9wc74ai0r7nbpj'))
[getPeople] Filter for 4wxl4cpp7u4adbb: (type='debt' || type='expense' || type='repayment' || type='income' || type='transfer' || type='cashback') && status!='void' && (person_id='4wxl4cpp7u4adbb' || (account_id='m9wc74ai0r7nbpj'))
[DB:PB] person-cycle-sheets.get person=4wxl4cpp7u4adbb
[DB:PB] transactions.unified.list → 454 records
 GET /api/sidebar/search 200 in 19.0s (compile: 7ms, render: 19.0s)
 GET /transactions 200 in 35.6s (compile: 11.1s, proxy.ts: 619ms, render: 23.9s)
 GET /api/sidebar/search 200 in 20.1s (compile: 723ms, render: 19.4s)
 GET /api/sidebar/search 200 in 20.3s (compile: 764ms, render: 19.5s)
 GET /api/sidebar/search 200 in 459ms (compile: 28ms, render: 431ms)
[DB:PB] accounts.getAll
 GET /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 36.9s (compile: 12.2s, proxy.ts: 466ms, render: 24.3s)
[ManageSheet API] request:start {
  requestId: '1046bcc9-33e6-43ac-90e1-8f37a3e828fc',
  action: 'sync',
  hasPersonId: true
}
[ManageSheet API] request {
  requestId: '1046bcc9-33e6-43ac-90e1-8f37a3e828fc',
  personId: '4wxl4cpp7u4adbb',
  cycleTag: '2026-03',
  isMasterSheet: false
}
[ManageSheet API] target {
  requestId: '1046bcc9-33e6-43ac-90e1-8f37a3e828fc',
  personId: '4wxl4cpp7u4adbb',
  pbId: '4wxl4cpp7u4adbb',
  cycleTag: '2026-03'
}
[ManageSheet API] person_cycle_sheets (PocketBase) lookup: { requestId: '1046bcc9-33e6-43ac-90e1-8f37a3e828fc', found: true }
[DB:PB] PATCH https://api-db.reiwarden.io.vn/api/collections/person_cycle_sheets/records/maaw5sxpkribp2l
[DB:PB] body: {"updated_at":"2026-04-13T11:59:15.266Z"}
[Sheet] Profile lookup result {
  lookupId: '4wxl4cpp7u4adbb',
  pbId: '4wxl4cpp7u4adbb',
  sheet_link: 'https://script.google.com/macros/s/AKfycbwI_Nvz5bd-qFROwgv5QPll5BgSCbrgm-aL2i4fXBGg-juKbliafo0ZVeNXBlvsNhC1/exec'
}
[syncCycleTransactions] Mapped rows diagnostics: {
  total: 1,
  missingId: 0,
  zeroAmount: 0,
  sample: [
    {
      id: '1c0zp342njjpc0h',
      date: '2026-03-11 12:25:29.835Z',
      debt_cycle_tag: '2026-03',
      resolved_tag: '2026-03',
      amount: 191250,
      percent_back: 8,
      fixed_back: 0,
      notes: 'Bielende'
    }
  ]
}
[syncCycleTransactions] Raw PB rows sample: [
  {
    id: '1c0zp342njjpc0h',
    occurred_at: '2026-03-11 12:25:29.835Z',
    debt_cycle_tag: '2026-03',
    tag: '2026-03'
  }
]
[Sheet Sync] Sending 1 mapped transactions to 4wxl4cpp7u4adbb for cycle 2026-03
[syncCycleTransactions] Person sheet preferences: {
  personId: '4wxl4cpp7u4adbb',
  showBankAccount: true,
  resolvedBankInfo: 'Tpbank 27888899999 NGUYEN THANH NAM',
  showQrImage: true,
  qrImageUrl: '(URL set)'
}
[syncCycleTransactions] Final payload: {
  action: 'syncTransactions',
  person_id: '4wxl4cpp7u4adbb',
  cycle_tag: '2026-03',
  sheet_id: '1ZbrVMs4-HmDXpgrC6_NMicIwlVN5j5RLP4LqE-62y_Q',
  rows: '[1 rows]',
  bank_account: 'Tpbank 27888899999 NGUYEN THANH NAM',
  img: 'https://res.cloudinary.com/dwzciowzf/image/upload/v1772165041/QR_Tpbank_okw5pk.png'
}
 POST /transactions 200 in 40s (compile: 17ms, proxy.ts: 495ms, render: 39.5s)
[DB:PB] accounts.getAll
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 22.0s (compile: 638ms, proxy.ts: 517ms, render: 20.9s)
[DB:PB] accounts.getAll
[ManageSheet API] sync result {
  requestId: '1046bcc9-33e6-43ac-90e1-8f37a3e828fc',
  cycleTag: '2026-03',
  success: true,
  message: 'ok',
  syncedCount: 1
}
[DB:PB] PATCH https://api-db.reiwarden.io.vn/api/collections/person_cycle_sheets/records/u3o2iowdak9rt6d
[DB:PB] body: {"updated_at":"2026-04-13T11:59:28.025Z"}
[Sheet] Profile lookup result {
  lookupId: '4wxl4cpp7u4adbb',
  pbId: '4wxl4cpp7u4adbb',
  sheet_link: 'https://script.google.com/macros/s/AKfycbwI_Nvz5bd-qFROwgv5QPll5BgSCbrgm-aL2i4fXBGg-juKbliafo0ZVeNXBlvsNhC1/exec'
}
[syncCycleTransactions] Mapped rows diagnostics: {
  total: 9,
  missingId: 0,
  zeroAmount: 0,
  sample: [
    {
      id: '2vb88jq6xw80049',
      date: '2026-02-01 12:06:12.000Z',
      debt_cycle_tag: '2026-02',
      resolved_tag: '2026-02',
      amount: 55333.33,
      percent_back: 0,
      fixed_back: 0,
      notes: '2026-02 Youtube Slot: 2 - 166,000/6'
    },
    {
      id: 'bmxk43ydsem5hwm',
      date: '2026-02-01 12:07:42.000Z',
      debt_cycle_tag: '2026-02',
      resolved_tag: '2026-02',
      amount: 82000,
      percent_back: 0,
      fixed_back: 0,
      notes: '2026-02 iCloud Slot: 2 - 246,000/6'
    },
    {
      id: 'erhsxuum04lg15r',
      date: '2026-02-03 15:21:14.394Z',
      debt_cycle_tag: '2026-02',
      resolved_tag: '2026-02',
      amount: 1741954,
      percent_back: 4,
      fixed_back: 0,
      notes: 'Điện T1 [1.076.033 fee 35.921]'
    },
    {
      id: 'c0xq4w9y4cbkhes',
      date: '2026-02-04 16:00:26.147Z',
      debt_cycle_tag: '2026-02',
      resolved_tag: '2026-02',
      amount: 991420,
      percent_back: 0,
      fixed_back: 0,
      notes: 'Derma: 1 HA B5 + 1 B3 -100k MSB'
    },
    {
      id: 'bw9xfaz8jf31hq6',
      date: '2026-02-07 12:02:11.396Z',
      debt_cycle_tag: '2026-02',
      resolved_tag: '2026-02',
      amount: 504400,
      percent_back: 0,
      fixed_back: 0,
      notes: 'Derma: 2 Vit C -50k Mb'
    }
  ]
}
[syncCycleTransactions] Raw PB rows sample: [
  {
    id: '2vb88jq6xw80049',
    occurred_at: '2026-02-01 12:06:12.000Z',
    debt_cycle_tag: '2026-02',
    tag: '2026-02'
  },
  {
    id: 'bmxk43ydsem5hwm',
    occurred_at: '2026-02-01 12:07:42.000Z',
    debt_cycle_tag: '2026-02',
    tag: '2026-02'
  },
  {
    id: 'erhsxuum04lg15r',
    occurred_at: '2026-02-03 15:21:14.394Z',
    debt_cycle_tag: '2026-02',
    tag: '2026-02'
  }
]
[Sheet Sync] Sending 9 mapped transactions to 4wxl4cpp7u4adbb for cycle 2026-02
[syncCycleTransactions] Person sheet preferences: {
  personId: '4wxl4cpp7u4adbb',
  showBankAccount: true,
  resolvedBankInfo: 'Tpbank 27888899999 NGUYEN THANH NAM',
  showQrImage: true,
  qrImageUrl: '(URL set)'
}
[syncCycleTransactions] Final payload: {
  action: 'syncTransactions',
  person_id: '4wxl4cpp7u4adbb',
  cycle_tag: '2026-02',
  sheet_id: '1ZbrVMs4-HmDXpgrC6_NMicIwlVN5j5RLP4LqE-62y_Q',
  rows: '[9 rows]',
  bank_account: 'Tpbank 27888899999 NGUYEN THANH NAM',
  img: 'https://res.cloudinary.com/dwzciowzf/image/upload/v1772165041/QR_Tpbank_okw5pk.png'
}
[ManageSheet API] sync result {
  requestId: '1046bcc9-33e6-43ac-90e1-8f37a3e828fc',
  cycleTag: '2026-02',
  success: true,
  message: 'ok',
  syncedCount: 9
}
 POST /api/sheets/manage 200 in 27.3s (compile: 906ms, render: 26.4s)
 POST /transactions 200 in 21.3s (compile: 22ms, proxy.ts: 339ms, render: 20.9s)
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 20.6s (compile: 49ms, proxy.ts: 178ms, render: 20.4s)
[Stats:PB] resolve account: {
  sourceAccountId: 'qvhxj1tg36fl485',
  found: true,
  pbId: 'qvhxj1tg36fl485'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='qvhxj1tg36fl485' && (debt_cycle_tag='2026-03' || persisted_cycle_tag='2026-03' || tag='2026-03')",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 15 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 1816ms (compile: 57ms, proxy.ts: 483ms, render: 1276ms)
[Stats:PB] resolve account: {
  sourceAccountId: '918bn7qgqsrray1',
  found: true,
  pbId: '918bn7qgqsrray1'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 574ms (compile: 45ms, proxy.ts: 183ms, render: 346ms)
[Stats:PB] resolve account: {
  sourceAccountId: '21h4zw0qnab76ro',
  found: true,
  pbId: '21h4zw0qnab76ro'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 572ms (compile: 21ms, proxy.ts: 227ms, render: 324ms)
[Stats:PB] resolve account: {
  sourceAccountId: '5vuimypvnmzm5wx',
  found: true,
  pbId: '5vuimypvnmzm5wx'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='5vuimypvnmzm5wx' && (debt_cycle_tag='2026-03' || persisted_cycle_tag='2026-03' || tag='2026-03')",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 4 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 1279ms (compile: 42ms, proxy.ts: 184ms, render: 1053ms)
[Stats:PB] resolve account: {
  sourceAccountId: '3xhx6optlr91lez',
  found: true,
  pbId: '3xhx6optlr91lez'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='3xhx6optlr91lez' && (debt_cycle_tag='2026-03' || persisted_cycle_tag='2026-03' || tag='2026-03')",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 1 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 1214ms (compile: 41ms, proxy.ts: 180ms, render: 993ms)
[Stats:PB] resolve account: {
  sourceAccountId: '04ytttr0nifvnif',
  found: true,
  pbId: '04ytttr0nifvnif'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 686ms (compile: 40ms, proxy.ts: 271ms, render: 374ms)
[Stats:PB] resolve account: {
  sourceAccountId: 'qvhxj1tg36fl485',
  found: true,
  pbId: 'qvhxj1tg36fl485'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='qvhxj1tg36fl485' && (debt_cycle_tag='2026-03' || persisted_cycle_tag='2026-03' || tag='2026-03')",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 15 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 1068ms (compile: 16ms, proxy.ts: 289ms, render: 762ms)
[Stats:PB] resolve account: {
  sourceAccountId: '918bn7qgqsrray1',
  found: true,
  pbId: '918bn7qgqsrray1'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 390ms (compile: 45ms, proxy.ts: 322ms, render: 22ms)
[Stats:PB] resolve account: {
  sourceAccountId: '21h4zw0qnab76ro',
  found: true,
  pbId: '21h4zw0qnab76ro'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 235ms (compile: 19ms, proxy.ts: 203ms, render: 13ms)
[Stats:PB] resolve account: {
  sourceAccountId: '5vuimypvnmzm5wx',
  found: true,
  pbId: '5vuimypvnmzm5wx'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='5vuimypvnmzm5wx' && (debt_cycle_tag='2026-03' || persisted_cycle_tag='2026-03' || tag='2026-03')",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 4 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 1092ms (compile: 19ms, proxy.ts: 262ms, render: 811ms)
[Stats:PB] resolve account: {
  sourceAccountId: '3xhx6optlr91lez',
  found: true,
  pbId: '3xhx6optlr91lez'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='3xhx6optlr91lez' && (debt_cycle_tag='2026-03' || persisted_cycle_tag='2026-03' || tag='2026-03')",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 1 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 991ms (compile: 47ms, proxy.ts: 175ms, render: 769ms)
[Stats:PB] resolve account: {
  sourceAccountId: '04ytttr0nifvnif',
  found: true,
  pbId: '04ytttr0nifvnif'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 339ms (compile: 42ms, proxy.ts: 280ms, render: 17ms)
[people.service] Merge config for Lâm: {
  sheet_link: true,
  google_sheet_url: true,
  sheet_linked_bank_id: true
}
[people.service] Merge config for Lâm: {
  sheet_link: true,
  google_sheet_url: true,
  sheet_linked_bank_id: true
}
[getPeople] Filter for 4wxl4cpp7u4adbb: (type='debt' || type='expense' || type='repayment' || type='income' || type='transfer' || type='cashback') && status!='void' && (person_id='4wxl4cpp7u4adbb' || (account_id='m9wc74ai0r7nbpj'))
[getPeople] Filter for 4wxl4cpp7u4adbb: (type='debt' || type='expense' || type='repayment' || type='income' || type='transfer' || type='cashback') && status!='void' && (person_id='4wxl4cpp7u4adbb' || (account_id='m9wc74ai0r7nbpj'))
[DB:PB] person-cycle-sheets.get person=4wxl4cpp7u4adbb
 GET /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 3.6s (compile: 20ms, proxy.ts: 181ms, render: 3.4s)
[Stats:PB] resolve account: {
  sourceAccountId: 'qvhxj1tg36fl485',
  found: true,
  pbId: 'qvhxj1tg36fl485'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='qvhxj1tg36fl485' && (debt_cycle_tag='2026-03' || persisted_cycle_tag='2026-03' || tag='2026-03')",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 15 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 1203ms (compile: 38ms, proxy.ts: 381ms, render: 784ms)
[Stats:PB] resolve account: {
  sourceAccountId: '918bn7qgqsrray1',
  found: true,
  pbId: '918bn7qgqsrray1'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 222ms (compile: 35ms, proxy.ts: 171ms, render: 16ms)
[Stats:PB] resolve account: {
  sourceAccountId: '21h4zw0qnab76ro',
  found: true,
  pbId: '21h4zw0qnab76ro'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 209ms (compile: 23ms, proxy.ts: 169ms, render: 17ms)
[Stats:PB] resolve account: {
  sourceAccountId: '5vuimypvnmzm5wx',
  found: true,
  pbId: '5vuimypvnmzm5wx'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='5vuimypvnmzm5wx' && (debt_cycle_tag='2026-03' || persisted_cycle_tag='2026-03' || tag='2026-03')",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 4 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 1061ms (compile: 19ms, proxy.ts: 169ms, render: 872ms)
[Stats:PB] resolve account: {
  sourceAccountId: '3xhx6optlr91lez',
  found: true,
  pbId: '3xhx6optlr91lez'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='3xhx6optlr91lez' && (debt_cycle_tag='2026-03' || persisted_cycle_tag='2026-03' || tag='2026-03')",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 1 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 976ms (compile: 33ms, proxy.ts: 276ms, render: 666ms)
[Stats:PB] resolve account: {
  sourceAccountId: '04ytttr0nifvnif',
  found: true,
  pbId: '04ytttr0nifvnif'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 206ms (compile: 19ms, proxy.ts: 175ms, render: 12ms)
