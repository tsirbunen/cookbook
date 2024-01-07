import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, CheckboxIcon } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
  control: {
    borderRadius: 25,
    width: '25px',
    height: '25px',
    borderColor: '#B0A695',
    backgroundColor: '#B0A695',
    iconSize: 'xl',
    _checked: {
      color: '#EBE3D5',
      backgroundColor: '#B0A695',
      borderColor: '#B0A695',
      icon: CheckboxIcon
    },
    _focus: { outline: 'none' }
  }
})

export const checkboxTheme = defineMultiStyleConfig({ baseStyle })
