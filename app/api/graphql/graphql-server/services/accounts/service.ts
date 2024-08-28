import * as dotenv from 'dotenv'
dotenv.config()

import { database } from '../../database/config/config'
import { AccountInput } from '../../modules/types.generated'

export const createNewAccount = async (accountInput: AccountInput) => {
  return null
}

export const requestNewCode = async (phoneNumber: string) => {
  return null
}

export const signInToExistingAccount = async (code: string) => {
  return null
}
