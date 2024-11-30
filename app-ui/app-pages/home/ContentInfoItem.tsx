import { type ChakraProps, Flex, Text } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'
import { NAVIGATION_BAR_ITEM_HEIGHT } from '../../navigation/navigation-bar/NavigationBarItem'

type PageInfoItemProps = {
  label: string
  description: string
}

const ContentInfoItem = ({ label, description }: PageInfoItemProps) => {
  return (
    <Flex {...outerCss}>
      <Text {...labelCss}>{label}</Text>
      <Flex {...infoBoxCss}>
        <Text {...descriptionCss}>{description}</Text>
      </Flex>
    </Flex>
  )
}

export default ContentInfoItem

const outerCss = {
  display: 'flex' as ChakraProps['display'],
  flexDirection: 'row' as ChakraProps['flexDirection'],
  height: `${NAVIGATION_BAR_ITEM_HEIGHT + 10}px`
}

const labelCss = {
  fontWeight: 'bold',
  color: Shades.DARK,
  width: '120px'
}

const descriptionCss = {
  color: Shades.DARK,
  fontSize: '0.9em'
}

const infoBoxCss = {
  width: '400px',
  lineHeight: '1.2em'
}
