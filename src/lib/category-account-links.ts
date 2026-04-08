const ACCOUNT_LINK_PREFIX = "__acc:";

function normalizeKeyword(keyword: unknown): string | null {
  if (typeof keyword !== "string") return null;
  const trimmed = keyword.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function extractLinkedAccountIdsFromKeywords(
  keywords: unknown,
): string[] {
  if (!Array.isArray(keywords)) return [];

  return keywords
    .map((item) => normalizeKeyword(item))
    .filter((keyword): keyword is string => Boolean(keyword))
    .filter((keyword) => keyword.startsWith(ACCOUNT_LINK_PREFIX))
    .map((keyword) => keyword.slice(ACCOUNT_LINK_PREFIX.length))
    .filter((accountId) => accountId.length > 0);
}

export function stripLinkedAccountKeywords(keywords: unknown): string[] {
  if (!Array.isArray(keywords)) return [];

  return keywords
    .map((item) => normalizeKeyword(item))
    .filter((keyword): keyword is string => Boolean(keyword))
    .filter((keyword) => !keyword.startsWith(ACCOUNT_LINK_PREFIX));
}

export function mergeKeywordsWithLinkedAccounts(
  keywords: unknown,
  linkedAccountIds: unknown,
): string[] {
  const cleanKeywords = stripLinkedAccountKeywords(keywords);
  const links = Array.isArray(linkedAccountIds)
    ? linkedAccountIds
        .map((id) => (typeof id === "string" ? id.trim() : ""))
        .filter((id) => id.length > 0)
        .map((id) => `${ACCOUNT_LINK_PREFIX}${id}`)
    : [];

  return Array.from(new Set([...cleanKeywords, ...links]));
}
