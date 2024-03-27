import { extendTheme } from '@chakra-ui/react'
import { checkboxesTheme } from './checkboxes/checkboxes-theme'
import { inputTheme } from './inputs/inputs-theme'
import { buttonsTheme } from './buttons/buttons-theme'
import { textareaTheme } from './textareas/textareas-theme'
import {
  BACKGROUND_COLOR,
  DARK_COLOR,
  ERROR_COLOR,
  MEDIUM_COLOR,
  PALE_COLOR,
  SLIGHTLY_DARK_COLOR,
  SLIGHTLY_PALE_COLOR,
  SUCCESS_COLOR,
  VERY_DARK_COLOR,
  VERY_PALE_COLOR
} from '../constants/color-codes'

export enum ColorCodes {
  BACKGROUND = BACKGROUND_COLOR,
  VERY_PALE = VERY_PALE_COLOR,
  PALE = PALE_COLOR,
  SLIGHTLY_PALE = SLIGHTLY_PALE_COLOR,
  MEDIUM = MEDIUM_COLOR,
  SLIGHTLY_DARK = SLIGHTLY_DARK_COLOR,
  DARK = DARK_COLOR,
  VERY_DARK = VERY_DARK_COLOR,
  SUCCESS = SUCCESS_COLOR,
  ERROR = ERROR_COLOR
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
