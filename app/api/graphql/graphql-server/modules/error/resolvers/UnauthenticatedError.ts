import type { UnauthenticatedErrorResolvers } from './../../types.generated'

export const UnauthenticatedError: UnauthenticatedErrorResolvers = {
  __isTypeOf: (parent) => {
    return !!parent.errorMessage
  }
}
