import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { DARK_COLOR, MEDIUM_COLOR, PALE_COLOR, VERY_DARK_COLOR } from '../../constants/color-codes'

export enum InputVariant {
  Search = 'search'
}

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const search = definePartsStyle({
  field: {
    border: '2px solid',
    borderColor: DARK_COLOR,
    color: VERY_DARK_COLOR,
    background: PALE_COLOR,
    borderRadius: '6px',
    _placeholder: { color: MEDIUM_COLOR },
    _focus: {
      border: '2px solid',
      borderColor: MEDIUM_COLOR,
      color: VERY_DARK_COLOR
    },
    _hover: {
      border: '2px solid',
      borderColor: MEDIUM_COLOR,
      color: VERY_DARK_COLOR
    }
  }
})

export const inputTheme = defineMultiStyleConfig({
  variants: { search }
})
