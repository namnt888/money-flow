import type { Account } from '@/types/moneyflow.types'

function resolveFamilyRootAccount(account: Account, allAccounts?: Account[]): Account | null {
  if (!allAccounts || account.type !== 'credit_card') {
    return account.type === 'credit_card' ? account : null
  }

  const parentId = account.parent_account_id || account.relationships?.parent_info?.id || null
  if (!parentId) {
    return account
  }

  return allAccounts.find((item) => item.id === parentId || item.relationships?.parent_info?.id === parentId) ?? account
}

export function getEffectiveCreditLimit(account: Account, allAccounts?: Account[]): number {
  if (account.type !== 'credit_card') {
    return account.credit_limit || 0
  }

  const familyRoot = resolveFamilyRootAccount(account, allAccounts)
  return familyRoot?.credit_limit || account.credit_limit || 0
}

export function getUniqueFamilyCreditLimitTotal(
  accounts: Account[],
  allAccounts?: Account[],
  predicate: (account: Account) => boolean = () => true,
): number {
  const seenFamilyKeys = new Set<string>()

  return accounts.reduce((sum, account) => {
    if (!predicate(account) || account.type !== 'credit_card') {
      return sum
    }

    const familyRoot = resolveFamilyRootAccount(account, allAccounts)
    const familyKey = familyRoot?.id || account.id
    if (seenFamilyKeys.has(familyKey)) {
      return sum
    }

    seenFamilyKeys.add(familyKey)
    return sum + (familyRoot?.credit_limit || account.credit_limit || 0)
  }, 0)
}