'use client'

import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { accountRelatedValidationSchemasAreFetched } from '../../../app-ui/app-pages/account/utils'
import { AppStateContext, type AppStateContextType } from '../../../app-ui/state/StateContextProvider'

const EmailAccountPage = dynamic(() => import('../../../app-ui/app-pages/account/EmailAccountPage'), {
  ssr: false
})

const CreateEmailAccountPage = dynamic(() => import('../../../app-ui/app-pages/account/CreateEmailAccountPage'), {
  ssr: false
})

const SignInWithEmailAndPasswordPage = dynamic(
  () => import('../../../app-ui/app-pages/account/SignInWithEmailAndPasswordPage'),
  {
    ssr: false
  }
)

const ManageAccountPage = dynamic(() => import('../../../app-ui/app-pages/account/ManageAccountPage'), {
  ssr: false
})

const RequestVerificationEmailPage = dynamic(
  () => import('../../../app-ui/app-pages/account/RequestVerificationEmailPage'),
  { ssr: false }
)

const AccountPage = dynamic(() => import('../../../app-ui/app-pages/account/AccountPage'), {
  ssr: false
})

export enum AccountRoute {
  CREATE = 'create',
  SIGN_IN = 'signin',
  MANAGE = 'manage',
  VERIFICATION = 'verification',
  EMAIL = 'email',
  GITHUB = 'github'
}

/**
 * This is a Next-required default export component for route "/account/accountRoute" where
 * the accountRoute purpose can be for example to "create new account", to "sign in to existing
 * account", etc. As for the main routes, the returned components' code is in the
 * src/app-pages folder.
 */
export default function AccountAction({ params }: { params: { accountAction: AccountRoute } }) {
  const { state } = useContext(AppStateContext) as AppStateContextType
  const validationSchemasHaveBeenFetched = accountRelatedValidationSchemasAreFetched(state.validationSchemas)
  if (!validationSchemasHaveBeenFetched) return <AccountPage />

  const { accountAction } = params

  switch (accountAction) {
    case AccountRoute.CREATE:
      return <CreateEmailAccountPage />
    case AccountRoute.EMAIL:
      return <EmailAccountPage />
    case AccountRoute.SIGN_IN:
      return <SignInWithEmailAndPasswordPage />
    case AccountRoute.MANAGE:
      return <ManageAccountPage />
    case AccountRoute.VERIFICATION:
      return <RequestVerificationEmailPage />
    default:
      return <AccountPage />
  }
}
