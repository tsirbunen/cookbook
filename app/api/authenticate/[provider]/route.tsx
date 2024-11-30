import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { createJWT, createProviderAccessTokenJWT } from '../../../../app-business-domain/handlers/accounts/token-utils'
import { IdentityProvider } from '../../../../app-business-domain/types-and-interfaces/types'
import { database } from '../../../../app-datastore/config/config'
import { accounts } from '../../../../app-datastore/database-schemas/accounts'
const gitHubGetAccessTokenBaseURL = 'https://github.com/login/oauth/access_token'
const gitHubGetUserDataURL = 'https://api.github.com/user'
// FIXME: Implement a better way to handle errors
const errorRedirectRoute = '/account'

export async function GET(request: Request) {
  const code = request.url.split('?code=')[1]
  const clientId = process.env.GITHUB_LOGIN_CLIENT_ID ?? ''
  const secret = process.env.GITHUB_LOGIN_SECRET ?? ''
  if (!code || !clientId || !secret) {
    redirect(errorRedirectRoute)
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: secret,
    code: code
  })

  const accessTokenUrl = `${gitHubGetAccessTokenBaseURL}?${params.toString()}`

  const accessTokenResponse = await fetch(accessTokenUrl, {
    method: 'POST',
    headers: { Accept: 'application/json' }
  })

  const accessTokenResponseText = await accessTokenResponse.text()
  const { access_token } = JSON.parse(accessTokenResponseText)
  if (!access_token) {
    redirect(errorRedirectRoute)
  }

  const user = await fetch(gitHubGetUserDataURL, {
    headers: { Authorization: `Bearer ${access_token}` }
  })

  const userText = await user.text()
  const userData = JSON.parse(userText)
  const gitHubUsername = userData.login
  const gitHubId = userData.node_id
  if (!gitHubUsername || !gitHubId) {
    redirect(errorRedirectRoute)
  }

  const account = await database.query.accounts.findFirst({ where: eq(accounts.idAtProvider, gitHubId) })
  const identityProvider = IdentityProvider.GITHUB
  if (account) {
    const token = createJWT({ identityProvider, id: account.id, uuid: account.uuid, username: account.username })
    redirect(`/account/github/${gitHubUsername}/app/${token}`)
  }

  const token = createProviderAccessTokenJWT({
    identityProvider,
    idAtProvider: gitHubId,
    accessToken: access_token
  })
  redirect(`/account/github/${gitHubUsername}/access/${token}`)
}
