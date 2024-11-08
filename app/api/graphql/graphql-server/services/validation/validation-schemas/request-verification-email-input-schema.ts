import { ValidationTarget } from '../../../../../../../src/types/graphql-schema-types.generated'
import type { ValidationSchema } from '../../../modules/types.generated'
import { emailSchema } from './property-schemas'

const requestVerificationEmailInputJsonSchema = {
  title: 'Request verification email input',
  description: 'Request verification email to an email account',
  type: 'object',
  required: ['email'],
  properties: {
    email: emailSchema
  },
  errorMessage: {
    required: 'Input must have email!'
  }
}

export const requestVerificationEmailInputSchema: ValidationSchema = {
  target: ValidationTarget.RequestVerificationEmailInput,
  schema: requestVerificationEmailInputJsonSchema
}
