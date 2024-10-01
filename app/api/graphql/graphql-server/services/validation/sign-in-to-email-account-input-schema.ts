import { TargetSchema } from '../../../../../../src/types/graphql-schema-types.generated'
import { ValidationSchema } from '../../modules/types.generated'
import { emailSchema, passwordSchema } from './property-schemas'

const signInToEmailAccountInputJsonSchema = {
  title: 'Sign in to an email account input',
  description: 'Input for signing in to an account with email and password',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: emailSchema,
    password: passwordSchema
  },
  errorMessage: {
    required: 'Input must have email and password!'
  }
}

export const signInToEmailAccountInputSchema: ValidationSchema = {
  target: TargetSchema.SignInToEmailAccountInput,
  schema: signInToEmailAccountInputJsonSchema
}
