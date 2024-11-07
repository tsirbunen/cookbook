import type { UnauthorizedErrorResolvers } from './../../types.generated'

export const UnauthorizedError: UnauthorizedErrorResolvers = {
  __isTypeOf: (parent) => {
    return !!parent.errorMessage
  }
}
