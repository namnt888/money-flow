export function resolveCreditLimit(params: {
  ownLimit: number | null | undefined
  parentLimit: number | null | undefined
}) {
  const ownLimit = params.ownLimit ?? 0
  const parentLimit = params.parentLimit

  return (parentLimit ?? ownLimit) || 0
}

export function computeCreditAvailableBalance(params: {
  ownLimit: number | null | undefined
  parentLimit: number | null | undefined
  debt: number | null | undefined
}) {
  const limit = resolveCreditLimit({
    ownLimit: params.ownLimit,
    parentLimit: params.parentLimit,
  })

  const debt = Math.abs(params.debt ?? 0)
  return limit - debt
}
