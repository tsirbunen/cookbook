import { ColorCodes } from '../../../theme/theme'
import { Flex, Text } from '@chakra-ui/react'

type FilteringProps = {
  isMobile: boolean
}

const filteringTitle = 'Filtering'

const Filtering = ({ isMobile }: FilteringProps) => {
  const showTitle = !isMobile

  return (
    <Flex flexDirection="column" margin={`20px 0px 10px 5px`}>
      {showTitle ? (
        <Text fontWeight="bold" color={ColorCodes.VERY_DARK} marginBottom="2px">
          {filteringTitle}
        </Text>
      ) : null}
    </Flex>
  )
}

export default Filtering
