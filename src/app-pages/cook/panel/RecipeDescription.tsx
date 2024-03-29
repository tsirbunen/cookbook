import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { ColorCodes } from '../../../theme/theme'

type RecipeDescriptionProps = {
  description: string
}

const RecipeDescription = ({ description }: RecipeDescriptionProps) => {
  return (
    <Flex {...containerCss}>
      <Text>{description}</Text>
    </Flex>
  )
}

export default RecipeDescription

const containerCss = {
  textAlign: 'center' as ChakraProps['textAlign'],
  margin: '10px 20px 0px 20px',
  fontWeight: 'semibold',
  color: ColorCodes.MEDIUM
}
