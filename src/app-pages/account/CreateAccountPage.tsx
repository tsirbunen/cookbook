import { ChakraProps, Flex } from '@chakra-ui/react'
import { pageCss } from './AccountPage'
import { Page } from '../../navigation/router/router'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import TitleWithSpacing from './TitleWithSpacing'
import { content } from './textContent'
import CreateEmailAccountContent from './CreateEmailAccountContent'

// FIXME: Implement additional ways to create an account, for example, using GitHub or Facebook account.
const CreateAccountPage = () => {
  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-${AccountRoute.CREATE}-page`}>
      <Flex {...outerCss}>
        <TitleWithSpacing title={content.createAccountLabel} />

        <CreateEmailAccountContent />
      </Flex>
    </Flex>
  )
}

export default CreateAccountPage

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start'
}
