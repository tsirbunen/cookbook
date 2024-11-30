import { Flex, Spinner, Text } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'

const defaultMessage = 'Loading page, please wait...'
type LoadingPageProps = {
  message?: string
}

const LoadingPage = ({ message }: LoadingPageProps) => {
  const color = Shades.DARK

  return (
    <Flex width="100%" height="100vh">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" flex={1}>
        <Text fontSize="1.5em" color={color} fontWeight="bold" marginBottom="20px">
          {message ?? defaultMessage}
        </Text>

        <Spinner thickness="12px" speed="1.5s" emptyColor={Shades.MEDIUM} color={Shades.DARK} size="xl" />
      </Flex>
    </Flex>
  )
}

export default LoadingPage
