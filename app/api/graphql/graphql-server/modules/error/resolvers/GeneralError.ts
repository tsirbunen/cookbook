import type { GeneralErrorResolvers } from './../../types.generated'

export const GeneralError: GeneralErrorResolvers = {
  __isTypeOf: (parent) => {
    return parent.errorMessage !== undefined
  }
}
