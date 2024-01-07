import { extendTheme } from '@chakra-ui/react'
import { checkboxTheme } from './checkbox-theme'

export enum ColorCodes {
  BACKGROUND = '#F3EEEA',
  VERY_PALE = '#EBE3D5',
  PALE = '#FAEED1',
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
        veryPale: ColorCodes.VERY_PALE,
        pale: ColorCodes.PALE,
        dark: ColorCodes.DARK,
        success: ColorCodes.SUCCESS,
        error: ColorCodes.ERROR
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
    Checkbox: checkboxTheme
  }
})
