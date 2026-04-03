export const PB_COLLECTIONS = {
  ACCOUNTS: 'accounts',
  CATEGORIES: 'categories',
  PEOPLE: 'people',
  SHOPS: 'shops',
  TRANSACTIONS: 'transactions',
  CASHBACK_CYCLES: 'cashback_cycles',
  DEBTS: 'debts',
  INSTALLMENTS: 'installments',
  RECURRING: 'recurring',
} as const;

export type PBCollectionName = typeof PB_COLLECTIONS[keyof typeof PB_COLLECTIONS];
