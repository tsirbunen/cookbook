import { type ProviderTokenData, verifyJWT } from './token-utils'

const gitHubGetUserDataURL = 'https://api.github.com/user'

export const getAndVerifyGitHubUser = async (inputToken: string) => {
  const decodedToken = verifyJWT(inputToken) as { data: ProviderTokenData }
  const { idAtProvider, accessToken } = decodedToken.data

  const user = await fetch(gitHubGetUserDataURL, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const userText = await user.text()
  const userData = JSON.parse(userText)
  const gitHubId = userData?.node_id
  if (gitHubId !== idAtProvider) {
    return null
  }

  return gitHubId
}
