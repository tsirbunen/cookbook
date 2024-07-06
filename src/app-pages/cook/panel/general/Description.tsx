import { Flex, Text } from '@chakra-ui/react'
import { ColorCodes } from '../../../../theme/theme'
import { columnItemsCenterCss } from '../../../../constants/styling'

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
  ...columnItemsCenterCss,
  margin: '10px 20px 0px 20px',
  fontWeight: 'semibold',
  color: ColorCodes.MEDIUM
}
