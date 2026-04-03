import { parseCashbackConfig, calculateBankCashback, CashbackLevel, CashbackCategoryRule, normalizeRate } from '@/lib/cashback'
import { CashbackPolicyMetadata } from '@/types/cashback.types'

const DEBUG_CASHBACK = process.env.DEBUG_CASHBACK === 'true' || process.env.DEBUG_CASHBACK === '1'

export type CashbackPolicyResult = {
    rate: number
    maxReward?: number
    minSpend?: number
    metadata: CashbackPolicyMetadata
}

/**
 * MF5.3: Single entry point to resolve cashback policy for a transaction.
 */
export function resolveCashbackPolicy(params: {
    account: {
        id?: string;
        cashback_config?: any;
        cb_type?: string;
        cb_base_rate?: number;
        cb_max_budget?: number | null;
        cb_is_unlimited?: boolean;
        cb_rules_json?: any;
        cb_min_spend?: number | null;
    }
    categoryId?: string | null
    amount: number
    cycleTotals: {
        spent: number
    }
    categoryName?: string
    categorySlug?: string
}): CashbackPolicyResult {
    const { account, amount, categoryId, categorySlug, categoryName, cycleTotals } = params

    // --- 1. State Initialization ---
    let finalRate = 0
    let finalMaxReward: number | undefined = undefined
    let source: CashbackPolicyResult['metadata'] = {
        policySource: 'program_default',
        reason: 'Default fallback',
        rate: 0,
        ruleType: 'program_default',
        priority: 0
    }
    let config: any = null

    // --- 2. Determine Branch: Priority 1 (Modern) vs Priority 2 (Legacy/JSON) ---
    const isModern = account.cb_type && account.cb_type !== 'none'

    if (isModern) {
        // --- Branch A: Priority 1 (Modern Column-based Config) ---
        const baseRate = normalizeRate(account.cb_base_rate ?? 0)
        finalRate = baseRate
        source = {
            policySource: 'program_default',
            reason: 'Card base rate',
            rate: finalRate,
            ruleType: 'program_default',
            priority: 0
        }

        if (account.cb_type === 'tiered' && account.cb_rules_json) {
            const rawRules = account.cb_rules_json
            const tiers = Array.isArray(rawRules) ? rawRules : (rawRules.tiers || [])
            const tieredBaseRate = !Array.isArray(rawRules) && rawRules.base_rate !== undefined
                ? normalizeRate(rawRules.base_rate)
                : baseRate

            const sortedTiers = [...tiers].sort((a: any, b: any) => b.min_spend - a.min_spend)
            const qualifiedTiers = sortedTiers.filter((t: any) => cycleTotals.spent >= (t.min_spend ?? 0))

            let matchedPolicy: any = null
            if (categoryId && qualifiedTiers.length > 0) {
                for (const tier of qualifiedTiers) {
                    const policies = Array.isArray(tier.policies) ? tier.policies : (tier.rules || [])
                    let found = policies.find((p: any) => 
                        (p.categoryIds && p.categoryIds.includes(categoryId)) || 
                        (p.cat_ids && p.cat_ids.includes(categoryId)) ||
                        (categorySlug && p.categoryIds && p.categoryIds.includes(categorySlug)) ||
                        (categorySlug && p.cat_ids && p.cat_ids.includes(categorySlug))
                    )

                    if (!found && categoryName) {
                        const lowerName = categoryName.toLowerCase()
                        found = policies.find((p: any) => {
                            const names = (p.categoryNames || []).map((n: string) => n.toLowerCase())
                            return names.some((n: string) => lowerName.includes(n) || n.includes(lowerName))
                        })
                    }

                    if (found) {
                        matchedPolicy = { ...found, tier }
                        break
                    }
                }
            }

            if (matchedPolicy) {
                finalRate = normalizeRate(matchedPolicy.rate ?? 0)
                finalMaxReward = matchedPolicy.max ?? matchedPolicy.maxReward ?? undefined
                source = {
                    policySource: 'category_rule',
                    reason: categoryName ? `${categoryName} rule` : 'Category rule matched',
                    rate: finalRate,
                    levelId: matchedPolicy.tier.id || `tier-${matchedPolicy.tier.min_spend}`,
                    levelName: (matchedPolicy.tier.name && matchedPolicy.tier.name !== "Standard") ? matchedPolicy.tier.name : "Hạng chuẩn",
                    levelMinSpend: matchedPolicy.tier.min_spend,
                    categoryId: categoryId || undefined,
                    ruleId: matchedPolicy.id,
                    ruleMaxReward: finalMaxReward,
                    ruleType: 'category',
                    priority: 20
                }
            } else if (qualifiedTiers.length > 0) {
                const topTier = qualifiedTiers[0]
                finalRate = topTier.base_rate !== undefined && topTier.base_rate !== null ? normalizeRate(topTier.base_rate) : tieredBaseRate
                source = {
                    policySource: 'level_default',
                    reason: topTier.name ? `Level matched: ${topTier.name}` : `Tier matched: ≥${topTier.min_spend}`,
                    rate: finalRate,
                    levelId: topTier.id || `tier-${topTier.min_spend}`,
                    levelName: (topTier.name && topTier.name !== "Standard") ? topTier.name : "Hạng chuẩn",
                    levelMinSpend: topTier.min_spend,
                    ruleType: 'level_default',
                    priority: 10
                }
            } else {
                finalRate = tieredBaseRate
            }
        } else if (account.cb_type === 'simple' && Array.isArray(account.cb_rules_json)) {
            const rules = account.cb_rules_json as any[]
            const matchedBySlug = categorySlug ? rules.find((r: any) => r.categoryIds?.includes(categorySlug) || r.cat_ids?.includes(categorySlug)) : null
            let matchedRule = (categoryId ? rules.find((r: any) => r.categoryIds?.includes(categoryId) || r.cat_ids?.includes(categoryId)) : null) || matchedBySlug

            if (!matchedRule && categoryName) {
                const lowerName = categoryName.toLowerCase()
                matchedRule = rules.find((r: any) => {
                    const names = (r.categoryNames || []).map((n: string) => n.toLowerCase())
                    return names.some((n: string) => lowerName.includes(n) || n.includes(lowerName))
                })
            }

            if (matchedRule) {
                finalRate = normalizeRate(matchedRule.rate ?? 0)
                finalMaxReward = matchedRule.max ?? matchedRule.maxReward ?? undefined
                source = {
                    policySource: 'category_rule',
                    reason: categoryName ? `${categoryName} rule` : 'Category rule matched',
                    rate: finalRate,
                    levelId: matchedRule.id,
                    categoryId: categoryId || undefined,
                    ruleId: matchedRule.id,
                    ruleMaxReward: finalMaxReward,
                    ruleType: 'category',
                    priority: 20
                }
            }
        }
    } else {
        // --- Branch B: Priority 2 (Legacy/JSON Program) ---
        config = parseCashbackConfig(account.cashback_config, account.id || 'unknown')
        if (!config.program) {
            const { rate: legacyRate } = calculateBankCashback(config, amount, categoryName, cycleTotals.spent)
            finalRate = legacyRate
            source = {
                policySource: 'legacy',
                reason: `Legacy rule matched for ${categoryName || 'generic spend'}`,
                rate: finalRate,
                ruleType: 'legacy',
                priority: 0
            }
        } else {
            const { program } = config
            finalRate = program.defaultRate
            source = {
                policySource: 'program_default',
                reason: 'Program default rate',
                rate: finalRate,
                ruleType: 'program_default',
                priority: 0
            }

            const requiresMinSpend = typeof program.minSpendTarget === 'number' && program.minSpendTarget > 0
            const isBelowMin = requiresMinSpend && program.minSpendTarget && cycleTotals.spent < program.minSpendTarget

            if (!isBelowMin) {
                const sortedLevels = program.levels ? [...program.levels].sort((a: any, b: any) => b.minTotalSpend - a.minTotalSpend) : []
                const qualifiedLevels = sortedLevels.filter((lvl: any) => cycleTotals.spent >= lvl.minTotalSpend)

                let matchedRule: any = null
                if (categoryId && qualifiedLevels.length > 0) {
                    for (const lvl of qualifiedLevels) {
                        if (lvl.rules && lvl.rules.length > 0) {
                            const matchingRules = lvl.rules.filter((rule: any) => {
                                const hasIdMatch = rule.categoryIds?.includes(categoryId) || rule.cat_ids?.includes(categoryId)
                                const hasSlugMatch = categorySlug && (rule.categoryIds?.includes(categorySlug) || rule.cat_ids?.includes(categorySlug))
                                if (hasIdMatch || hasSlugMatch) return true
                                if (categoryName) {
                                    const lowerName = categoryName.toLowerCase()
                                    const names = (rule.categoryNames || []).map((n: string) => n.toLowerCase())
                                    return names.some((n: string) => lowerName.includes(n) || n.includes(lowerName))
                                }
                                return false
                            })

                            if (matchingRules.length > 0) {
                                const rulesWithIndex = matchingRules.map((r: any) => ({ ...r, originalIndex: lvl.rules!.indexOf(r) }))
                                rulesWithIndex.sort((a: any, b: any) => (a.categoryIds.length - b.categoryIds.length) || (a.originalIndex - b.originalIndex))
                                matchedRule = { ...rulesWithIndex[0], level: lvl }
                                break 
                            }
                        }
                    }
                }

                const applicableLevel = qualifiedLevels[0]
                if (matchedRule) {
                    finalRate = matchedRule.rate > 0 ? matchedRule.rate : (matchedRule.level.defaultRate ?? program.defaultRate)
                    finalMaxReward = matchedRule.maxReward ?? undefined
                    source = {
                        policySource: 'category_rule',
                        reason: categoryName ? `${categoryName} rule (${matchedRule.level.name})` : `Category rule matched`,
                        rate: finalRate,
                        levelId: matchedRule.level.id,
                        levelName: (matchedRule.level.name && matchedRule.level.name !== "Standard") ? matchedRule.level.name : "Hạng chuẩn",
                        levelMinSpend: matchedRule.level.minTotalSpend,
                        categoryId: categoryId || undefined,
                        ruleId: matchedRule.id,
                        ruleMaxReward: matchedRule.maxReward,
                        ruleType: 'category',
                        priority: 20
                    }
                } else if (applicableLevel) {
                    finalRate = applicableLevel.defaultRate ?? program.defaultRate
                    source = {
                        policySource: 'level_default',
                        reason: `Level matched: ${applicableLevel.name}`,
                        rate: finalRate,
                        levelId: applicableLevel.id,
                        levelName: (applicableLevel.name && applicableLevel.name !== "Standard") ? applicableLevel.name : "Hạng chuẩn",
                        levelMinSpend: applicableLevel.minTotalSpend,
                        ruleType: 'level_default',
                        priority: 10
                    }
                }
            } else {
                source.reason = `Below min spend target (${program.minSpendTarget})`
            }
        }
    }

    // --- 3. Global Exit Gate: Apply safety caps and normalize result ---
    let finalResult: CashbackPolicyResult = {
        rate: finalRate,
        maxReward: finalMaxReward,
        minSpend: isModern ? (account.cb_min_spend ?? undefined) : (config?.minSpend ?? undefined),
        metadata: source
    }

    if (config?.program?.minSpendTarget) {
        finalResult.minSpend = config.program.minSpendTarget
    }

    // Safety: Cap the base/default rate to 2% if applied generally without a rule match
    const isDefaultSource = 
        source.policySource === 'program_default' || 
        source.policySource === 'level_default' || 
        source.policySource === 'legacy' ||
        (source.policySource === 'category_rule' && source.priority === 0)

    if (isDefaultSource) {
        const cappedRate = Math.min(finalResult.rate, 0.02)
        if (cappedRate !== finalResult.rate) {
            finalResult.rate = cappedRate
            finalResult.metadata.rate = cappedRate
            finalResult.metadata.reason = `${finalResult.metadata.reason} (Capped)`
        }
    }

    return finalResult
}
