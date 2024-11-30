'use client'

import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'

import { ApiServiceContext } from '../../../../../../app-ui/api-service/ApiServiceProvider'
import { AppStateContext, type AppStateContextType } from '../../../../../../app-ui/state/StateContextProvider'
import { Dispatch } from '../../../../../../app-ui/state/reducer'
import { AccountRoute } from '../../../page'

const CompleteGitHubAccountPage = dynamic(
  () => import('../../../../../../app-ui/app-pages/account/CompleteGitHubAccountPage'),
  {
    ssr: false
  }
)

const AccountPage = dynamic(() => import('../../../../../../app-ui/app-pages/account/AccountPage'), {
  ssr: false
})

enum TokenType {
  APP = 'app',
  ACCESS = 'access'
}

type ProviderUsernamePageProps = {
  params: { accountAction: AccountRoute; username: string; tokenType: TokenType; token: string }
}

export default function ProviderLoggedInPage({ params }: ProviderUsernamePageProps) {
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const { getAccount, setAuthenticationToken } = useContext(ApiServiceContext)
  const { accountAction, username, tokenType, token } = params

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only want to run this effect once
  useEffect(() => {
    const fetchAccount = async () => {
      const account = await getAccount(token)
      if (account?.token) {
        setAuthenticationToken(account.token)
        dispatch({
          type: Dispatch.SET_ACCOUNT,
          payload: {
            account: {
              id: account.id,
              uuid: account.uuid,
              username,
              identityProvider: account.identityProvider,
              token: account.token
            }
          }
        })
      }
    }

    if (tokenType === TokenType.APP) {
      fetchAccount()
    }
  }, [])

  if (accountAction === AccountRoute.GITHUB && tokenType === TokenType.ACCESS && token) {
    return <CompleteGitHubAccountPage username={username} token={token} />
  }

  return <AccountPage />
}
