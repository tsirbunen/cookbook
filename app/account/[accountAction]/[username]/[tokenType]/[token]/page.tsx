'use client'

import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'

import { AppStateContext, AppStateContextType } from '../../../../../../src/state/StateContextProvider'
import { AccountRoute } from '../../../page'
import { ApiServiceContext } from '../../../../../../src/api-service/ApiServiceProvider'
import { Dispatch } from '../../../../../../src/state/reducer'

const CompleteGitHubAccountPage = dynamic(
  () => import('../../../../../../src/app-pages/account/CompleteGitHubAccountPage'),
  {
    ssr: false
  }
)

const AccountPage = dynamic(() => import('../../../../../../src/app-pages/account/AccountPage'), {
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
  const { getAccount } = useContext(ApiServiceContext)
  const { accountAction, username, tokenType, token } = params

  useEffect(() => {
    const fetchAccount = async () => {
      const account = await getAccount(token)
      if (account && account.token) {
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
