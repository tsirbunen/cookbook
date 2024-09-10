import { and, eq, or } from 'drizzle-orm'
import { AccountDBSelect, DatabaseType } from '../../database/inferred-types/inferred-types'
import { Account, AccountInput } from '../../modules/types.generated'
import { accounts } from '../../database/database-schemas/accounts'
import assert from 'assert'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET
assert(jwtSecret, 'JWT_SECRET environment variable is missing!')
const jwtIssuer = 'cooking-companion-server'
const jwtAudience = 'cooking-companion-account'
const jwtExpirationTimeFromNow = 60 * 60 * 24 * 7 // 1 week

export const createJWT = (data: Account) => {
  const { id, uuid, username, phoneNumber } = data
  return jwt.sign(
    {
      data: { id: id, username: username, phoneNumber: phoneNumber },
      sub: uuid,
      iss: jwtIssuer,
      aud: jwtAudience,
      exp: Math.floor(Date.now() / 1000) + jwtExpirationTimeFromNow
    },
    jwtSecret
  )
}

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, jwtSecret, { issuer: jwtIssuer, audience: jwtAudience })
  return decoded
}

export const getExistingAccount = async (
  trx: DatabaseType,
  queryParams: { phoneNumber?: string; id?: number; username?: string; uuid?: string }
) => {
  const whereCondition = getAccountQueryWhereCondition(queryParams)
  if (!whereCondition) return null

  return trx.query.accounts.findFirst({ where: whereCondition })
}

const getAccountQueryWhereCondition = (queryParams: {
  phoneNumber?: string
  id?: number
  username?: string
  uuid?: string
}) => {
  const { phoneNumber, id, username, uuid } = queryParams
  if (phoneNumber && username && !id && !uuid)
    return or(eq(accounts.phoneNumber, phoneNumber), eq(accounts.username, username))

  if (phoneNumber && !username && !id && !uuid) return eq(accounts.phoneNumber, phoneNumber)

  if (id && uuid && !phoneNumber && !username) return and(eq(accounts.id, id), eq(accounts.uuid, uuid))
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

export const setIsVerifiedAndSetCodeToNull = async (trx: DatabaseType, id: number) => {
  const [account] = await trx
    .update(accounts)
    .set({ isVerified: true, latestCode: null })
    .where(eq(accounts.id, id))
    .returning()
  assert(account.latestCode === null)

  return account
}

export const setCodeToNull = async (trx: DatabaseType, id: number) => {
  const [account] = await trx.update(accounts).set({ latestCode: null }).where(eq(accounts.id, id)).returning()
  assert(account.latestCode === null)
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

export const getAccountCouldNotBeFoundError = (phoneNumber?: string) => {
  const errorMessage = phoneNumber
    ? `Account with phone number ${phoneNumber} could not be found! Please move on to another account.`
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

export const getWrongCodeError = (code: string) => {
  return {
    errorMessage: `The code you sent (${code}) is not correct! Please request a new one.`
  }
}

export const getFeatureNotAvailableAtTheMomentError = () => {
  return {
    errorMessage: 'Sorry! This feature is not available at the moment.'
  }
}
