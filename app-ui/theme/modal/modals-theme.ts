import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const xxl = definePartsStyle({
  overlay: {
    bg: 'blackAlpha.200'
  },
  dialog: {
    borderRadius: 'md',
    bg: 'orange'
  },
  dialogContainer: {
    width: '1000px'
  }
})

export const modalTheme = defineMultiStyleConfig({
  baseStyle: xxl
})
