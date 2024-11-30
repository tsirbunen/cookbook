import { type ChakraProps, Divider, Flex } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'

type CustomDividerProps = {
  marginTop?: string
  marginBottom?: string
}
const CustomDivider = ({ marginTop, marginBottom }: CustomDividerProps) => {
  return (
    <Flex {...dividerContainerCss(marginTop, marginBottom)}>
      <Divider {...dividerCss} />
    </Flex>
  )
}

export default CustomDivider

const dividerContainerCss = (marginTop?: string, marginBottom?: string) => {
  return {
    flexDirection: 'row' as ChakraProps['flexDirection'],
    marginTop: marginTop ? marginTop : '0px',
    marginBottom: marginBottom ? marginBottom : '10px',
    width: '100%'
  }
}

const dividerCss = {
  borderColor: Shades.MEDIUM,
  borderWidth: '1.0px',
  variant: 'dashed'
}
