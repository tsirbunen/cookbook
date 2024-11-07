import { ValidationTarget } from '../../../../../../../../src/types/graphql-schema-types.generated'
import { deleteAllAccountData } from '../../../../services/accounts/service'
import { validateInput } from '../../../../services/validation/service'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const deleteAccount: NonNullable<MutationResolvers['deleteAccount']> = async (_parent, { id, uuid }, _ctx) => {
  const validationError = validateInput({ id, uuid }, ValidationTarget.DeleteAccountInput)
  if (validationError) return { errorMessage: validationError }
  return await deleteAllAccountData(id, uuid)
}
