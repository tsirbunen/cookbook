import type { BadInputErrorResolvers } from './../../types.generated'

export const BadInputError: BadInputErrorResolvers = {
  __isTypeOf: (parent) => {
    return parent.errorMessage !== undefined
  }
}
