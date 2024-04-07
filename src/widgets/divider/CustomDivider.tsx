import { ChakraProps, Divider, Flex } from '@chakra-ui/react'
import { MEDIUM_COLOR } from '../../constants/color-codes'

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
  borderColor: MEDIUM_COLOR,
  borderWidth: '1.0px',
  variant: 'dashed'
}
