import { TargetSchema } from '../../../../../../../../src/types/graphql-schema-types.generated'
import { createNewNonEmailAccount } from '../../../../services/accounts/service'
import { validateInput } from '../../../../services/validation/service'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const createNonEmailAccount: NonNullable<MutationResolvers['createNonEmailAccount']> = async (
  _parent,
  { nonEmailAccountInput },
  _ctx
) => {
  const validationError = validateInput(nonEmailAccountInput, TargetSchema.ProviderAccountInput)
  if (validationError) return { errorMessage: validationError }

  return await createNewNonEmailAccount(nonEmailAccountInput)
}
