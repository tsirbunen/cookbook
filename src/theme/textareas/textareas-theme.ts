import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

export enum TextAreaVariant {
  Search = 'search'
}

const search = defineStyle({
  border: '2px solid',
  borderColor: '#776B5D',
  color: '#4F4A45',
  background: '#D6CBB8',
  borderRadius: '6px',
  _placeholder: { color: '#B0A695' },
  _focus: {
    border: '2px solid',
    borderColor: '#B0A695',
    color: '#4F4A45'
  },
  _hover: {
    border: '2px solid',
    borderColor: '#B0A695',
    color: '#4F4A45'
  }
})

export const textareaTheme = defineStyleConfig({
  variants: { search }
})
