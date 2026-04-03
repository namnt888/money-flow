import { pocketbaseList } from "./pocketbase/server";
import { PB_COLLECTIONS } from "@/lib/pocketbase/collections";
import { formatMoneyVND, normalizeText } from "@/lib/utils";
import { getAccountStats } from "@/services/account.service";
import { resolveCashbackPolicy } from "@/services/cashback/policy-resolver";

/**
 * Handles information queries from the bot.
 * @param text The message text from the user
 * @param profileId The linked profile/person ID
 */
export async function handleBotQuery(text: string, profileId: string): Promise<string[] | null> {
    const normalized = normalizeText(text);

    // 0. Check for Help / Introduction
    if (normalized === "help" || normalized === "tro giup" || normalized === "?" || normalized === "bot") {
        return [
            "🤖 *Money Flow Assistant v2.0*",
            "Tôi có thể giúp bạn:",
            "👉 *Ngân sách*: 'msb còn bao nhiêu', 'vcb còn budget không', 'tổng cộng'",
            "👉 *Tư vấn thẻ*: 'dùng thẻ nào cho bảo hiểm', 'siêu thị dùng thẻ gì'",
            "👉 *Lịch sử*: 'giao dịch gần đây', 'mới chi gì'",
            "👉 *Hoàn tiền*: 'vpbank lady tháng này bao nhiêu cashback'",
            "",
            "Hãy thử hỏi: 'Dùng thẻ nào cho siêu thị?'"
        ];
    }

    // 1. Check for Budget / Account Balance / Cashback Status queries
    const budgetKeywords = ["bao nhieu", "budget", "con lai", "balance", "limit", "spent", "chi tieu", "con bao", "het chua", "hoan tien", "cashback", "uu dai"];
    const isBudgetQuery = budgetKeywords.some(k => normalized.includes(k));

    if (isBudgetQuery) {
        // Fetch accounts from PocketBase - Filter out duplicates and test accounts
        const accResponse = await pocketbaseList<any>(PB_COLLECTIONS.ACCOUNTS, {
            filter: `is_active = true && name !~ 'DUPLICATE' && name !~ 'DO NOT USE' && name !~ 'TEST'`,
            perPage: 100
        });
        const accounts = accResponse.items;

        if (accounts && accounts.length > 0) {
            // Find by name fragment (e.g. "lady", "vpbank", "msb", "vcb", "amex")
            const matchedAccount = accounts.find((a: any) => {
                const name = a.name.toLowerCase();
                const searchWords = normalized.split(/\s+/);
                return searchWords.some(word => word.length > 2 && name.includes(word)) || name.includes(normalized);
            });

            if (matchedAccount) {
                const stats = await getAccountStats(matchedAccount.id);
                
                const replies = [
                    `📊 *Hồ sơ: ${matchedAccount.name}*`,
                    `- Số dư hiện tại: *${formatMoneyVND(matchedAccount.current_balance)}*`,
                ];

                if (matchedAccount.type === 'credit_card' && stats) {
                    replies.push(`- Đã chi tiêu kỳ này: ${formatMoneyVND(stats.spent_this_cycle)}`);
                    
                    if (stats.max_budget) {
                        const earned = stats.real_awarded || 0;
                        const percent = ((earned / stats.max_budget) * 100).toFixed(0);
                        replies.push(`- Cashback: *${formatMoneyVND(earned)} / ${formatMoneyVND(stats.max_budget)}* (${percent}%)`);
                        
                        if (stats.min_spend && !stats.is_qualified) {
                            const needed = stats.min_spend - stats.spent_this_cycle;
                            replies.push(`- ⚠️ Cần chi thêm *${formatMoneyVND(needed)}* để được hoàn tiền.`);
                        }

                        if (stats.remains_cap !== null && stats.remains_cap !== undefined) {
                            replies.push(`- Hạn mức hoàn tiền còn lại: *${formatMoneyVND(stats.remains_cap)}*`);
                        }
                    }
                    
                    if (stats.cycle_range) {
                        replies.push(`- Kỳ sao kê: ${stats.cycle_range}`);
                    }
                }
                
                return replies;
            } else if (normalized.includes("tat ca") || normalized.includes("summary") || normalized.includes("tong hop") || normalized.includes("tổng cộng")) {
                const lines = accounts.slice(0, 10).map((a: any) => `- ${a.name}: ${formatMoneyVND(a.current_balance)}`);
                return ["💰 Tóm tắt số dư các tài khoản:", ...lines, accounts.length > 10 ? `... và ${accounts.length - 10} tài khoản khác.` : ""];
            }
        }
    }

    // 2. Check for "Best Card" / Recommendation queries
    const cardKeywords = ["dung the nao", "the nao tot", "hoan nhieu", "the gi", "nen dung", "loi nhat", "tu van"];
    const isCardQuery = cardKeywords.some(k => normalized.includes(k)) || 
                       ["insurance", "bao hiem", "supermarket", "sieu thi", "food", "an uong", "online", "shopping", "health", "y te", "giao duc", "hoc phi"].some(k => normalized.includes(k));

    if (isCardQuery) {
        // Fetch categories from PocketBase
        const catResponse = await pocketbaseList<any>(PB_COLLECTIONS.CATEGORIES, {
            filter: 'is_archived = false',
            perPage: 200
        });
        const allCategories = catResponse.items;

        if (allCategories) {
            // Find by keywords first (more specific)
            let category = allCategories.find((c: any) => {
                const keywords = Array.isArray(c.keywords) ? c.keywords : (c.keywords?.split(',') || []);
                return keywords.some((k: string) => normalized.includes(normalizeText(k.trim())));
            });

            // Fallback to name match
            if (!category) {
                category = allCategories.find((c: any) => 
                    normalizeText(c.name).includes(normalized) || 
                    normalized.includes(normalizeText(c.name))
                );
            }

            if (category) {
                const creditAccResponse = await pocketbaseList<any>(PB_COLLECTIONS.ACCOUNTS, {
                    filter: `type = 'credit_card' && is_active = true && name !~ 'DUPLICATE' && name !~ 'DO NOT USE' && name !~ 'TEST'`,
                    perPage: 100
                });
                const allAccounts = creditAccResponse.items;

                if (allAccounts && allAccounts.length > 0) {
                    const targetAmount = 1000000; // Sample 1M spend
                    const results = await Promise.all(allAccounts.map(async (acc: any) => {
                        const stats = await getAccountStats(acc.id);
                        const policy = resolveCashbackPolicy({
                            account: acc,
                            categoryId: category.id,
                            categorySlug: (category as any).slug || category.id,
                            categoryName: category.name,
                            amount: targetAmount,
                            cycleTotals: { spent: stats?.spent_this_cycle || 0 }
                        });
                        
                        // Sanity Check: ignore rates > 50%
                        const rate = policy.rate > 0.5 ? 0 : policy.rate;

                        return { 
                            name: acc.name, 
                            rate: rate, 
                            reason: policy.metadata?.reason || 'Tiêu chuẩn',
                            budgetLeft: stats?.remains_cap,
                            earned: targetAmount * rate
                        };
                    }));

                    const cardRates = results.filter(r => r.rate > 0);
                    cardRates.sort((a: any, b: any) => b.rate - a.rate);

                    // Debug Logging for Top 3
                    console.log(`[Bot Decision] Category: ${category.name}, Candidates:`, cardRates.slice(0, 3));
                    
                    if (cardRates.length === 0) {
                        return [`Không tìm thấy thẻ nào có ưu đãi cho ${category.name} hiện tại.`];
                    }

                    const topCard = cardRates[0];
                    const replies = [
                        `💡 *Thẻ tốt nhất cho ${category.name}* (giả định 1tr):`,
                        `Nên dùng: *${topCard.name}*`
                    ];

                    replies.push(`- Hoàn tiền dự kiến: +${formatMoneyVND(topCard.earned)} (${(topCard.rate * 100).toFixed(1)}%)`);

                    if (topCard.budgetLeft !== null && topCard.budgetLeft !== undefined) {
                      replies.push(`- Hạn mức hoàn tiền còn lại: ${formatMoneyVND(topCard.budgetLeft)}`);
                    }

                    if (cardRates.length > 1) {
                        const others = cardRates.slice(1, 3).map(r => `*${r.name}* (${(r.rate * 100).toFixed(1)}%)`);
                        replies.push(`Lựa chọn khác: ${others.join(', ')}`);
                    }

                    return replies;
                }
            }
        }
    }

    // 3. Check for History queries
    const historyKeywords = ["lich su", "history", "recent", "gan nhat", "giao dich", "chi tieu gan day", "chi gi roi", "vua chi", "moi nhat", "thanh toan"];
    if (historyKeywords.some(k => normalized.includes(k))) {
        const txnResponse = await pocketbaseList<any>(PB_COLLECTIONS.TRANSACTIONS, {
            filter: `person_id = '${profileId}' && is_archived = false`,
            sort: '-occurred_at',
            perPage: 5
        });
        const txns = txnResponse.items;

        if (txns && txns.length > 0) {
            const lines = txns.map((t: any) => {
                const dateStr = new Date(t.occurred_at).toLocaleDateString('vi-VN');
                const sign = t.type === 'income' ? '+' : '-';
                return `- [${dateStr}] ${sign}${formatMoneyVND(Math.abs(t.amount))}: ${t.note || 'Không ghi chú'}`;
            });
            return ["📋 Giao dịch gần đây nhất:", ...lines];
        }
        return ["Không tìm thấy giao dịch nào gần đây."];
    }

    return null; // Not a query we handle here
}
