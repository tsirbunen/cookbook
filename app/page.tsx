'use client'
import { Flex, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ColorCodes } from '../src/theme/theme'

export const launchPageDataCy = 'cookbook-launch-page'
export const startButtonDataCy = 'start-button'
export const appTitle = 'COOKBOOK'
const welcomeText = 'Welcome to'
const startPage = '/recipes'
const startText = 'START'

/**
 * This is the content that will be shown when a user visits the app root.
 * This page shows a welcome message and offers a button that directs the user to
 * the recipes page.
 */
export default function Home() {
  const router = useRouter()

  return (
    <Flex marginTop="50px" data-cy={launchPageDataCy} width="100%">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" flex={1}>
        <Text fontSize="1.25em" color={ColorCodes.DARK} marginBottom="10px">
          {welcomeText}
        </Text>
        <Text fontSize="1.75em" color={ColorCodes.DARK} fontWeight="bold" marginBottom="20px">
          {appTitle}
        </Text>

        <Button variant="mediumSizePale" onClick={() => router.push(startPage)} data-cy={startButtonDataCy}>
          {startText}
        </Button>
      </Flex>
    </Flex>
  )
}
