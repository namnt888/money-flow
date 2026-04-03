'use server';

import { handleBotQuery } from '@/services/bot-query.service';
import { pocketbaseList } from '@/services/pocketbase/server';
import { PB_COLLECTIONS } from '@/lib/pocketbase/collections';
import { revalidatePath } from 'next/cache';

export type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
};

/**
 * Calls Google Gemini API if a key is provided
 */
async function callGeminiAI(message: string, apiKey: string, context: string): Promise<string | null> {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Bạn là trợ lý tài chính thông minh của ứng dụng Money Flow.
                               Dưới đây là một số ngữ cảnh về dữ liệu người dùng (nếu có):
                               ${context}
                               
                               Yêu cầu: 
                               1. Trả lời bằng Tiếng Việt rực rỡ, chuyên nghiệp và ngắn gọn.
                               2. Ưu tiên tư vấn về thẻ tín dụng (cashback), ngân sách và lịch sử giao dịch.
                               3. Nếu không chắc chắn về dữ liệu cụ thể, hãy hướng dẫn người dùng kiểm tra trong ứng dụng.
                               
                               Câu hỏi của người dùng: ${message}`
                    }]
                }]
            })
        });

        if (!response.ok) {
            const err = await response.text();
            console.error('[Gemini API Error]', err);
            return null;
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
        console.error('[Gemini call failed]', error);
        return null;
    }
}

/**
 * Handles a chat message from the Web UI.
 * @param message The message text from the user
 * @param apiKey Optional Google Gemini API Key
 */
export async function sendChatMessageAction(message: string, apiKey?: string): Promise<ChatMessage> {
    console.log(`[Chatbot] Nhận tin nhắn: "${message}" (LLM: ${!!apiKey})`);
    
    try {
        // 1. Get the owner profile ID from PocketBase
        const ownersResponse = await pocketbaseList<any>(PB_COLLECTIONS.PEOPLE, {
            filter: 'is_owner = true',
            perPage: 1
        });

        const owner = ownersResponse.items?.[0];
        if (owner) {
            console.log(`[Chatbot] Found owner: ${owner.name} (ID: ${owner.id})`);
        }

        if (!owner) {
            return {
                role: 'assistant',
                content: 'Tôi không tìm thấy hồ sơ chủ sở hữu nào. Vui lòng kiểm tra cài đặt People của bạn nhé!',
                timestamp: new Date().toISOString()
            };
        }

        // 2. Local processing using existing bot service (keywords/logic)
        const localReplies = await handleBotQuery(message, owner.id);
        
        // 3. If API Key is provided, use LLM for a richer response
        if (apiKey) {
            const context = localReplies ? `Kết quả tìm kiếm cục bộ: ${localReplies.join('. ')}` : 'Không tìm thấy dữ liệu cục bộ phù hợp.';
            const aiContent = await callGeminiAI(message, apiKey, context);
            
            if (aiContent) {
                return {
                    role: 'assistant',
                    content: aiContent,
                    timestamp: new Date().toISOString()
                };
            }
        }

        // 4. Fallback to local replies or generic message
        if (!localReplies || localReplies.length === 0) {
            return {
                role: 'assistant',
                content: "Tôi chưa rõ ý bạn lắm. Bạn có thể hỏi về ngân sách tài khoản, gợi ý thẻ hoặc lịch sử giao dịch gần đây nhé! (Hoặc gắn API Key Gemini để tôi thông thái hơn).",
                timestamp: new Date().toISOString()
            };
        }

        revalidatePath('/chatbot');

        return {
            role: 'assistant',
            content: localReplies.join('\n'),
            timestamp: new Date().toISOString()
        };

    } catch (error) {
        console.error('Chatbot Action Error:', error);
        return {
            role: 'assistant',
            content: 'Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu này. Hãy thử lại sau nhé!',
            timestamp: new Date().toISOString()
        };
    }
}
