import { AccountHandler } from '../../../../../../../../app-business-domain/handlers/accounts/handler'
import type { NonEmailAccountInput } from '../../../../../../../../app-business-domain/types-and-interfaces/types'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const createNonEmailAccount: NonNullable<MutationResolvers['createNonEmailAccount']> = async (
  _parent,
  { nonEmailAccountInput },
  context
) => {
  const handler = new AccountHandler(context.dataStore)
  // FIXME: Get rid of type casting to domain types
  return await handler.createNewNonEmailAccount(nonEmailAccountInput as NonEmailAccountInput)
}
