import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, CheckboxIcon } from '@chakra-ui/react'
import { VERY_DARK_COLOR, VERY_PALE_COLOR } from '../../constants/color-codes'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
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
      icon: CheckboxIcon
    },
    _focus: { outline: 'none', backgroundColor: VERY_DARK_COLOR, borderColor: VERY_DARK_COLOR },
    _hover: { outline: 'none', backgroundColor: VERY_DARK_COLOR, borderColor: VERY_DARK_COLOR }
  }
})

export const checkboxesTheme = defineMultiStyleConfig({ baseStyle })
