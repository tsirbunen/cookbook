import { TargetSchema } from '../../../../../../src/types/graphql-schema-types.generated'
import { ValidationSchema } from '../../modules/types.generated'
import { uuidSchema, idSchema } from './property-schemas'

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
  target: TargetSchema.DeleteAccountInput,
  schema: deleteAccountInputJsonSchema
}
