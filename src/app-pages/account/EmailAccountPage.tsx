import { Page } from '../../navigation/router/router'
import { HEADER_HEIGHT } from '../../constants/layout'
import { ChakraProps, Flex } from '@chakra-ui/react'
import AccountRouteSelector from './AccountRouteSelector'
import { useRouter } from 'next/navigation'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { content } from './textContent'

const EmailAccountPage = () => {
  const router = useRouter()

  const navigateTo = (route: AccountRoute) => router.push(`/${Page.ACCOUNT}/${route}`)

  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-page`}>
      <AccountRouteSelector
        title={content.createAccountLabel}
        info={content.createAccountInfo}
        buttonLabel={content.createAccountLabel}
        performAction={() => navigateTo(AccountRoute.CREATE)}
      />

      <AccountRouteSelector
        title={content.signInLabel}
        info={content.signInInfo}
        buttonLabel={content.signInLabel}
        performAction={() => navigateTo(AccountRoute.SIGN_IN)}
      />

      <AccountRouteSelector
        title={content.requestVerificationEmailLabel}
        info={content.requestVerificationCodeInfo}
        buttonLabel={content.requestVerificationEmailLabel}
        performAction={() => navigateTo(AccountRoute.VERIFICATION)}
      />
    </Flex>
  )
}

export default EmailAccountPage

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
