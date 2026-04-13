import { ChatbotIntent, ChatbotRequest } from './types';

export function routeIntent(req: ChatbotRequest): { intent: ChatbotIntent, confidence: number, reasoning: string } {
  const msg = req.message.toLowerCase();

  // 1. Budget Card Intent
  if (msg.includes('budget') || msg.includes('ngân sách') || msg.includes('còn lại') || msg.includes('hạn mức')) {
    if (msg.includes('thẻ') || msg.includes('của')) {
      return { intent: 'budgetCard', confidence: 0.9, reasoning: 'Found budget/limit keyword with card context' };
    }
  }

  // 2. Best Card by Category Intent
  if (msg.includes('thẻ nào tốt') || msg.includes('thẻ gì lợi') || msg.includes('mua sắm') || msg.includes('online')) {
    return { intent: 'bestCardByCategory', confidence: 0.8, reasoning: 'Found card suggestion keywords' };
  }

  // 3. Best Card by MCC Intent
  if (msg.includes('mcc') || (msg.includes('6300') || msg.includes('bảo hiểm'))) {
    return { intent: 'bestCardByMcc', confidence: 0.9, reasoning: 'Found MCC or industry code keywords' };
  }

  // 4. Card Limit Intent
  if (msg.includes('hạn mức') && (msg.includes('lấy') || msg.includes('của'))) {
      return { intent: 'cardLimit', confidence: 0.7, reasoning: 'Found card limit query' };
  }
  
  // 5. Recent History
  if (msg.includes('giao dịch') || msg.includes('gần đây')) {
    return { intent: 'recentHistory', confidence: 0.8, reasoning: 'Found transaction history keyword' };
  }

  return { intent: 'unknown', confidence: 0.1, reasoning: 'No clear intent identified' };
}