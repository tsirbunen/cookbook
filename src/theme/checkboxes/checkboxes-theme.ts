import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const dark = definePartsStyle({
  control: {
    borderRadius: 6,
    width: '25px',
    height: '25px',
    borderColor: Shades.VERY_DARK,
    borderWidth: '3px',
    iconSize: 'xl',
    _checked: {
      color: Shades.VERY_PALE,
      backgroundColor: Shades.VERY_DARK,
      borderColor: Shades.VERY_DARK,
      _focus: { outline: 'none', backgroundColor: Shades.VERY_DARK, borderColor: Shades.VERY_DARK },
      _hover: { outline: 'none', backgroundColor: Shades.VERY_DARK, borderColor: Shades.VERY_DARK }
    },
    _focus: { outline: 'none', backgroundColor: Shades.VERY_DARK, borderColor: Shades.VERY_DARK },
    _hover: { outline: 'none', backgroundColor: Shades.VERY_DARK, borderColor: Shades.VERY_DARK }
  }
})

const pale = definePartsStyle({
  control: {
    borderRadius: 6,
    width: '25px',
    height: '25px',
    borderColor: Shades.VERY_DARK,
    borderWidth: '3px',
    iconSize: 'xl',
    _checked: {
      background: Shades.PALE,
      color: Shades.VERY_PALE,
      borderColor: Shades.PALE,
      _focus: { outline: 'none', backgroundColor: Shades.PALE, borderColor: Shades.PALE }
    },
    _focus: { outline: 'none', backgroundColor: Shades.VERY_DARK, borderColor: Shades.VERY_DARK },
    _hover: { outline: 'none', backgroundColor: Shades.VERY_DARK, borderColor: Shades.VERY_DARK }
  }
})

export const checkboxesTheme = defineMultiStyleConfig({ variants: { dark, pale } })
