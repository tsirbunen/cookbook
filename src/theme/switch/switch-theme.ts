import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys)

export enum SwitchVariant {
  MediumSizeDark = 'mediumSizeDark'
}

const mediumSizeDark = definePartsStyle({
  track: {
    backgroundColor: Shades.MEDIUM,
    borderColor: Shades.MEDIUM,
    borderWidth: '1.5px',

    _checked: {
      backgroundColor: Shades.DARK,
      borderColor: Shades.DARK,
      borderWidth: '1.5px'
    }
  },
  thumb: {
    backgroundColor: Shades.PALE,
    borderColor: Shades.PALE,
    _checked: {
      backgroundColor: Shades.VERY_PALE,
      borderColor: Shades.DARK
    }
  }
})

export const switchTheme = defineMultiStyleConfig({ variants: { mediumSizeDark } })
