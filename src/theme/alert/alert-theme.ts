import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import {
  VERY_DARK_COLOR,
  EXTREMELY_PALE_COLOR,
  ERROR_COLOR,
  SUCCESS_COLOR,
  LOADING_COLOR,
  WARNING_COLOR
} from '../../constants/color-codes'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys)

export enum ToastVariant {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Loading = 'loading'
}

const success = definePartsStyle({
  container: {
    backgroundColor: SUCCESS_COLOR,
    color: VERY_DARK_COLOR
  }
})

const error = definePartsStyle({
  container: {
    backgroundColor: ERROR_COLOR,
    color: EXTREMELY_PALE_COLOR
  }
})

const warning = definePartsStyle({
  container: {
    backgroundColor: WARNING_COLOR,
    color: VERY_DARK_COLOR
  }
})

const loading = definePartsStyle({
  container: {
    backgroundColor: LOADING_COLOR,
    color: EXTREMELY_PALE_COLOR
  }
})

export const alertTheme = defineMultiStyleConfig({ variants: { success, error, warning, loading } })
