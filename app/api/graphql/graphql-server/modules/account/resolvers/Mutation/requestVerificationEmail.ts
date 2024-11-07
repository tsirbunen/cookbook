import { ValidationTarget } from '../../../../../../../../src/types/graphql-schema-types.generated'
import { requestNewVerificationEmail } from '../../../../services/accounts/service'
import { validateInput } from '../../../../services/validation/service'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const requestVerificationEmail: NonNullable<MutationResolvers['requestVerificationEmail']> = async (
  _parent,
  { email },
  _ctx
) => {
  const validationError = validateInput({ email }, ValidationTarget.RequestVerificationEmailInput)
  if (validationError) return { errorMessage: validationError }

  return await requestNewVerificationEmail(email)
}
