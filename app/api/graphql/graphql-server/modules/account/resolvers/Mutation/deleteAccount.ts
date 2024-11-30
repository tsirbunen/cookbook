import { AccountHandler } from '../../../../../../../../app-business-domain/handlers/accounts/handler'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const deleteAccount: NonNullable<MutationResolvers['deleteAccount']> = async (
  _parent,
  { deleteAccountInput },
  context
) => {
  const handler = new AccountHandler(context.dataStore)
  return await handler.deleteAllAccountData(deleteAccountInput)
}
