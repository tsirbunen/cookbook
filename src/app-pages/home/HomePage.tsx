import { type ChakraProps, Flex } from '@chakra-ui/react'
import { NAVIGATION_BAR_ITEM_HEIGHT } from '../../navigation/navigation-bar/NavigationBarItem'
import { Page } from '../../navigation/router/router'
import { pageCss } from '../../utils/styles'
import AppIntro from './AppIntro'
import ContentInfoItem from './ContentInfoItem'

const HomePage = () => {
  return (
    <Flex {...pageCss} data-testid={`${Page.HOME}-page`}>
      <Flex {...titleCss}>
        <AppIntro alignment="start" />
      </Flex>

      <Flex {...itemsBoxCss}>
        {contentItems.map(({ label, description }) => {
          return <ContentInfoItem label={label} description={description} key={`content-info-item-${label}`} />
        })}
      </Flex>
    </Flex>
  )
}

export default HomePage

const contentItems = [
  { label: 'SEARCH', description: 'Browse the recipe collection and select one or multiple dishes to cook' },
  { label: 'COOK', description: 'Manage cooking multiple recipes simultaneously' },
  { label: 'WIZARD', description: 'Craft your own culinary masterpieces with the recipe creation wizard' },
  { label: 'SHOPPING', description: 'Generate a shopping list based on recipe ingredients' },
  { label: 'SETTINGS', description: 'Customize your app experience and manage your (optional) account' }
]

const titleCss = {
  height: `${NAVIGATION_BAR_ITEM_HEIGHT}px`
}

const itemsBoxCss = {
  marginTop: '18px',
  flexDirection: 'column' as ChakraProps['flexDirection']
}
