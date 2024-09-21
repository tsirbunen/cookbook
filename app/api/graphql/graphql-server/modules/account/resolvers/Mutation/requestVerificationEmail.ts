import { requestNewVerificationEmail } from '../../../../services/accounts/service'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const requestVerificationEmail: NonNullable<MutationResolvers['requestVerificationEmail']> = async (
  _parent,
  { email },
  _ctx
) => {
  return await requestNewVerificationEmail(email)
}