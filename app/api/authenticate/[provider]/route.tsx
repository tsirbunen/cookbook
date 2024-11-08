import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { database } from '../../graphql/graphql-server/database/config/config'
import { accounts } from '../../graphql/graphql-server/database/database-schemas/accounts'
import { createJWT, createProviderAccessTokenJWT } from '../../graphql/graphql-server/services/accounts/token-utils'

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
  if (account) {
    const token = createJWT({ id: account.id, uuid: account.uuid, username: account.username })
    redirect(`/account/github/${gitHubUsername}/app/${token}`)
  }

  const token = createProviderAccessTokenJWT({ idAtProvider: gitHubId, accessToken: access_token })
  redirect(`/account/github/${gitHubUsername}/access/${token}`)
}
