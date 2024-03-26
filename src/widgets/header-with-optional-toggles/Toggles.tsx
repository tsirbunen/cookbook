import { ColorCodes } from '../../theme/theme'
import { ChakraProps, Flex } from '@chakra-ui/react'

export const togglesTestId = 'toggles'

type TogglesProps = {
  children?: JSX.Element | React.ReactNode
}

const Toggles = ({ children }: TogglesProps) => {
  return (
    <Flex {...outerBoxCss} data-testid={togglesTestId}>
      <Flex {...togglesBoxCss}>{children}</Flex>
    </Flex>
  )
}

export default Toggles

const outerBoxCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start',
  backgroundColor: ColorCodes.PALE,
  margin: `0px 0px 10px 0px`,
  padding: '10px',
  borderRadius: '6px'
}

const togglesBoxCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  justifyContent: 'center'
}
