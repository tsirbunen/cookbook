import * as dotenv from 'dotenv'
dotenv.config()

// import { database } from '../../database/config/config'
import { AccountInput } from '../../modules/types.generated'

export const createNewAccount = async (accountInput: AccountInput) => {
  // FIXME: Implement this properly; while developing front, keep this
  return {
    ...accountInput,
    id: 3,
    isVerified: false
  }
}

export const requestNewCode = async (phoneNumber: string) => {
  return true
}

export const signInToExistingAccount = async (code: string) => {
  // FIXME: Implement this properly; while developing front, keep this
  return {
    username: 'user from api',
    phoneNumber: '+358 50 1234567',
    id: 3,
    isVerified: true,
    token: 'token'
  }
}

export const deleteAllAccountData = async (id: number) => {
  // FIXME: Implement this properly; while developing front, keep this
  return true
}
