import type { AccountResolvers } from './../../types.generated'

export const Account: AccountResolvers = {
  __isTypeOf: (parent) => {
    return parent.phoneNumber !== undefined
  }
}
