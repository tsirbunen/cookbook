import { TargetSchema as Target, ValidationSchema } from '../../modules/types.generated'
import { emailAccountInputSchema } from './email-account-input-schema'
import { TargetSchema } from '../../../../../../src/types/graphql-schema-types.generated'
import { signInToEmailAccountInputSchema } from './sign-in-to-email-account-input-schema'
import { requestVerificationEmailInputSchema } from './request-verification-email-input-schema'

const availableSchemas = {
  [TargetSchema.EmailAccountInput]: emailAccountInputSchema,
  [TargetSchema.SignInToEmailAccountInput]: signInToEmailAccountInputSchema,
  [TargetSchema.RequestVerificationEmailInput]: requestVerificationEmailInputSchema
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