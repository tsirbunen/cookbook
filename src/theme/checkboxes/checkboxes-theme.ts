import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, CheckboxIcon } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
  control: {
    borderRadius: 6,
    width: '25px',
    height: '25px',
    borderColor: '#4F4A45',
    borderWidth: '3px',
    iconSize: 'xl',
    _checked: {
      color: '#EBE3D5',
      backgroundColor: '#4F4A45',
      borderColor: '#4F4A45',
      icon: CheckboxIcon
    },
    _focus: { outline: 'none', backgroundColor: '#4F4A45', borderColor: '#4F4A45' },
    _hover: { outline: 'none', backgroundColor: '#4F4A45', borderColor: '#4F4A45' }
  }
})

export const checkboxesTheme = defineMultiStyleConfig({ baseStyle })