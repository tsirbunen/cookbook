// import { extendBaseTheme } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
// import { dividerTheme } from './dividerTheme'

// export enum ColorCodes {
//   BACKGROUND = '#FAEED1',
//   VERY_DARK = '#4F4A45', //'#191717
//   DARK = '#607274',
//   VERY_PALE = '#DED0B6',
//   PALE = '#B2A59B',
//   SUCCESS = '#65B741',
//   ERROR = '#E36414'
// }

// export enum ColorCodes {
//   BACKGROUND = '#F3EEEA',
//   VERY_DARK = '#191717',
//   DARK = '#776B5D',
//   VERY_PALE = '#EBE3D5',
//   PALE = '#B0A695',
//   SUCCESS = '#65B741',
//   ERROR = '#E36414'
// }

export enum ColorCodes {
  BACKGROUND = '#F3EEEA',
  VERY_PALE = '#EBE3D5',
  PALE = '#FAEED1',
  MEDIUM = '#B0A695',
  DARK = '#776B5D',
  VERY_DARK = '#4F4A45', //'#191717
  SUCCESS = '#65B741',
  ERROR = '#E36414'
}

// export const theme = extendBaseTheme({
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
    // Divider: dividerTheme
  }
})
