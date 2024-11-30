/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ChakraProvider } from '@chakra-ui/provider'
import { theme } from './theme'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function ThemeProvider(props: any) {
  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>
}

export default ThemeProvider
