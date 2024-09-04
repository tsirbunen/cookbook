'use client'

import dynamic from 'next/dynamic'

const CreateAccountPage = dynamic(() => import('../../../src/app-pages/account/CreateAccountPage'), {
  ssr: false
})
const SignInWithCodePage = dynamic(() => import('../../../src/app-pages/account/SignInWithCodePage'), {
  ssr: false
})
const ManageAccountPage = dynamic(() => import('../../../src/app-pages/account/ManageAccountPage'), {
  ssr: false
})
const RequestVerificationCodePage = dynamic(
  () => import('../../../src/app-pages/account/RequestVerificationCodePage'),
  {
    ssr: false
  }
)
const AccountPage = dynamic(() => import('../../../src/app-pages/account/AccountPage'), {
  ssr: false
})

export enum AccountRoute {
  CREATE_ACCOUNT = 'create',
  SIGN_IN_WITH_CODE = 'signin',
  MANAGE_ACCOUNT = 'manage',
  REQUEST_CODE = 'request'
}

/**
 * This is a Next-required default export component for route "/account/accountRoute" where
 * the accountRoute purpose can be for example to "create new account", to "sign in to existing
 * account", etc. As for the main routes, the returned components' code is in the
 * src/app-pages folder.
 */
export default function AccountAction({ params }: { params: { accountAction: AccountRoute } }) {
  const { accountAction } = params
  console.log({ accountAction })

  switch (accountAction) {
    case AccountRoute.CREATE_ACCOUNT:
      return <CreateAccountPage />
    case AccountRoute.SIGN_IN_WITH_CODE:
      return <SignInWithCodePage />
    case AccountRoute.MANAGE_ACCOUNT:
      return <ManageAccountPage />
    case AccountRoute.REQUEST_CODE:
      return <RequestVerificationCodePage />
    default:
      return <AccountPage />
  }
}
