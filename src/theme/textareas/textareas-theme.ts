import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { DARK_COLOR, MEDIUM_COLOR, PALE_COLOR, VERY_DARK_COLOR } from '../../constants/color-codes'

export enum TextAreaVariant {
  Search = 'search'
}

const search = defineStyle({
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
})

export const textareaTheme = defineStyleConfig({
  variants: { search }
})
