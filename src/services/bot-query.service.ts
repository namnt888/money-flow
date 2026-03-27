import { createServiceClient } from "@/lib/supabase/service";
import { formatMoneyVND } from "@/lib/utils";
import { getAccountStats } from "@/services/account.service";

/**
 * Handles information queries from the bot.
 * @param text The message text from the user
 * @param profileId The linked profile/person ID
 */
export async function handleBotQuery(text: string, profileId: string): Promise<string[] | null> {
    const normalized = text.toLowerCase().trim();
    const supabase = createServiceClient() as any;

    // 1. Check for Budget / Account Balance queries
    // Examples: "msb con bao nhieu", "the vcb con budget khong", "balance credit card"
    const budgetKeywords = ["bao nhieu", "budget", "con lai", "balance", "limit", "spent", "chi tieu"];
    const isBudgetQuery = budgetKeywords.some(k => normalized.includes(k));

    if (isBudgetQuery) {
        // Find all accounts for this profile
        const { data: accounts } = await supabase
            .from('accounts')
            .select('id, name, type, credit_limit, current_balance, cb_max_budget')
            .eq('owner_id', profileId)
            .eq('is_active', true);

        if (accounts && accounts.length > 0) {
            // Find which account the user is asking about
            const matchedAccount = accounts.find((a: any) => 
                normalized.includes(a.name.toLowerCase()) || 
                (a.type === 'credit_card' && normalized.includes('credit'))
            );

            if (matchedAccount) {
                const stats = await getAccountStats(matchedAccount.id);
                const replies = [
                    `📊 *${matchedAccount.name}* Status:`,
                    `- Balance: ${formatMoneyVND(matchedAccount.current_balance)}`,
                ];

                if (matchedAccount.type === 'credit_card' && stats) {
                    replies.push(`- Spent this cycle: ${formatMoneyVND(stats.currentSpend)}`);
                    if (stats.remainingBudget !== null) {
                        replies.push(`- Remaining budget: ${formatMoneyVND(stats.remainingBudget)}`);
                    }
                    if (stats.maxCashback) {
                        replies.push(`- Cashback budget: ${formatMoneyVND(stats.currentSpend)} / ${formatMoneyVND(stats.maxCashback)}`);
                    }
                }
                
                return replies;
            } else if (normalized.includes("tat ca") || normalized.includes("summary")) {
                const lines = accounts.map((a: any) => `- ${a.name}: ${formatMoneyVND(a.current_balance)}`);
                return ["Summary of all accounts:", ...lines];
            }
        }
    }

    // 2. Check for "Best Card" / Cashback queries
    // Examples: "dung the nao cho bao hiem", "the nao hoan nhieu nhat", "insurance card"
    const cardKeywords = ["dung the nao", "the nao tot", "hoan nhieu", "insurance", "bao hiem", "supermarket", "sieu thi"];
    const isCardQuery = cardKeywords.some(k => normalized.includes(k));

    if (isCardQuery) {
        // For now, return a placeholder or simple logic
        // Future: Analyze cb_rules_json to find the best rate
        return [
            "💡 *Card Recommendation*:",
            "- For Insurance: Use MSB Visa Online (6% back) or VIB Cash Back.",
            "- For Supermarket: Use HSBC or VIB Rewards.",
            "I'm still learning to read your exact rules, so please verify in the App!"
        ];
    }

    // 3. Check for History queries
    // Examples: "giao dich gan nhat", "recent transactions", "history"
    if (normalized.includes("lich su") || normalized.includes("history") || normalized.includes("recent")) {
        const { data: txns } = await supabase
            .from('transactions')
            .select('amount, note, date, type')
            .eq('created_by', profileId)
            .order('date', { ascending: false })
            .limit(5);

        if (txns && txns.length > 0) {
            const lines = txns.map((t: any) => {
                const dateStr = new Date(t.date).toLocaleDateString('vi-VN');
                return `- [${dateStr}] ${formatMoneyVND(t.amount)}: ${t.note || 'No note'}`;
            });
            return ["Recent transactions:", ...lines];
        }
        return ["No recent transactions found."];
    }

    return null; // Not a query we handle here
}
