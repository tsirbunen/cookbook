import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import {
  BACKGROUND_COLOR,
  DARK_COLOR,
  MEDIUM_COLOR,
  PALE_COLOR,
  VERY_DARK_COLOR,
  VERY_PALE_COLOR
} from '../../constants/color-codes'

export enum InputVariant {
  Dark = 'dark',
  Pale = 'pale',
  Selected = 'selected'
}

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const dark = definePartsStyle({
  margin: '0px',
  field: {
    border: '2px solid',
    borderColor: DARK_COLOR,
    color: VERY_DARK_COLOR,
    background: PALE_COLOR,
    fontWeight: 'bold',
    borderRadius: '6px',
    _placeholder: { color: MEDIUM_COLOR },
    _focus: {
      border: '3px solid',
      borderColor: DARK_COLOR,
      color: VERY_DARK_COLOR
    },
    _hover: {
      border: '3px solid',
      borderColor: DARK_COLOR,
      color: VERY_DARK_COLOR
    }
  }
})

const pale = definePartsStyle({
  field: {
    border: '2px solid',
    borderColor: PALE_COLOR,
    color: PALE_COLOR,
    background: BACKGROUND_COLOR,
    borderRadius: '6px',
    fontWeight: 'bold',
    _placeholder: { color: PALE_COLOR },
    _focus: {
      border: '3px solid',
      borderColor: DARK_COLOR,
      color: VERY_DARK_COLOR
    },
    _hover: {
      border: '3px solid',
      borderColor: DARK_COLOR,
      color: VERY_DARK_COLOR
    }
  }
})

const selected = definePartsStyle({
  margin: '0px',
  field: {
    border: '2px solid',
    borderColor: VERY_DARK_COLOR,
    color: VERY_PALE_COLOR,
    background: DARK_COLOR,
    fontWeight: 'bold',
    borderRadius: '6px',
    _placeholder: { color: MEDIUM_COLOR },
    _focus: {
      border: '3px solid',
      borderColor: VERY_DARK_COLOR,
      color: VERY_PALE_COLOR
    },
    _hover: {
      border: '3px solid',
      borderColor: VERY_DARK_COLOR,
      color: VERY_PALE_COLOR
    }
  }
})

export const inputTheme = defineMultiStyleConfig({
  variants: { dark, pale, selected }
})
