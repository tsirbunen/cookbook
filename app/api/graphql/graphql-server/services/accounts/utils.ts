import { eq, or } from 'drizzle-orm'
import { DatabaseType } from '../../database/inferred-types/inferred-types'
import { AccountInput } from '../../modules/types.generated'
import { accounts } from '../../database/database-schemas/accounts'

const phoneNumberExistsMessage = (phoneNumber: string) =>
  `Account with phone number ${phoneNumber} already exists! Please request a verification code to sign in.`
const usernameExistsMessage = (username: string) =>
  `Account with username ${username} already exists! Please come up with another username.`

export const createAccount = async (trx: DatabaseType, accountInput: AccountInput) => {
  const existingAccount = await trx.query.accounts.findFirst({
    where: or(eq(accounts.phoneNumber, accountInput.phoneNumber), eq(accounts.username, accountInput.username))
  })

  if (existingAccount && existingAccount.phoneNumber === accountInput.phoneNumber) {
    return { errorMessage: phoneNumberExistsMessage(existingAccount.phoneNumber) }
  }

  if (existingAccount && existingAccount.username === accountInput.username) {
    return { errorMessage: usernameExistsMessage(existingAccount.username) }
  }

  const [newAccount] = await trx
    .insert(accounts)
    .values({ ...accountInput, isVerified: false })
    .returning()

  return newAccount
}
