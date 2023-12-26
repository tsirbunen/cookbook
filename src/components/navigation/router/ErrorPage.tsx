import { TbMoodSad } from 'react-icons/tb'
import { Flex, Text } from '@chakra-ui/react'
import { ColorCodes } from '../../../theme/theme'

type ErrorPageProps = {
  message?: string
}

const oopsTitle = 'Oops!'
const defaultMessage = 'Something went wrong...'

const ErrorPage = ({ message }: ErrorPageProps) => {
  const color = ColorCodes.DARK
  const messageToDisplay = message ?? defaultMessage

  return (
    <Flex width="100%" height="100vh">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" flex={1}>
        <Text fontSize="2em" color={color}>
          {oopsTitle}
        </Text>

        <Text fontSize="1em" color={color}>
          {messageToDisplay}
        </Text>

        <Flex padding="20px">
          <TbMoodSad fontSize="3em" color={color} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ErrorPage
