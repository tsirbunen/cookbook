import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { PALE_COLOR, VERY_DARK_COLOR, VERY_PALE_COLOR } from '../../constants/color-codes'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const dark = definePartsStyle({
  control: {
    borderRadius: 6,
    width: '25px',
    height: '25px',
    borderColor: VERY_DARK_COLOR,
    borderWidth: '3px',
    iconSize: 'xl',
    _checked: {
      color: VERY_PALE_COLOR,
      backgroundColor: VERY_DARK_COLOR,
      borderColor: VERY_DARK_COLOR,
      _focus: { outline: 'none', backgroundColor: VERY_DARK_COLOR, borderColor: VERY_DARK_COLOR },
      _hover: { outline: 'none', backgroundColor: VERY_DARK_COLOR, borderColor: VERY_DARK_COLOR }
    },
    _focus: { outline: 'none', backgroundColor: VERY_DARK_COLOR, borderColor: VERY_DARK_COLOR },
    _hover: { outline: 'none', backgroundColor: VERY_DARK_COLOR, borderColor: VERY_DARK_COLOR }
  }
})

const pale = definePartsStyle({
  control: {
    borderRadius: 6,
    width: '25px',
    height: '25px',
    borderColor: VERY_DARK_COLOR,
    borderWidth: '3px',
    iconSize: 'xl',
    _checked: {
      background: PALE_COLOR,
      color: VERY_PALE_COLOR,
      borderColor: PALE_COLOR,
      _focus: { outline: 'none', backgroundColor: PALE_COLOR, borderColor: PALE_COLOR }
    },
    _focus: { outline: 'none', backgroundColor: VERY_DARK_COLOR, borderColor: VERY_DARK_COLOR },
    _hover: { outline: 'none', backgroundColor: VERY_DARK_COLOR, borderColor: VERY_DARK_COLOR }
  }
})

export const checkboxesTheme = defineMultiStyleConfig({ variants: { dark, pale } })
