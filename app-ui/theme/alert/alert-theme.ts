import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys)

export enum ToastVariant {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Loading = 'loading'
}

const success = definePartsStyle({
  container: {
    backgroundColor: Shades.SUCCESS,
    color: Shades.VERY_DARK
  }
})

const error = definePartsStyle({
  container: {
    backgroundColor: Shades.ERROR,
    color: Shades.EXTREMELY_PALE
  }
})

const warning = definePartsStyle({
  container: {
    backgroundColor: Shades.WARNING,
    color: Shades.VERY_DARK
  }
})

const loading = definePartsStyle({
  container: {
    backgroundColor: Shades.LOADING,
    color: Shades.EXTREMELY_PALE
  }
})

export const alertTheme = defineMultiStyleConfig({ variants: { success, error, warning, loading } })
