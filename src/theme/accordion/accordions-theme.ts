import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { PALE_COLOR, DARK_COLOR, VERY_PALE_COLOR } from '../../constants/color-codes'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(accordionAnatomy.keys)

const basic = definePartsStyle({
  root: {
    width: '100%'
  },
  panel: {
    borderStyle: 'none'
  },
  button: {
    // background: EXTREMELY_PALE_COLOR,
    // border: 'solid none dashed none',
    borderWidth: '2px 0 0px 0',
    borderColor: VERY_PALE_COLOR,
    _expanded: {
      // borderStyle: 'none'
      borderWidth: '2px 0 0px 0'
    }
  },
  icon: {
    opacity: 1,
    border: 'none',
    background: PALE_COLOR,
    borderRadius: 'full',
    color: DARK_COLOR,
    fontSize: '30px'
  },
  container: {
    borderStyle: 'none'
  }
})

export const accordionTheme = defineMultiStyleConfig({
  variants: { basic }
})
