# Chatbot Refactor Week 1 - Detailed Plan

**Branch**: `feat/chatbot-refactor-0407`  
**Goal**: Build deterministic chatbot v2 API with intent routing, entity resolver, and 4 core intents.

---

## Overview

**Current State**:
- Bot query logic in `src/services/bot-query.service.ts` uses keyword matching (threshold: word length > 2)
- No explicit intent routing; all logic branched in single `handleBotQuery()` function
- No API schema; embedded in server action `sendChatMessageAction()`
- Response is plain text (markdown), no structured data

**Target State (Week 1)**:
- New API route: `POST /api/chatbot/v1/query` with structured request/response
- Intent router that classifies user input into intent types
- Entity resolver for account alias, category keyword match, MCC lookup
- Response formatter that always includes metadata (intent, reasoning, confidence, data_points)
- 4 core intents fully implemented with deterministic path (LLM is optional paraphrase layer, not decision-maker)

---

## Architecture

```
src/services/chatbot/
├── intents/
│   ├── budgetCard.intent.ts       # "budget back thẻ HD bao nhiêu"
│   ├── bestCardByCategory.intent.ts # "mua sắm online dùng thẻ gì"
│   ├── bestCardByMcc.intent.ts      # "MCC 6300 dùng thẻ gì"
│   ├── cardLimit.intent.ts          # "thẻ HD còn limit bao nhiêu"
│   └── types.ts                      # Intent type defs
├── resolvers/
│   ├── accountResolver.ts           # Match account by alias (HD, HDBank, Lady, etc.)
│   ├── categoryResolver.ts          # Match category by keyword (tiếng Việt)
│   ├── mccResolver.ts               # MCC -> category mapping (seed data)
│   └── types.ts                      # Resolver types
├── formatters/
│   ├── responseFormatter.ts         # StandardResponse shape
│   └── accountCardFormatter.ts      # Account-specific card JSON shape
└── types.ts                          # Shared types

src/app/api/chatbot/v1/
├── query.ts                          # POST /api/chatbot/v1/query
├── feedback.ts                       # POST /api/chatbot/v1/feedback
└── health.ts                         # GET /api/chatbot/v1/health

src/lib/chatbot/
├── seed-data/
│   ├── accountAliases.ts            # { "HD": "3x...", "HDBank": "3x..." }
│   └── mccMapping.ts                # { 6300: "insurance", 4121: "taxi", ... }
└── validators.ts                     # Input validation schemas
```

---

## Type Definitions

### Request Schema

```typescript
// QueryRequest
{
  message: string;
  profileId?: string;          // optional, falls back to owner
  channel?: 'web' | 'telegram' | 'api';  // default 'web'
  geminiApiKey?: string;       // optional LLM paraphrase key
  context?: {
    currentCycle?: string;     // "2026-04", defaults to current
    userId?: string;           // for tracking
  };
}
```

### Response Schema

```typescript
// StandardResponse
{
  success: boolean;
  intent: 'budgetCard' | 'bestCardByCategory' | 'bestCardByMcc' | 'cardLimit' | 'recentHistory' | 'unknown';
  confidence: number;             // 0-1
  reasoning: string;              // "Matched account by alias 'HD' → budget query"
  answer: string;                 // Human-readable answer (plain text or markdown)
  
  // Structured data (optional)
  data?: {
    cards?: CardBudgetData[] | CardSuggestionData[];
    sources?: string[];            // account IDs, category IDs used
    totalCount?: number;           // for summary queries
  };
  
  // Debugging
  artifacts?: {
    resolvedAccount?: { id: string; name: string; };
    resolvedCategory?: { id: string; name: string; slug: string; };
    resolvedMcc?: { code: string; category: string; };
    foundRule?: boolean;
    ruleDetails?: any;
  };
  
  // Feedback
  needsFeedback?: boolean;        // True if confidence < 0.7
  feedbackUrl?: string;           // For thumbs-up/down widget
}
```

### Intent-Specific Data Shapes

```typescript
// cardBudgetData
{
  accountId: string;
  accountName: string;
  budgetCapRemains: number;
  budgetCappingSpent: number;
  budgetCappingTotal: number;
  spendRemaining: number;
  actualRemainCap: number;        // Remaining hard cap in VND
  maxSpendAddByRemainCap: number; // How much more can spend = remains_cap / effective_rate
  currentCycleTag: string;
  cycleRange: string;             // "27.03 - 26.04"
  categories?: Array<{
    categoryName: string;
    categoryId: string;
    rate: number;
    maxByCategory: number | null;
    explanation: string;           // "5% max 500k (category rule)"
  }>;
}

// cardSuggestionData
{
  rank: number;
  accountId: string;
  accountName: string;
  category: string;
  categoryId: string;
  rate: number;
  maxReward: number | null;
  confidence: string;             // "high" | "medium" | "low"
  reason: string;                 // "Category rule matched" | "Level default" | "Program default"
  budgetRemaining: number | null; // If spare capacity
}
```

---

## Intent Implementation Checklist

### 1. Budget Card Intent
**Triggers**: Keywords like "budget", "còn bao nhiêu", "bao nhiêu tiền", "limit"
**Example**: "Budget back tháng này thẻ HD là bao nhiêu?"

**Algorithm**:
1. Parse message → extract account name fragment
2. Resolve account via `accountResolver.match(fragment)`
3. If no account: return `confidence: 0` + suggest list all accounts
4. Fetch account stats via `getAccountStats(accountId)` 
5. Get cashback config + policy for each category
6. Calculate:
   - `budgetCapRemains = stats.max_budget - stats.real_awarded`
   - `spendRemaining = stats.min_spend - stats.spent_this_cycle` (can be negative if qualified)
   - `maxSpendAddByRemainCap = floor(budgetCapRemains / effective_rate)`
7. Format response with `CardBudgetData[]`

**Test Cases**:
- ✓ "HD bao nhiêu" → match "HD" → return HD budget card
- ✓ "VPBank Lady còn budget không" → match "Lady" → return VPB Lady budget
- ✓ Invalid card → "Không tìm thấy thẻ..."

---

### 2. Best Card By Category Intent
**Triggers**: Keywords like "dùng thẻ nào", "thẻ nào tốt", "nên dùng thẻ"
**Example**: "Mua sắm Online dùng thẻ gì lợi?"

**Algorithm**:
1. Parse message → extract category name (Vietnamese)
2. Resolve category via `categoryResolver.match(text)` using keywords
3. If no category: return `confidence: 0` + suggest categories
4. Iterate all active credit cards:
   - Call `resolveCashbackPolicy()` with categoryId
   - Get stats for each card
   - Calculate earned reward at 1M spend threshold
5. Sort by rate (descending) → return top 3 cards
6. Include budget remaining if available

**Test Cases**:
- ✓ "Online Shopping" → match category → top card with rate
- ✓ "Bảo hiểm" → match category → insurance top card
- ✓ Invalid category → suggest valid categories

---

### 3. Best Card By MCC Intent
**Triggers**: Keywords like "MCC", "6300"
**Example**: "MCC 6300 dùng thẻ gì?"

**Algorithm**:
1. Parse message → extract MCC code
2. Resolve MCC via `mccResolver.lookup(mccCode)` → category slug
3. Use same logic as intent #2 (bestCardByCategory)
4. Return top cards by category

**Seed Data** (minimal version):
```typescript
{
  6300: 'insurance',   // Insurance services
  4121: 'taxi',        // Taxi/Limousine
  4722: 'travel',      // Travel agencies
  ...
}
```

**Test Cases**:
- ✓ "MCC 6300" → map to "insurance" → suggest insurance cards
- ✓ Unknown MCC → "MCC không được hỗ trợ"

---

### 4. Card Limit Intent
**Triggers**: Keywords like "hạn mức", "limit", "còn lại"
**Example**: "Thẻ HD còn hạn mức bao nhiêu?"

**Algorithm**:
1. Parse message → extract account name
2. Resolve account
3. Fetch account row → `credit_limit`, `current_balance`
4. Calculate: `available = credit_limit - current_balance`
5. Return formatted response

**Test Cases**:
- ✓ "HD hạn mức" → return HD's available limit
- ✓ Invalid card → suggest list

---

## Resolver Implementations

### Account Resolver
```typescript
// src/services/chatbot/resolvers/accountResolver.ts

const ALIAS_MAP = {
  'hd': 'hdbank',
  'hdbank': 'hdbank',
  'lady': 'viet_nam_bank_lady',
  'vpb': 'viet_nam_bank',
  'msb': 'maritime_bank',
  ...
};

export async function resolveAccount(text: string, accounts: Account[]): Promise<Account | null> {
  const normalized = normalizeText(text);
  const tokens = normalized.split(/\s+/);
  
  for (const token of tokens) {
    if (token.length < 2) continue;
    
    // Try exact alias first
    const aliasKey = ALIAS_MAP[token];
    if (aliasKey) {
      return accounts.find(a => a.name.toLowerCase().includes(aliasKey));
    }
    
    // Try fuzzy substring
    const match = accounts.find(a => 
      a.name.toLowerCase().includes(token) ||
      normalizeText(a.name).includes(token)
    );
    if (match) return match;
  }
  
  return null;
}
```

### Category Resolver (Keyword-Based)
- Iterate through categories, check `keywords` array
- Keywords stored as comma-separated tags in DB
- Example: Insurance category has keywords: "bảo hiểm,insurance,bảo vệ"
- Match Vietnamese keywords first, then English

### MCC Resolver
```typescript
// src/lib/chatbot/seed-data/mccMapping.ts
export const MCC_MAPPING: Record<string, string> = {
  '6300': 'insurance',
  '4121': 'taxi',
  ...
};
```

---

## API Endpoint Design

### POST /api/chatbot/v1/query

```typescript
export async function POST(request: Request) {
  const req = await request.json() as QueryRequest;
  
  // 1. Validate
  // 2. Resolve profile
  // 3. Call intent router
  // 4. Format response
  // 5. Optional: Call Gemini to paraphrase `answer` if apiKey provided
  
  return Response.json(response);
}
```

**Error Handling**:
- Invalid message: return `{ success: false, error: "Message too short" }`
- DB error: return `{ success: false, error: "Service error" }`
- All errors go to feedback log for analysis

---

## Testing Strategy

### Unit Tests (Vitest)

1. **Resolver Tests**:
   - Account alias matching (HD → HDBankCard)
   - Category keyword matching (Bảo hiểm → Insurance)
   - MCC lookup (6300 → Insurance)

2. **Intent Tests**:
   - Budget card calculation (correct cashback cap)
   - Card suggestion ranking (highest rate first)
   - Error cases (invalid input)

3. **Response Formatter Tests**:
   - Correct shape of StandardResponse
   - Reasoning string clarity

### E2E Test Cases (Manual + CI)

```
✓ "HD bao nhiêu" → returns correct cashback budget
✓ "Online Shopping dùng thẻ gì" → suggests top card by rate
✓ "MCC 6300" → suggests insurance cards
✓ "Thẻ MSB limit" → returns available limit
✓ "Tôi không hiểu" → confidence < 0.5, confidence intent "unknown"
```

---

## Definition of Done

- [ ] Type schema finalized + documented
- [ ] Intent router logic complete
- [ ] Account, category, MCC resolvers tested
- [ ] All 4 intents implemented
- [ ] Response formatter produces valid schema
- [ ] API endpoint `/api/chatbot/v1/query` live
- [ ] 10/10 test cases passing
- [ ] No `any` types in code
- [ ] Comments on complex logic
- [ ] No regression on existing `handleBotQuery()` (still used by webhook)

---

## Rollout Strategy

**Phase 1 (This week)**:
- Build API + intents in parallel
- Keep existing `handleBotQuery()` intact (backward compat)
- New API can be tested in isolation

**Phase 2 (Next week)**:
- Migrate web UI to new API
- Add feedback logging
- Monitor intent accuracy

**Phase 3 (Optional)**:
- Add LLM layer (Gemini) for answer paraphrasing
- Build feedback loop to improve resolver confidence

---

## Risks & Mitigation

| Risk | Mitigation |
|------|-----------|
| Category alias needs maintenance | Seed from existing category keywords in DB |
| MCC lookup incomplete | Start with minimal set (6300, 4121, 4722), expand later |
| Account resolver fuzzy matching false positives | Set minimum confidence threshold, log mismatches |
| Cashback policy calculation bugs | Reuse `resolveCashbackPolicy()` + test with real account data |

---

## Files to Create/Modify

**Create**:
- `src/services/chatbot/intents/*.ts`
- `src/services/chatbot/resolvers/*.ts`
- `src/services/chatbot/formatters/*.ts`
- `src/app/api/chatbot/v1/query.ts`
- `src/lib/chatbot/seed-data/mccMapping.ts`
- `src/lib/chatbot/validators.ts`
- `src/services/chatbot/__tests__/*.test.ts`

**Modify**:
- `src/actions/chatbot-actions.ts` (point to new API)
- `src/app/chatbot/page.tsx` (update UI to consume structured response)

---

## Notes

- Focus on deterministic path first; LLM is optional paraphrase layer
- Reuse existing services: `getAccountStats()`, `resolveCashbackPolicy()`, `pocketbaseList()`
- No breaking changes to webhook/Telegram bot (keep `handleBotQuery()` as fallback)
- Ready to integrate with calendar feature API if both are built in parallel

---

**Estimated Timeline**: 3-5 days (1 dev)  
**Complexity**: Medium (well-defined requirements, reuses existing helpers, good test coverage possible)
