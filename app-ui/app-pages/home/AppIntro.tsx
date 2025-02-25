import { type ChakraProps, Flex, Text } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'
import { APP_INTRO_TEXTS } from '../../constants/text-content'
import { NAVIGATION_BAR_ITEM_HEIGHT } from '../../navigation/NavigationBarItem'

type AppIntroProps = {
  alignment: 'center' | 'start'
}

const AppIntro = ({ alignment }: AppIntroProps) => {
  return (
    <Flex {...introBoxCss(alignment)}>
      {APP_INTRO_TEXTS.map((line) => {
        return <Text key={`intro-line-${line}`}>{line}</Text>
      })}
    </Flex>
  )
}

export default AppIntro

const introBoxCss = (alignment: 'center' | 'start') => {
  return {
    color: Shades.DARK,
    fontSize: '0.9em',
    height: `${NAVIGATION_BAR_ITEM_HEIGHT}px`,
    marginTop: '10px',
    marginBottom: '10px',
    display: 'flex' as ChakraProps['display'],
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: alignment,
    lineHeight: '1.2em'
  }
}
