import { TargetSchema } from '../../../../../../src/types/graphql-schema-types.generated'
import type { ValidationSchema } from '../../modules/types.generated'
import { usernameSchema } from './property-schemas'

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
  target: TargetSchema.ProviderAccountInput,
  schema: providerAccountInputJsonSchema
}
