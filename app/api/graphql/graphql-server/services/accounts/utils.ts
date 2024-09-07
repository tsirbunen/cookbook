import { eq, or } from 'drizzle-orm'
import { AccountDBSelect, DatabaseType } from '../../database/inferred-types/inferred-types'
import { AccountInput } from '../../modules/types.generated'
import { accounts } from '../../database/database-schemas/accounts'
import assert from 'assert'

export const getExistingAccount = async (
  trx: DatabaseType,
  queryParams: { phoneNumber?: string; id?: number; username?: string }
) => {
  const whereCondition = getAccountQueryWhereCondition(queryParams)
  if (!whereCondition) return null

  return trx.query.accounts.findFirst({ where: whereCondition })
}

const getAccountQueryWhereCondition = (queryParams: { phoneNumber?: string; id?: number; username?: string }) => {
  const { phoneNumber, id, username } = queryParams
  if (phoneNumber && username && !id) return or(eq(accounts.phoneNumber, phoneNumber), eq(accounts.username, username))
  if (phoneNumber && !username && !id) return eq(accounts.phoneNumber, phoneNumber)
  if (id && !phoneNumber && !username) return eq(accounts.id, id)
  throw new Error('Invalid query parameters!')
}

export const handleCredentialsAlreadyTakenError = async (existing: AccountDBSelect, accountInput: AccountInput) => {
  const { phoneNumber, username } = accountInput
  const phoneNumberTaken = existing.phoneNumber === phoneNumber
  const usernameTaken = existing.username === username
  if (phoneNumberTaken && usernameTaken) return getPhoneNumberAndUsernameExistError(phoneNumber, username)
  if (phoneNumberTaken) return getPhoneNumberExistsError(phoneNumber)
  return getUsernameExistsError(existing.username)
}

export const updateAccountInDBWithCode = async (trx: DatabaseType, id: number, code: string) => {
  const [accountWithCode] = await trx.update(accounts).set({ latestCode: code }).where(eq(accounts.id, id)).returning()
  assert(accountWithCode.latestCode === code)
}

const getPhoneNumberAndUsernameExistError = (phoneNumber: string, username: string) => {
  return {
    errorMessage: `Account with phone number ${phoneNumber} and an account with username ${username} already exist!`
  }
}

const getPhoneNumberExistsError = (phoneNumber: string) => {
  return {
    errorMessage: `Account with phone number ${phoneNumber} already exists! Please request a verification code to sign in.`
  }
}

const getUsernameExistsError = (username: string) => {
  return { errorMessage: `Account with username ${username} already exists! Please come up with another username.` }
}

export const getAccountDoesNotExistError = (phoneNumber?: string) => {
  const errorMessage = phoneNumber
    ? `Account with phone number ${phoneNumber} does not exist! Please move on to another account.`
    : 'The account does not exist!'

  return { errorMessage }
}

export const getAccountDeletedSuccess = (phoneNumber: string) => {
  return { successMessage: `Account with phone number ${phoneNumber} deleted successfully!` }
}

export const getVerificationCodeSentSuccess = (phoneNumber: string) => {
  return {
    successMessage: `Verification code sent to phone number ${phoneNumber}. Please check your phone!`
  }
}
