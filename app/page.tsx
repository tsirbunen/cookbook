'use client'

import { Button, type ChakraProps, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import AppIntro from '../src/app-pages/home/AppIntro'
import { Shades } from '../src/constants/shades'
import { APP_TITLE } from '../src/constants/text-content'

export const launchPageTestId = 'cookbook-launch-page'
export const startButtonTestId = 'start-button'

const welcomeText = 'Welcome to the'
const startPage = '/home'
const startText = 'START'

/**
 * This is the content that will be shown when a user visits the app root.
 * This page shows a welcome message and offers a button that directs the user to
 * the recipes page.
 */
export default function Home() {
  const router = useRouter()

  const startUsingApp = () => {
    router.push(startPage)
  }

  return (
    <Flex {...outerCss} data-testid={launchPageTestId}>
      <Flex {...innerCss}>
        <Text {...welcomeCss}>{welcomeText}</Text>
        <Text {...titleCss}>{APP_TITLE}</Text>
        <Flex {...introCss}>
          <AppIntro alignment="center" />
        </Flex>

        <Button variant="mediumSizePale" onClick={startUsingApp} data-testid={startButtonTestId}>
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
  color: Shades.DARK,
  marginBottom: '10px'
}

const introCss = {
  width: '450px',
  textAlign: 'center' as ChakraProps['textAlign'],
  marginBottom: '20px'
}

const titleCss = {
  fontSize: '1.75em',
  color: Shades.DARK,
  fontWeight: '900'
}
