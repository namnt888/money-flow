 POST /batch/mbb?month=2026-04&period=before&phase=de8sda7q14pk4mk 200 in 4.8s (compile: 63ms, proxy.ts: 564ms, render: 4.2s)
[DB:PB] Request FAILED [400] /api/collections/pvl_txn_001/records: {"data":{},"message":"Something went wrong while processing your request.","status":400}

[DB:PB] Request FAILED [400] /api/collections/batch_items/records: {"data":{},"message":"Something went wrong while processing your request.","status":400}

Confirm toggle failed: Error: PocketBase request failed [400] /api/collections/batch_items/records: {"data":{},"message":"Something went wrong while processing your request.","status":400}

    at pocketbaseRequest (src/services/pocketbase/server.ts:146:13)
    at async revertBatchItem (src/services/batch.service.ts:573:34)
    at async toggleBatchItemConfirmAction (src/actions/batch-speed.actions.ts:587:17)
  144 |         console.error(`[DB:PB] Request FAILED [${response.status}] ${path}:`, text)
  145 |       }
> 146 |       throw new Error(`PocketBase request failed [${response.status}] ${path}: ${text}`)
      |             ^
  147 |     }
  148 |
  149 |     if (response.status === 204) {
 POST /batch/mbb?month=2026-04&period=before&phase=de8sda7q14pk4mk 200 in 3.9s (compile: 43ms, proxy.ts: 1545ms, render: 2.3s)
[BatchAction] Fetching checklist data for MBB / 2026-04
[loadPocketBaseTransactions] Fetched from PB: {
  count: 453,
  accountId: undefined,
  filters: '',
  directMatchCount: 453,
  sample: [
    {
      id: '1mafmym3od0pl5b',
      account_id: '21h4zw0qnab76ro',
      to_account_id: 'a8x0bfww00lncfk',
      type: 'transfer',
      date: '2026-04-10 04:30:45.685Z',
      metadata_status: null
    },
    {
      id: '0f3qaia64724orh',
      account_id: '21h4zw0qnab76ro',
      to_account_id: '9ijhf79b2w0ptek',
      type: 'transfer',
      date: '2026-04-08 15:35:08.147Z',
      metadata_status: null
    },
    {
      id: 'inj92lxwqke5axm',
      account_id: '21h4zw0qnab76ro',
      to_account_id: '9ijhf79b2w0ptek',
      type: 'transfer',
      date: '2026-04-08 14:09:11.547Z',
      metadata_status: null
    },
    {
      id: '6qnypqd946pg2gx',
      account_id: '21h4zw0qnab76ro',
      to_account_id: '9ijhf79b2w0ptek',
      type: 'transfer',
      date: '2026-04-08 14:08:50.167Z',
      metadata_status: null
    },
    {
      id: 'xi32oqidcyfbz09',
      account_id: '21h4zw0qnab76ro',
      to_account_id: 'qvhxj1tg36fl485',
      type: 'transfer',
      date: '2026-04-08 13:51:21.744Z',
      metadata_status: null
    }
  ]
}
[loadPocketBaseTransactions] Fetched from PB: {
  count: 453,
  accountId: undefined,
  filters: '',
  directMatchCount: 453,
  sample: [
    {
      id: '1mafmym3od0pl5b',
      account_id: '21h4zw0qnab76ro',
      to_account_id: 'a8x0bfww00lncfk',
      type: 'transfer',
      date: '2026-04-10 04:30:45.685Z',
      metadata_status: null
    },
    {
      id: '0f3qaia64724orh',
      account_id: '21h4zw0qnab76ro',
      to_account_id: '9ijhf79b2w0ptek',
      type: 'transfer',
      date: '2026-04-08 15:35:08.147Z',
      metadata_status: null
    },
    {
      id: 'inj92lxwqke5axm',
      account_id: '21h4zw0qnab76ro',
      to_account_id: '9ijhf79b2w0ptek',
      type: 'transfer',
      date: '2026-04-08 14:09:11.547Z',
      metadata_status: null
    },
    {
      id: '6qnypqd946pg2gx',
      account_id: '21h4zw0qnab76ro',
      to_account_id: '9ijhf79b2w0ptek',
      type: 'transfer',
      date: '2026-04-08 14:08:50.167Z',
      metadata_status: null
    },
    {
      id: 'xi32oqidcyfbz09',
      account_id: '21h4zw0qnab76ro',
      to_account_id: 'qvhxj1tg36fl485',
      type: 'transfer',
      date: '2026-04-08 13:51:21.744Z',
      metadata_status: null
    }
  ]
}
 POST /batch/mbb?month=2026-04&period=before&phase=de8sda7q14pk4mk 200 in 5.0s (compile: 17ms, proxy.ts: 749ms, render: 4.2s)
 GET /api/batch/pending-items?accountId=npdueo399lci3fz&t=1775954730200 200 in 560ms (compile: 9ms, render: 551ms)
