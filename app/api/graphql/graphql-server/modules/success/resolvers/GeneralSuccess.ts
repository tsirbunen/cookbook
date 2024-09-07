import type { GeneralSuccessResolvers } from './../../types.generated'
export const GeneralSuccess: GeneralSuccessResolvers = {
  __isTypeOf: (parent) => {
    return parent.successMessage !== undefined
  }
}
