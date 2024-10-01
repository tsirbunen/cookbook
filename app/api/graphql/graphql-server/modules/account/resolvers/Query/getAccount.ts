import { getAccountByToken } from '../../../../services/accounts/service'
import type { QueryResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const getAccount: NonNullable<QueryResolvers['getAccount']> = async (_parent, { token }, _ctx) => {
  return await getAccountByToken(token)
}
