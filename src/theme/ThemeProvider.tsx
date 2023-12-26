import { ChakraProvider } from '@chakra-ui/provider'
import { theme } from './theme'

function ThemeProvider(props: any) {
  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>
}

export default ThemeProvider
