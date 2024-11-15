import { and, eq, or } from 'drizzle-orm'
import {
  type Account,
  type ByKey,
  type EmailAccountInput,
  IdentityProvider,
  type QueryAccountsParams
} from '../../handlers/types-and-interfaces/types'
import type { Database } from '../config/config'
import { accounts } from '../database-schemas/accounts'

const invalidQueryParams = 'Invalid query parameters!'

export class AccountStore {
  async getExistingAccounts(trx: Database, queryParams: QueryAccountsParams) {
    const operator = queryParams.operator || 'OR'
    const whereCondition = this.getAccountQueryWhereCondition({ ...queryParams, operator })
    return (await trx.query.accounts.findMany({ where: whereCondition })).filter(Boolean) as Account[]
  }

  async getAccountBy(trx: Database, by: ByKey, value: string): Promise<Account> {
    const accounts = await this.getExistingAccounts(trx, { [by]: value })
    const account = accounts[0]
    return {
      ...account,
      idAtProvider: account.idAtProvider as string,
      identityProvider: this.getIdentityProvider(account.identityProvider)
    }
  }

  getAccountQueryWhereCondition(queryParams: QueryAccountsParams) {
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

  async insertEmailAccount(trx: Database, accountInput: EmailAccountInput, idAtProvider: string, passwordHash: string) {
    const [newAccount] = await trx
      .insert(accounts)
      .values({
        username: accountInput.username,
        email: accountInput.email,
        passwordHash,
        emailVerified: false,
        identityProvider: IdentityProvider.EMAIL,
        idAtProvider
      })
      .returning()

    return { ...newAccount, idAtProvider: newAccount.idAtProvider as string, identityProvider: IdentityProvider.EMAIL }
  }

  async insertNonEmailAccount(
    trx: Database,
    username: string,
    idAtProvider: string,
    identityProvider: IdentityProvider
  ): Promise<Account> {
    const [newAccount] = await trx
      .insert(accounts)
      .values({
        username,
        identityProvider,
        idAtProvider
      })
      .returning()

    return {
      ...newAccount,
      // FIXME: This is a hack to make the tests pass
      idAtProvider: newAccount.idAtProvider as string,
      identityProvider: this.getIdentityProvider(newAccount.identityProvider)
    }
  }

  async setEmailIsVerified(trx: Database, id: number) {
    await trx.update(accounts).set({ emailVerified: true }).where(eq(accounts.id, id)).returning()
  }

  getIdentityProvider(identityProvider: string) {
    switch (identityProvider) {
      case 'GITHUB':
        return IdentityProvider.GITHUB
      case 'FACEBOOK':
        return IdentityProvider.FACEBOOK
      case 'EMAIL':
        return IdentityProvider.EMAIL
      default:
        throw new Error('Invalid identity provider')
    }
  }
}
