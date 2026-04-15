import { TransactionWithDetails } from "@/types/moneyflow.types";

/**
 * Calculates investment statistics for a specific account.
 * Uses a simplified Average Cost Basis for Profit/Loss calculations.
 */
export async function getInvestmentStats(
    transactions: TransactionWithDetails[],
    accountId: string,
    marketPrice?: number
) {
    let realizedPL = 0
    let currentQuantity = 0
    let cumulativeBuyAmount = 0
    let cumulativeBuyQuantity = 0
    let totalInvested = 0
    let totalSold = 0

    // Filter valid transactions and sort by date for accurate calculation
    const sortedTxns = [...transactions]
        .filter(t => t.status !== 'void')
        .sort((a, b) => new Date(a.occurred_at || a.date || 0).getTime() - new Date(b.occurred_at || b.date || 0).getTime())

    sortedTxns.forEach(t => {
        const isBuy = t.target_account_id === accountId
        const isSell = t.account_id === accountId
        const amount = Math.abs(t.final_price || t.amount || 0)
        const metadata = (t.metadata as any) || {}
        const quantity = Number(metadata.quantity || 0)

        if (isBuy && quantity > 0) {
            cumulativeBuyAmount += amount
            cumulativeBuyQuantity += quantity
            currentQuantity += quantity
            totalInvested += amount
        } else if (isSell && quantity > 0) {
            // Realized P/L: (Selling Price - Average Cost) * Sold Quantity
            const avgBuyPrice = cumulativeBuyQuantity > 0 ? (cumulativeBuyAmount / cumulativeBuyQuantity) : 0
            const sellPricePerUnit = amount / quantity
            realizedPL += (sellPricePerUnit - avgBuyPrice) * quantity
            
            totalSold += amount
            currentQuantity -= quantity
            
            // Note: In a true average cost system, cumulativeBuyAmount/cumulativeBuyQuantity 
            // should probably be adjusted after a sale, but for simplicity we'll keep 
            // the running totals of all-time buys to find the all-time average price.
        }
    })

    const avgBuyPrice = cumulativeBuyQuantity > 0 ? (cumulativeBuyAmount / cumulativeBuyQuantity) : 0
    const currentCostBasis = currentQuantity * avgBuyPrice
    
    // Unrealized PL = (Current Price - Average Buy Price) * Units Held
    const unrealizedPL = (marketPrice !== undefined && currentQuantity > 0) 
        ? (marketPrice - avgBuyPrice) * currentQuantity 
        : 0

    const currentHoldingsValue = (marketPrice !== undefined) 
        ? currentQuantity * marketPrice 
        : currentCostBasis

    return {
        currentQuantity,
        avgBuyPrice,
        totalInvested,
        totalSold,
        realizedPL,
        unrealizedPL,
        totalPL: realizedPL + unrealizedPL,
        currentMarketValue: currentHoldingsValue,
        marketPrice,
        transactionCount: sortedTxns.length
    }
}
