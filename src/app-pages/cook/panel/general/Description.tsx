import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { ColorCodes } from '../../../../theme/theme'

type DescriptionProps = {
  description: string
}

const Description = ({ description }: DescriptionProps) => {
  return (
    <Flex {...containerCss}>
      <Text>{description}</Text>
    </Flex>
  )
}

export default Description

const containerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'center' as ChakraProps['alignItems'],
  margin: '10px 20px 0px 20px',
  fontWeight: 'semibold',
  color: ColorCodes.MEDIUM
}
