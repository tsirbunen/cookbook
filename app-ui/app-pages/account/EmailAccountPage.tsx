import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { Page } from '../../navigation/page-paths'
import { pageCss } from '../../utils/styles'
import AccountRouteSelector from './AccountRouteSelector'
import { content } from './textContent'

const EmailAccountPage = () => {
  const router = useRouter()

  const navigateTo = (route: AccountRoute) => router.push(`/${Page.ACCOUNT}/${route}`)

  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-${AccountRoute.EMAIL}-page`}>
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
