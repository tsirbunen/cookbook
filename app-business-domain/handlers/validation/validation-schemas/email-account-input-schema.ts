import { ValidationSchema, ValidationTarget } from '../../../../app-ui/types/graphql-schema-types.generated'
import { emailSchema, passwordSchema, usernameSchema } from './property-schemas'

const emailAccountInputJsonSchema = {
  title: 'Email account input',
  description: 'Input for creating an account with email and password',
  type: 'object',
  required: ['username', 'email', 'password'],
  properties: {
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema
  },
  errorMessage: {
    required: 'Input must have username, email and password!'
  }
}

export const emailAccountInputSchema: ValidationSchema = {
  target: ValidationTarget.EmailAccountInput,
  schema: emailAccountInputJsonSchema
}
