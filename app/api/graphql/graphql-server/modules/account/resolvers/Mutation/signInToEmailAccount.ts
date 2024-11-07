import { ValidationTarget } from '../../../../../../../../src/types/graphql-schema-types.generated'
import { signInToExistingEmailAccount } from '../../../../services/accounts/service'
import { validateInput } from '../../../../services/validation/service'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const signInToEmailAccount: NonNullable<MutationResolvers['signInToEmailAccount']> = async (
  _parent,
  { signInToEmailAccountInput },
  _ctx
) => {
  const validationError = validateInput(signInToEmailAccountInput, ValidationTarget.SignInToEmailAccountInput)
  if (validationError) return { errorMessage: validationError }

  return await signInToExistingEmailAccount(signInToEmailAccountInput)
}
