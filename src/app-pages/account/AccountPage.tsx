import { Page } from '../../navigation/router/router'
import { HEADER_HEIGHT } from '../../constants/layout'

import { ChakraProps, Flex } from '@chakra-ui/react'

const AccountPage = () => {
  return (
    <Flex {...outerCss} data-testid={`${Page.ACCOUNT}-page`}>
      Account
    </Flex>
  )
}

export default AccountPage

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  marginTop: `${HEADER_HEIGHT + 25}px`,
  marginLeft: '25px',
  marginRight: '25px',
  width: '100%',
  flex: 1
}
