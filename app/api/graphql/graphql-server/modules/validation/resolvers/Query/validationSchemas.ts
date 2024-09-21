import { getValidationSchemas } from '../../../../services/validation/service'
import type { QueryResolvers } from './../../../types.generated'

export const validationSchemas: NonNullable<QueryResolvers['validationSchemas']> = async (
  _parent,
  { schemas },
  _ctx
) => {
  return getValidationSchemas(schemas)
}
