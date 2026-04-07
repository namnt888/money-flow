import { describe, expect, it } from 'vitest'
import { computeCreditAvailableBalance, resolveCreditLimit } from '../credit-balance'

describe('credit-balance', () => {
  it('uses parent limit for family cards', () => {
    const limit = resolveCreditLimit({ ownLimit: 20000000, parentLimit: 30000000 })
    expect(limit).toBe(30000000)
  })

  it('uses own limit for standalone cards', () => {
    const limit = resolveCreditLimit({ ownLimit: 30000000, parentLimit: null })
    expect(limit).toBe(30000000)
  })

  it('computes standalone available balance as limit minus debt', () => {
    const available = computeCreditAvailableBalance({
      ownLimit: 30000000,
      parentLimit: null,
      debt: 10465443,
    })

    expect(available).toBe(19534557)
  })

  it('supports debt input as negative value safely', () => {
    const available = computeCreditAvailableBalance({
      ownLimit: 30000000,
      parentLimit: null,
      debt: -10465443,
    })

    expect(available).toBe(19534557)
  })
})
