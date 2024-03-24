import { extendTheme } from '@chakra-ui/react'
import { checkboxesTheme } from './checkboxes/checkboxes-theme'
import { inputTheme } from './inputs/inputs-theme'
import { buttonsTheme } from './buttons/buttons-theme'
import { textareaTheme } from './textareas/textareas-theme'

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

export const scrollBarWidth = 8

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: ColorCodes.BACKGROUND,
        success: ColorCodes.SUCCESS,
        error: ColorCodes.ERROR,
        overscrollBehavior: 'none',
        // overscrollBehavior: 'contain'
        // NOTE: MDN documents advice to use these, but they do not work so
        // using the webkit-scrollbar instead...
        // https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar
        // scrollbarColor: '#EBE3D5',
        // scrollbarWidth: `${scrollBarWidth}px`,
        '*::-webkit-scrollbar': {
          backgroundColor: '#B0A695', //'#EBE3D5',
          width: `${scrollBarWidth}px`
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#4F4A45', // '#D6CBB8',
          borderRadius: `${scrollBarWidth}px`
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
    Button: buttonsTheme,
    Textarea: textareaTheme
  }
})
