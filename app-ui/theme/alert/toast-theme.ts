import { extendTheme } from '@chakra-ui/react'
import { alertTheme } from './alert-theme'

export const toastTheme = extendTheme({
  config: {
    useSystemColorMode: false
  },
  components: {
    Alert: alertTheme
  }
})
