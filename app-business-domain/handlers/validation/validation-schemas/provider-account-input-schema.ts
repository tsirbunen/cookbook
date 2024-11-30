import { usernameSchema } from './property-schemas'
import { ValidationSchema, ValidationTarget } from '../../../../app-ui/types/graphql-schema-types.generated'

const providerAccountInputJsonSchema = {
  title: 'Create account with provider identity validation input',
  description: 'Create account with provider identity validation input',
  type: 'object',
  required: ['username'],
  properties: {
    username: usernameSchema
  },
  errorMessage: {
    required: 'Input must have username!'
  }
}

export const providerAccountInputSchema: ValidationSchema = {
  target: ValidationTarget.ProviderAccountInput,
  schema: providerAccountInputJsonSchema
}
