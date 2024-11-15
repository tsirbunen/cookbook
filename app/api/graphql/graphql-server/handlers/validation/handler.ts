import { ValidationTarget } from '../../../../../../src/types/graphql-schema-types.generated'
import { validator } from '../../../route'
import type { ValidationTarget as Target, ValidationSchema } from '../../modules/types.generated'
import { createRecipeInputSchema } from './validation-schemas/create-recipe-input-schema'
import { deleteAccountInputSchema } from './validation-schemas/delete-account-input-schema'
import { emailAccountInputSchema } from './validation-schemas/email-account-input-schema'
import { patchRecipeInputSchema } from './validation-schemas/patch-recipe-input-schema'
import { providerAccountInputSchema } from './validation-schemas/provider-account-input-schema'
import { requestVerificationEmailInputSchema } from './validation-schemas/request-verification-email-input-schema'
import { signInToEmailAccountInputSchema } from './validation-schemas/sign-in-to-email-account-input-schema'

const validationSchemas = {
  [ValidationTarget.EmailAccountInput]: emailAccountInputSchema,
  [ValidationTarget.SignInToEmailAccountInput]: signInToEmailAccountInputSchema,
  [ValidationTarget.RequestVerificationEmailInput]: requestVerificationEmailInputSchema,
  [ValidationTarget.ProviderAccountInput]: providerAccountInputSchema,
  [ValidationTarget.DeleteAccountInput]: deleteAccountInputSchema,
  [ValidationTarget.CreateRecipeInput]: createRecipeInputSchema,
  [ValidationTarget.PatchRecipeInput]: patchRecipeInputSchema
}

export const getValidationSchemas = async (validationTargets: Target[]) => {
  const schemasToReturn: ValidationSchema[] = []

  for (const target of validationTargets) {
    if (validationSchemas[target]) {
      schemasToReturn.push(validationSchemas[target])
    }
  }

  return schemasToReturn
}

export const validateInput = (input: unknown, target: ValidationTarget) => {
  const inputValidator = validator.getSchema(target)
  const isValid = inputValidator?.(input)
  if (isValid) return null

  return inputValidator?.errors?.map((error) => error.message).join(' ')
}
