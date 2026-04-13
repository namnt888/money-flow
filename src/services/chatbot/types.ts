export type ChatbotIntent = 
  | 'budgetCard' 
  | 'bestCardByCategory' 
  | 'bestCardByMcc' 
  | 'cardLimit' 
  | 'recentHistory' 
  | 'unknown';

export interface ChatbotRequest {
  message: string;
  profileId?: string;
  channel?: 'web' | 'telegram' | 'api';
  geminiApiKey?: string;
  context?: {
    currentCycle?: string;
    userId?: string;
  };
}

export interface CardBudgetData {
  accountId: string;
  accountName: string;
  earnedSoFar: number;
  maxCashback: number;
  remainingCap: number;
  currentSpend: number;
  minSpend?: number;
  isMinSpendMet?: boolean;
  canSpendMore?: {
    categoryName: string;
    rate: number;
    amount: number;
  }[];
}

export interface ChatbotStandardResponse {
  success: boolean;
  intent: ChatbotIntent;
  confidence: number;
  reasoning: string;
  answer: string;
  data?: {
    cards?: any[];
    sources?: string[];
    totalCount?: number;
  };
  artifacts?: {
    resolvedAccount?: { id: string; name: string; };
    resolvedCategory?: { id: string; name: string; slug: string; };
    resolvedMcc?: { code: string; category: string; };
    foundRule?: boolean;
  };
}