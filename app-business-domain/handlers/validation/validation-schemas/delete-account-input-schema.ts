import { ValidationSchema, ValidationTarget } from '../../../../app-ui/types/graphql-schema-types.generated'
import { idSchema, uuidSchema } from './property-schemas'

const deleteAccountInputJsonSchema = {
  title: 'Delete account input',
  description: 'Input for deleting an account with id and uuid',
  type: 'object',
  required: ['id', 'uuid'],
  properties: {
    id: idSchema,
    uuid: uuidSchema
  },
  errorMessage: {
    required: 'Input must have id and uuid!'
  }
}

export const deleteAccountInputSchema: ValidationSchema = {
  target: ValidationTarget.DeleteAccountInput,
  schema: deleteAccountInputJsonSchema
}
