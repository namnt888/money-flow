POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 331ms (compile: 37ms, proxy.ts: 269ms, render: 24ms)
[ManageSheet API] request:start {
  requestId: '067566e9-31ba-43a5-8dd5-2011438b6fb8',
  action: 'sync',
  hasPersonId: true
}
[ManageSheet API] request {
  requestId: '067566e9-31ba-43a5-8dd5-2011438b6fb8',
  personId: '4wxl4cpp7u4adbb',
  cycleTag: '2026-03',
  isMasterSheet: false
}
[ManageSheet API] target {
  requestId: '067566e9-31ba-43a5-8dd5-2011438b6fb8',
  personId: '4wxl4cpp7u4adbb',
  pbId: '4wxl4cpp7u4adbb',
  cycleTag: '2026-03'
}
[ManageSheet API] person_cycle_sheets (PocketBase) lookup: { requestId: '067566e9-31ba-43a5-8dd5-2011438b6fb8', found: true }
[DB:PB] PATCH https://api-db.reiwarden.io.vn/api/collections/person_cycle_sheets/records/maaw5sxpkribp2l
[DB:PB] body: {"updated_at":"2026-04-20T11:30:46.709Z"}
[syncCycleTransactions][cascade][start] {
  syncRunId: 'sync-1776684647039-0zu1hc',
  personId: '4wxl4cpp7u4adbb',
  cycleTag: '2026-03',
  normalizedCycle: '2026-03',
  cascadeDepth: 0,
  visitedCycles: []
}
[Sheet] Profile lookup result {
  lookupId: '4wxl4cpp7u4adbb',
  pbId: '4wxl4cpp7u4adbb',
  sheet_link: 'https://script.google.com/macros/s/AKfycbwI_Nvz5bd-qFROwgv5QPll5BgSCbrgm-aL2i4fXBGg-juKbliafo0ZVeNXBlvsNhC1/exec'
}
[syncCycleTransactions] Mapped rows diagnostics: {
  total: 10,
  missingId: 0,
  zeroAmount: 0,
  sample: [
    {
      id: '09zz6t4w4foopad',
      date: '2026-03-01 02:00:00.000Z',
      debt_cycle_tag: '2026-03',
      resolved_tag: '2026-03',
      amount: 55333.333333333336,
      percent_back: 0,
      fixed_back: 0,
      notes: 'Lâm 2026-03 Slot: 2 (27,667)/6'
    },
    {
      id: '9bdjy9thj4da8au',
      date: '2026-03-01 02:00:00.000Z',
      debt_cycle_tag: '2026-03',
      resolved_tag: '2026-03',
      amount: 82000,
      percent_back: 0,
      fixed_back: 0,
      notes: 'Lâm 2026-03 Slot: 2 (41,000)/6'
    },
    {
      id: '047wzzcb4dzzadu',
      date: '2026-03-02 10:22:50.667Z',
      debt_cycle_tag: '2026-03',
      resolved_tag: '2026-03',
      amount: 14500,
      percent_back: 0,
      fixed_back: 0,
      notes: 'Shopee VIP T3 #Fee=29.000'
    },
    {
      id: 'jbkmi0t694awffd',
      date: '2026-03-03 00:30:12.127Z',
      debt_cycle_tag: '2026-03',
      resolved_tag: '2026-03',
      amount: 918060,
      percent_back: 8,
      fixed_back: 0,
      notes: 'Derma: 2 HA B5 + 1 AHA '
    },
    {
      id: 'qy9xuxfos1n1afq',
      date: '2026-03-03 10:16:40.567Z',
      debt_cycle_tag: '2026-03',
      resolved_tag: '2026-03',
      amount: 1623796,
      percent_back: 4,
      fixed_back: 0,
      notes: 'Điện T2 #Fee=33.604'
    }
  ]
}
[syncCycleTransactions] Raw PB rows sample: [
  {
    id: '09zz6t4w4foopad',
    occurred_at: '2026-03-01 02:00:00.000Z',
    debt_cycle_tag: '2026-03',
    tag: '2026-03'
  },
  {
    id: '9bdjy9thj4da8au',
    occurred_at: '2026-03-01 02:00:00.000Z',
    debt_cycle_tag: '2026-03',
    tag: '2026-03'
  },
  {
    id: '047wzzcb4dzzadu',
    occurred_at: '2026-03-02 10:22:50.667Z',
    debt_cycle_tag: '2026-03',
    tag: '2026-03'
  }
]
[Sheet Sync] Sending 10 mapped transactions to 4wxl4cpp7u4adbb for cycle 2026-03 (sheet cycle 2026-03)
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
  master_sheet: false,
  sheet_id: '1ZbrVMs4-HmDXpgrC6_NMicIwlVN5j5RLP4LqE-62y_Q',
  rows: '[10 rows]',
  bank_account: 'Tpbank 27888899999 NGUYEN THANH NAM',
  img: 'https://res.cloudinary.com/dwzciowzf/image/upload/v1772165041/QR_Tpbank_okw5pk.png'
}
[syncCycleTransactions][cascade][base-sync-success] {
  syncRunId: 'sync-1776684647039-0zu1hc',
  personId: '4wxl4cpp7u4adbb',
  cycleTag: '2026-03',
  normalizedCycle: '2026-03',
  cascadeDepth: 0,
  rowCount: 10
}
[syncCycleTransactions][cascade][none] {
  syncRunId: 'sync-1776684647039-0zu1hc',
  personId: '4wxl4cpp7u4adbb',
  cycleTag: '2026-03',
  normalizedCycle: '2026-03',
  cascadeDepth: 0
}
[syncCycleTransactions][cascade][done-success] {
  syncRunId: 'sync-1776684647039-0zu1hc',
  personId: '4wxl4cpp7u4adbb',
  cycleTag: '2026-03',
  normalizedCycle: '2026-03',
  cascadeDepth: 0,
  cascadeSynced: [],
  rowCount: 10
}
[ManageSheet API] sync result {
  requestId: '067566e9-31ba-43a5-8dd5-2011438b6fb8',
  cycleTag: '2026-03',
  success: true,
  message: 'ok',
  syncedCount: 10
}
[DB:PB] PATCH https://api-db.reiwarden.io.vn/api/collections/person_cycle_sheets/records/u3o2iowdak9rt6d
[DB:PB] body: {"updated_at":"2026-04-20T11:30:57.641Z"}
[syncCycleTransactions][cascade][start] {
  syncRunId: 'sync-1776684658047-6nxjhw',
  personId: '4wxl4cpp7u4adbb',
  cycleTag: '2026-02',
  normalizedCycle: '2026-02',
  cascadeDepth: 0,
  visitedCycles: []
}
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
[Sheet Sync] Sending 9 mapped transactions to 4wxl4cpp7u4adbb for cycle 2026-02 (sheet cycle 2026-02)
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
  master_sheet: false,
  sheet_id: '1ZbrVMs4-HmDXpgrC6_NMicIwlVN5j5RLP4LqE-62y_Q',
  rows: '[9 rows]',
  bank_account: 'Tpbank 27888899999 NGUYEN THANH NAM',
  img: 'https://res.cloudinary.com/dwzciowzf/image/upload/v1772165041/QR_Tpbank_okw5pk.png'
}
[syncCycleTransactions][cascade][base-sync-success] {
  syncRunId: 'sync-1776684658047-6nxjhw',
  personId: '4wxl4cpp7u4adbb',
  cycleTag: '2026-02',
  normalizedCycle: '2026-02',
  cascadeDepth: 0,
  rowCount: 9
}
[syncCycleTransactions][cascade][none] {
  syncRunId: 'sync-1776684658047-6nxjhw',
  personId: '4wxl4cpp7u4adbb',
  cycleTag: '2026-02',
  normalizedCycle: '2026-02',
  cascadeDepth: 0
}
[syncCycleTransactions][cascade][done-success] {
  syncRunId: 'sync-1776684658047-6nxjhw',
  personId: '4wxl4cpp7u4adbb',
  cycleTag: '2026-02',
  normalizedCycle: '2026-02',
  cascadeDepth: 0,
  cascadeSynced: [],
  rowCount: 9
}
[ManageSheet API] sync result {
  requestId: '067566e9-31ba-43a5-8dd5-2011438b6fb8',
  cycleTag: '2026-02',
  success: true,
  message: 'ok',
  syncedCount: 9
}
 POST /api/sheets/manage 200 in 25.3s (compile: 302ms, render: 25.0s)
[getPeople] Filter for 4wxl4cpp7u4adbb: (type='debt' || type='expense' || type='repayment' || type='income' || type='transfer' || type='cashback') && status!='void' && (person_id='4wxl4cpp7u4adbb' || (account_id='m9wc74ai0r7nbpj'))
[DB:PB] person-cycle-sheets.get person=4wxl4cpp7u4adbb
 GET /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 4.7s (compile: 63ms, proxy.ts: 339ms, render: 4.3s)
[Stats:PB] resolve account: {
  sourceAccountId: 'm9wc74ai0r7nbpj',
  found: true,
  pbId: 'm9wc74ai0r7nbpj'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 561ms (compile: 52ms, proxy.ts: 481ms, render: 28ms)
[Stats:PB] resolve account: {
  sourceAccountId: '918bn7qgqsrray1',
  found: true,
  pbId: '918bn7qgqsrray1'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 269ms (compile: 36ms, proxy.ts: 199ms, render: 33ms)
[Stats:PB] resolve account: {
  sourceAccountId: 'qvhxj1tg36fl485',
  found: true,
  pbId: 'qvhxj1tg36fl485'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='qvhxj1tg36fl485' && persisted_cycle_tag='2026-03'",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 15 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 1244ms (compile: 33ms, proxy.ts: 191ms, render: 1021ms)
[Stats:PB] resolve account: {
  sourceAccountId: '21h4zw0qnab76ro',
  found: true,
  pbId: '21h4zw0qnab76ro'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 275ms (compile: 41ms, proxy.ts: 204ms, render: 29ms)
[Stats:PB] resolve account: {
  sourceAccountId: '5vuimypvnmzm5wx',
  found: true,
  pbId: '5vuimypvnmzm5wx'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='5vuimypvnmzm5wx' && persisted_cycle_tag='2026-03'",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 4 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 1009ms (compile: 45ms, proxy.ts: 258ms, render: 706ms)
[Stats:PB] resolve account: {
  sourceAccountId: '3xhx6optlr91lez',
  found: true,
  pbId: '3xhx6optlr91lez'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='3xhx6optlr91lez' && persisted_cycle_tag='2026-03'",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 2 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 903ms (compile: 39ms, proxy.ts: 186ms, render: 678ms)
[Stats:PB] resolve account: {
  sourceAccountId: '04ytttr0nifvnif',
  found: true,
  pbId: '04ytttr0nifvnif'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 284ms (compile: 67ms, proxy.ts: 181ms, render: 36ms)
[getPeople] Filter for 4wxl4cpp7u4adbb: (type='debt' || type='expense' || type='repayment' || type='income' || type='transfer' || type='cashback') && status!='void' && (person_id='4wxl4cpp7u4adbb' || (account_id='m9wc74ai0r7nbpj'))
[DB:PB] person-cycle-sheets.get person=4wxl4cpp7u4adbb
[getPeople] Filter for 4wxl4cpp7u4adbb: (type='debt' || type='expense' || type='repayment' || type='income' || type='transfer' || type='cashback') && status!='void' && (person_id='4wxl4cpp7u4adbb' || (account_id='m9wc74ai0r7nbpj'))
[DB:PB] person-cycle-sheets.get person=4wxl4cpp7u4adbb
 GET /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 4.0s (compile: 66ms, proxy.ts: 310ms, render: 3.6s)
 GET /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 4.9s (compile: 112ms, proxy.ts: 175ms, render: 4.6s)
[Stats:PB] resolve account: {
  sourceAccountId: 'm9wc74ai0r7nbpj',
  found: true,
  pbId: 'm9wc74ai0r7nbpj'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 660ms (compile: 51ms, proxy.ts: 545ms, render: 64ms)
[Stats:PB] resolve account: {
  sourceAccountId: '918bn7qgqsrray1',
  found: true,
  pbId: '918bn7qgqsrray1'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 261ms (compile: 33ms, proxy.ts: 203ms, render: 25ms)
[Stats:PB] resolve account: {
  sourceAccountId: 'qvhxj1tg36fl485',
  found: true,
  pbId: 'qvhxj1tg36fl485'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='qvhxj1tg36fl485' && persisted_cycle_tag='2026-03'",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 15 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 936ms (compile: 24ms, proxy.ts: 221ms, render: 691ms)
[Stats:PB] resolve account: {
  sourceAccountId: '21h4zw0qnab76ro',
  found: true,
  pbId: '21h4zw0qnab76ro'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 283ms (compile: 52ms, proxy.ts: 199ms, render: 31ms)
[Stats:PB] resolve account: {
  sourceAccountId: '5vuimypvnmzm5wx',
  found: true,
  pbId: '5vuimypvnmzm5wx'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='5vuimypvnmzm5wx' && persisted_cycle_tag='2026-03'",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 4 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 1184ms (compile: 31ms, proxy.ts: 267ms, render: 886ms)
[Stats:PB] resolve account: {
  sourceAccountId: '3xhx6optlr91lez',
  found: true,
  pbId: '3xhx6optlr91lez'
}
[DB:PB] account spending stats: transaction query attempt {
  attempt: 1,
  filter: "account_id='3xhx6optlr91lez' && persisted_cycle_tag='2026-03'",
  sort: '-date,id'
}
[DB:PB] account spending stats: transaction query succeeded { attempt: 1, count: 2 }
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 934ms (compile: 42ms, proxy.ts: 260ms, render: 633ms)
[Stats:PB] resolve account: {
  sourceAccountId: '04ytttr0nifvnif',
  found: true,
  pbId: '04ytttr0nifvnif'
}
 POST /people/4wxl4cpp7u4adbb?tag=2026-03&year=2026 200 in 289ms (compile: 30ms, proxy.ts: 238ms, render: 21ms)