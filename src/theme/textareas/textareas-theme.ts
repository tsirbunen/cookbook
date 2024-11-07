import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'

export enum TextAreaVariant {
  Search = 'search'
}

const search = defineStyle({
  border: '2px solid',
  borderColor: Shades.DARK,
  color: Shades.VERY_DARK,
  background: Shades.PALE,
  borderRadius: '6px',
  _placeholder: { color: Shades.MEDIUM },
  _focus: {
    border: '2px solid',
    borderColor: Shades.MEDIUM,
    color: Shades.VERY_DARK
  },
  _hover: {
    border: '2px solid',
    borderColor: Shades.MEDIUM,
    color: Shades.VERY_DARK
  }
})

export const textareaTheme = defineStyleConfig({
  variants: { search }
})
