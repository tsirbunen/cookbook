import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(accordionAnatomy.keys)

const basic = definePartsStyle({
  root: {
    width: '100%'
  },
  panel: {
    borderStyle: 'none'
  },
  button: {
    borderStyle: 'none none none none'
  },
  icon: {
    opacity: 1,
    border: 'none',
    background: Shades.PALE,
    borderRadius: 'full',
    color: Shades.DARK,
    fontSize: '30px'
  },
  container: {
    borderStyle: 'none'
  }
})

export const accordionTheme = defineMultiStyleConfig({
  variants: { basic }
})
