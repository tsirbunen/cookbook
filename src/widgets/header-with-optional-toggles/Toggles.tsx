import { ColorCodes } from '../../theme/theme'
import { ChakraProps, Flex } from '@chakra-ui/react'

type TogglesProps = {
  children?: JSX.Element | React.ReactNode
  isMobile: boolean
}

const Toggles = ({ children, isMobile }: TogglesProps) => {
  return (
    <Flex {...outerBoxCss(isMobile)}>
      <Flex {...togglesBoxCss}>{children}</Flex>
    </Flex>
  )
}

export default Toggles

const outerBoxCss = (isMobile: boolean) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'start',
    justifyContent: isMobile ? 'center' : 'start',
    backgroundColor: ColorCodes.PALE,
    margin: `0px 0px 10px 0px`,
    padding: '10px',
    borderRadius: '6px'
  }
}

const togglesBoxCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  justifyContent: 'center'
}
