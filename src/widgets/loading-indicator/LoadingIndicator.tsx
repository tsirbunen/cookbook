import { Flex, Spinner, Text } from '@chakra-ui/react'
import { ColorCodes } from '../../theme/theme'

type LoadingIndicatorProps = {
  message: string
}

const LoadingIndicator = ({ message }: LoadingIndicatorProps) => {
  const color = ColorCodes.MEDIUM

  return (
    <Flex width="100%" marginTop="30px">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" flex={1}>
        <Text fontSize="1.25em" color={color} fontWeight="bold" marginBottom="20px">
          {message}
        </Text>

        <Spinner thickness="8px" speed="1.5s" emptyColor={ColorCodes.MEDIUM} color={ColorCodes.DARK} size="xl" />
      </Flex>
    </Flex>
  )
}

export default LoadingIndicator
