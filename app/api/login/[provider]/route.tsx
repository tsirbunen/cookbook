import { redirect } from 'next/navigation'

const gitHubLoginBaseURL = 'https://github.com/login/oauth/authorize?client_id='
// FIXME: Implement a better way to handle errors
const errorRedirectRoute = '/account/create'

export async function GET(_request: Request) {
  const clientId = process.env.GITHUB_LOGIN_CLIENT_ID ?? ''
  if (!clientId) {
    redirect(errorRedirectRoute)
  }

  redirect(`${gitHubLoginBaseURL}${clientId}`)
}
