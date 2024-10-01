import { TargetSchema } from '../../../../../../../../src/types/graphql-schema-types.generated'
import { createNewEmailAccount } from '../../../../services/accounts/service'
import { validateInput } from '../../../../services/validation/service'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const createEmailAccount: NonNullable<MutationResolvers['createEmailAccount']> = async (
  _parent,
  { emailAccountInput },
  _ctx
) => {
  const validationError = validateInput(emailAccountInput, TargetSchema.EmailAccountInput)
  if (validationError) return { errorMessage: validationError }

  return await createNewEmailAccount(emailAccountInput)
}
