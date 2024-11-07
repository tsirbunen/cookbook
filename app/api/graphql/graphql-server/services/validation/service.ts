import { TargetSchema } from '../../../../../../src/types/graphql-schema-types.generated'
import { validator } from '../../../route'
import type { TargetSchema as Target, ValidationSchema } from '../../modules/types.generated'
import { createRecipeInputSchema } from './create-recipe-input-schema'
import { deleteAccountInputSchema } from './delete-account-input-schema'
import { emailAccountInputSchema } from './email-account-input-schema'
import { patchRecipeInputSchema } from './patch-recipe-input-schema'
import { providerAccountInputSchema } from './provider-account-input-schema'
import { requestVerificationEmailInputSchema } from './request-verification-email-input-schema'
import { signInToEmailAccountInputSchema } from './sign-in-to-email-account-input-schema'

const availableSchemas = {
  [TargetSchema.EmailAccountInput]: emailAccountInputSchema,
  [TargetSchema.SignInToEmailAccountInput]: signInToEmailAccountInputSchema,
  [TargetSchema.RequestVerificationEmailInput]: requestVerificationEmailInputSchema,
  [TargetSchema.ProviderAccountInput]: providerAccountInputSchema,
  [TargetSchema.DeleteAccountInput]: deleteAccountInputSchema,
  [TargetSchema.CreateRecipeInput]: createRecipeInputSchema,
  [TargetSchema.PatchRecipeInput]: patchRecipeInputSchema
}

export const getValidationSchemas = async (targetSchemas: Target[]) => {
  const schemasToReturn: ValidationSchema[] = []

  for (const targetSchema of targetSchemas) {
    if (availableSchemas[targetSchema]) {
      schemasToReturn.push(availableSchemas[targetSchema])
    }
  }

  return schemasToReturn
}

export const validateInput = (input: unknown, targetSchema: TargetSchema) => {
  const inputValidator = validator.getSchema(targetSchema)
  const isValid = inputValidator?.(input)
  if (isValid) return null

  return inputValidator?.errors?.map((error) => error.message).join(' ')
}
