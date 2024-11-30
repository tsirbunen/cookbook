import { AccountHandler } from '../../../../../../../../app-business-domain/handlers/accounts/handler'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const createEmailAccount: NonNullable<MutationResolvers['createEmailAccount']> = async (
  _parent,
  { emailAccountInput },
  context
) => {
  const handler = new AccountHandler(context.dataStore)
  return await handler.createNewEmailAccount(emailAccountInput)
}
