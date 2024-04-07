import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { DARK_COLOR, MEDIUM_COLOR, PALE_COLOR, VERY_PALE_COLOR } from '../../constants/color-codes'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys)

export enum SwitchVariant {
  MediumSizeDark = 'mediumSizeDark'
}

const mediumSizeDark = definePartsStyle({
  track: {
    backgroundColor: MEDIUM_COLOR,
    borderColor: MEDIUM_COLOR,
    borderWidth: '1.5px',

    _checked: {
      backgroundColor: DARK_COLOR,
      borderColor: DARK_COLOR,
      borderWidth: '1.5px'
    }
  },
  thumb: {
    backgroundColor: PALE_COLOR,
    borderColor: PALE_COLOR,
    _checked: {
      backgroundColor: VERY_PALE_COLOR,
      borderColor: DARK_COLOR
    }
  }
})

export const switchTheme = defineMultiStyleConfig({ variants: { mediumSizeDark } })
