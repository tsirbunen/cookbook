import { ColorCodes } from '../../theme/theme'
import { ChakraProps, Flex } from '@chakra-ui/react'

export const togglesTestId = 'toggles'

type TogglesProps = {
  children?: JSX.Element | React.ReactNode
  hasBackground: boolean
}

const Toggles = ({ children, hasBackground }: TogglesProps) => {
  return (
    <Flex {...outerBoxCss(hasBackground)} data-testid={togglesTestId}>
      <Flex {...togglesBoxCss}>{children}</Flex>
    </Flex>
  )
}

export default Toggles

const outerBoxCss = (hasBackground: boolean) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'start',
    justifyContent: 'start',
    backgroundColor: hasBackground ? ColorCodes.VERY_PALE : ColorCodes.BACKGROUND,
    padding: '10px',
    borderRadius: '6px'
  }
}

const togglesBoxCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  justifyContent: 'center'
}
