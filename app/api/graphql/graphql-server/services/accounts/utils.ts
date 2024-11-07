import { and, eq, or } from 'drizzle-orm'
import { IdentityProvider as IdentityProviderEnum } from '../../../../../../src/types/graphql-schema-types.generated'
import { accounts } from '../../database/database-schemas/accounts'
import type { AccountDBSelect, DatabaseType } from '../../database/inferred-types/inferred-types'
import type { EmailAccountInput, IdentityProvider } from '../../modules/types.generated'
import { getAllEmailAuthUsers, signInEmailAuthUser } from './email-provider-utils'
import { AuthError, getError } from './error-utils'
import { getHashedPassword } from './password-utils'
import { createJWT } from './token-utils'

type ByKey = 'email' | 'uuid' | 'idAtProvider' | 'id'
type Operator = 'AND' | 'OR'
type QueryAccountsParams = {
  username?: string | null
  id?: number | null
  uuid?: string | null
  email?: string | null
  operator?: Operator
  idAtProvider?: string | null
}

const invalidQueryParams = 'Invalid query parameters!'

export const getExistingAccounts = async (trx: DatabaseType, queryParams: QueryAccountsParams) => {
  const operator = queryParams.operator || 'OR'
  const whereCondition = getAccountQueryWhereCondition({ ...queryParams, operator })
  return (await trx.query.accounts.findMany({ where: whereCondition })).filter(Boolean) as AccountDBSelect[]
}

export const getAccountBy = async (trx: DatabaseType, by: ByKey, value: string) => {
  const accounts = await getExistingAccounts(trx, { [by]: value })
  return accounts[0]
}

const getAccountQueryWhereCondition = (queryParams: QueryAccountsParams) => {
  const { id, username, uuid, email, operator, idAtProvider } = queryParams

  const conditions = []

  if (email) conditions.push(eq(accounts.email, email))
  if (id) conditions.push(eq(accounts.id, id))
  if (uuid) conditions.push(eq(accounts.uuid, uuid))
  if (username) conditions.push(eq(accounts.username, username))
  if (idAtProvider) conditions.push(eq(accounts.idAtProvider, idAtProvider))
  if (conditions.length === 0) throw new Error(invalidQueryParams)

  return operator === 'AND' ? and(...conditions) : or(...conditions)
}

export const insertNonEmailAccount = async (
  trx: DatabaseType,
  username: string,
  idAtProvider: string,
  identityProvider: IdentityProvider
) => {
  const [newAccount] = await trx
    .insert(accounts)
    .values({
      username,
      identityProvider,
      idAtProvider
    })
    .returning()

  return newAccount
}

export const setEmailIsVerified = async (trx: DatabaseType, id: number) => {
  await trx.update(accounts).set({ emailVerified: true }).where(eq(accounts.id, id)).returning()
}

export const insertEmailAccount = async (trx: DatabaseType, accountInput: EmailAccountInput, idAtProvider: string) => {
  // Note: Currently we use the free email authentication provider to check the passwords. However, we might run out of
  // free API calls at some point. So let's hash and store the password in case we need to start checking the passwords
  // ourselves.
  const passwordHash = await getHashedPassword(accountInput.password)

  const [newAccount] = await trx
    .insert(accounts)
    .values({
      username: accountInput.username,
      email: accountInput.email,
      passwordHash,
      emailVerified: false,
      identityProvider: IdentityProviderEnum.Email,
      idAtProvider
    })
    .returning()

  return { ...newAccount, identityProvider: IdentityProviderEnum.Email }
}

export const fetchEmailAuthProviderUserAndUpsertAccount = async (
  trx: DatabaseType,
  { email, password, username }: EmailAccountInput
) => {
  // Else an account with the same email did already exist at the email provider's auth database
  // and a fake user was first returned to us. As an existing account was not found in this app's
  // database, we need to create one. First we need to verify that the password provided in the input is correct.
  // We cannot attempt to sign in directly because the email might not be verified yet. So we need to query details
  // of the user to create an account in this app's database. The current email provider's auth database
  // does not support querying a single user by email, only all users can be queried.
  const usersListData = await getAllEmailAuthUsers()
  const authAccount = usersListData.data.users.find((user) => user.email === email)
  if (authAccount) {
    // If the account is found at the provider's auth database, then we need to try to sign in to that account
    // with the password provided in the input to verify that the password is correct before saving the hashed
    // password to this app's database.
    const signInResponse = await signInEmailAuthUser({ email, password })
    const idAtProvider = signInResponse.data?.user?.id

    if (idAtProvider) return await insertEmailAccount(trx, { email, password, username }, idAtProvider)
  }

  return getError(AuthError.SOMETHING_WENT_WRONG)
}

export const getVerifiedAccountWithTokenAdded = ({ id, uuid, username, email }: AccountDBSelect) => {
  const token = createJWT({ id, uuid, username })
  const identityProvider = IdentityProviderEnum.Email

  return { id, uuid, username, email, emailVerified: true, token, identityProvider }
}
