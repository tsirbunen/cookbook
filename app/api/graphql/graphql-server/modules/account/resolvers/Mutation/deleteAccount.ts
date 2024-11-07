import { deleteAllAccountData } from '../../../../services/accounts/service'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const deleteAccount: NonNullable<MutationResolvers['deleteAccount']> = async (
  _parent,
  { deleteAccountInput },
  _ctx
) => {
  return await deleteAllAccountData(deleteAccountInput)
}
