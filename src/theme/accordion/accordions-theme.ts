import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { DARK_COLOR, PALE_COLOR, VERY_DARK_COLOR, VERY_PALE_COLOR } from '../../constants/color-codes'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(accordionAnatomy.keys)

const basic = definePartsStyle({
  root: {
    width: '100%'
  },
  panel: {
    borderStyle: 'none'
  },
  button: {
    border: 'none none dashed none',
    borderWidth: '0 0 2px 0',
    borderColor: PALE_COLOR,
    _expanded: { background: VERY_PALE_COLOR, color: DARK_COLOR, borderStyle: 'none' }
  },
  icon: {
    border: 'none',
    background: VERY_DARK_COLOR,
    borderRadius: 'full',
    color: VERY_PALE_COLOR,
    fontSize: '30px'
  },
  container: {
    borderStyle: 'none'
  }
})

export const accordionTheme = defineMultiStyleConfig({
  variants: { basic }
})
