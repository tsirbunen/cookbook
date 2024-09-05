import { Page } from '../../navigation/router/router'
import { HEADER_HEIGHT } from '../../constants/layout'
import { ChakraProps, Flex } from '@chakra-ui/react'
import { Fragment, useContext } from 'react'
import GeneralInfo from './GeneralInfo'
import { AppStateContext, AppStateContextType } from '../../state/StateContextProvider'
import AccountRouteAction from './AccountRouteAction'
import { useRouter } from 'next/navigation'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { createAccountLabel } from './CreateAccountPage'
import { manageAccountLabel } from './ManageAccountPage'
import { requestVerificationCodeLabel } from './RequestVerificationCodePage'
import { signInWithVerificationCodeLabel } from './SignInWithCodePage'

const createAccountInfo =
  'If you have no account yet, you  can easily create one with your phone number. You can also create another account if you wish, but then you need another phone number for verification.'
const requestVerificationCodeInfo =
  'If you have previously created one or more accounts with your phone number(s), you can request a verification code to be sent to your phone number so that you can use your phone to sign in to the app.'
const manageAccountInfo =
  'Now that you have signed into an account, you can manage your account: change your username or phone number, enable or disable cookies, sign out, or even delete your account.'
const signInWithVerificationCodeInfo =
  'Once you have first requested and then received a verification code to your phone, you can sign in using that code. Note that sometimes it may take a few minutes for the code to arrive.'

/**  
   This is the default / fallback page for managing a user account. This page shows the available actions
   as buttons. Clicking a button will take the user to the corresponding page, for example, to create
   a new account or to sign in to an existing account.
 */
const AccountPage = () => {
  const { state } = useContext(AppStateContext) as AppStateContextType
  const router = useRouter()
  const account = state.account

  const navigateTo = (route: AccountRoute) => {
    router.push(`/${Page.ACCOUNT}/${route}`)
  }

  const userIsSignedInToAccount = account?.token

  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-page`}>
      <GeneralInfo />

      {userIsSignedInToAccount ? (
        <AccountRouteAction
          title={manageAccountLabel}
          info={manageAccountInfo}
          buttonLabel={manageAccountLabel}
          performAction={() => navigateTo(AccountRoute.MANAGE_ACCOUNT)}
        />
      ) : (
        <Fragment>
          <AccountRouteAction
            title={createAccountLabel}
            info={createAccountInfo}
            buttonLabel={createAccountLabel}
            performAction={() => navigateTo(AccountRoute.CREATE_ACCOUNT)}
          />

          <AccountRouteAction
            title={requestVerificationCodeLabel}
            info={requestVerificationCodeInfo}
            buttonLabel={requestVerificationCodeLabel}
            performAction={() => navigateTo(AccountRoute.REQUEST_CODE)}
          />

          <AccountRouteAction
            title={signInWithVerificationCodeLabel}
            info={signInWithVerificationCodeInfo}
            buttonLabel={signInWithVerificationCodeLabel}
            performAction={() => navigateTo(AccountRoute.SIGN_IN_WITH_CODE)}
          />
        </Fragment>
      )}
    </Flex>
  )
}

export default AccountPage

export const pageCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  marginTop: `${HEADER_HEIGHT}px`,
  marginLeft: '25px',
  marginRight: '25px',
  width: '100%',
  maxWidth: '600px'
}
