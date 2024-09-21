import { Flex, Spinner, Text } from '@chakra-ui/react'
import { ColorCodes } from '../../theme/theme'

const defaultMessage = 'Loading page, please wait...'
type LoadingPageProps = {
  message?: string
}

const LoadingPage = ({ message }: LoadingPageProps) => {
  const color = ColorCodes.DARK

  return (
    <Flex width="100%" height="100vh">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" flex={1}>
        <Text fontSize="1.5em" color={color} fontWeight="bold" marginBottom="20px">
          {message ?? defaultMessage}
        </Text>

        <Spinner thickness="12px" speed="1.5s" emptyColor={ColorCodes.MEDIUM} color={ColorCodes.DARK} size="xl" />
      </Flex>
    </Flex>
  )
}

export default LoadingPage
