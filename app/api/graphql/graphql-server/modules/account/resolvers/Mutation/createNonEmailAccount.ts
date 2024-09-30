import { createNewNonEmailAccount } from '../../../../services/accounts/service'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const createNonEmailAccount: NonNullable<MutationResolvers['createNonEmailAccount']> = async (
  _parent,
  { nonEmailAccountInput },
  _ctx
) => {
  console.log({ nonEmailAccountInput })
  return await createNewNonEmailAccount(nonEmailAccountInput)
}
