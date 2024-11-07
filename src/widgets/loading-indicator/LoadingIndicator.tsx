import { Flex, Spinner, Text } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'

type LoadingIndicatorProps = {
  message: string
}

const LoadingIndicator = ({ message }: LoadingIndicatorProps) => {
  const color = Shades.MEDIUM

  return (
    <Flex width="100%" marginTop="30px">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" flex={1}>
        <Text fontSize="1.25em" color={color} fontWeight="bold" marginBottom="20px">
          {message}
        </Text>

        <Spinner thickness="8px" speed="1.5s" emptyColor={Shades.MEDIUM} color={Shades.DARK} size="xl" />
      </Flex>
    </Flex>
  )
}

export default LoadingIndicator
