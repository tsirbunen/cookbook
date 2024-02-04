import { extendTheme } from '@chakra-ui/react'
import { checkboxesTheme } from './checkboxes/checkboxes-theme'
import { inputTheme } from './inputs/inputs-theme'
import { buttonsTheme } from './buttons/buttons-theme'

export enum ColorCodes {
  BACKGROUND = '#F3EEEA',
  VERY_PALE = '#EBE3D5',
  PALE = '#D6CBB8',
  MEDIUM = '#B0A695',
  DARK = '#776B5D',
  VERY_DARK = '#4F4A45',
  SUCCESS = '#65B741',
  ERROR = '#E36414'
}

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: ColorCodes.BACKGROUND,
        success: ColorCodes.SUCCESS,
        error: ColorCodes.ERROR,
        overscrollBehavior: 'none',
        // overscrollBehavior: 'contain'
        '*::-webkit-scrollbar': {
          backgroundColor: '#EBE3D5',
          width: '12px'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#D6CBB8',
          borderRadius: '8px'
        }
      },
      html: {
        overscrollBehavior: 'none'
      }
    }
  },
  colors: {
    background: ColorCodes.BACKGROUND,
    veryPale: ColorCodes.VERY_PALE,
    pale: ColorCodes.PALE,
    dark: ColorCodes.DARK,
    success: ColorCodes.SUCCESS,
    error: ColorCodes.ERROR
  },

  config: {
    useSystemColorMode: false
  },
  components: {
    Checkbox: checkboxesTheme,
    Input: inputTheme,
    Button: buttonsTheme
  }
})
