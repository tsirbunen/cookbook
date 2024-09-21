import type { AccountResolvers } from './../../types.generated'

export const Account: AccountResolvers = {
  __isTypeOf: (object) => {
    return !!object.id
  }
}
