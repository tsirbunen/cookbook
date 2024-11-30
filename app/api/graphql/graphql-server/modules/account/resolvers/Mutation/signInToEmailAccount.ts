import { AccountHandler } from '../../../../../../../../app-business-domain/handlers/accounts/handler'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const signInToEmailAccount: NonNullable<MutationResolvers['signInToEmailAccount']> = async (
  _parent,
  { signInToEmailAccountInput },
  context
) => {
  const handler = new AccountHandler(context.dataStore)
  return await handler.signInToExistingEmailAccount(signInToEmailAccountInput)
}
