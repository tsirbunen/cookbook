'use client'

import { Flex, Text, Button, ChakraProps } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ColorCodes } from '../src/theme/theme'

export const launchPageDataTestId = 'cookbook-launch-page'
export const startButtonDataTestId = 'start-button'
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
    <Flex {...outerCss} data-testid={launchPageDataTestId}>
      <Flex {...innerCss}>
        <Text {...welcomeCss}>{welcomeText}</Text>
        <Text {...titleCss}>{appTitle}</Text>

        <Button variant="mediumSizePale" onClick={() => router.push(startPage)} data-testid={startButtonDataTestId}>
          {startText}
        </Button>
      </Flex>
    </Flex>
  )
}

const outerCss = {
  marginTop: '50px',
  width: '100%'
}

const innerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1
}

const welcomeCss = {
  fontSize: '1.25em',
  color: ColorCodes.DARK,
  marginBottom: '10px'
}

const titleCss = {
  fontSize: '1.75em',
  color: ColorCodes.DARK,
  fontWeight: 'bold',
  marginBottom: '20px'
}
