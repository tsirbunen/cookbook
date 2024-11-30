import { Flex } from '@chakra-ui/react'
import { Page } from '../../navigation/router/router'
import { pageCss } from '../../utils/styles'

const ShoppingPage = () => {
  return (
    <Flex {...pageCss} data-testid={`${Page.SHOPPING}-page`}>
      <p>Content coming later</p>
    </Flex>
  )
}

export default ShoppingPage
