import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

export enum InputVariant {
  Search = 'search'
}

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const search = definePartsStyle({
  field: {
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
  }
})

export const inputTheme = defineMultiStyleConfig({
  variants: { search }
})
