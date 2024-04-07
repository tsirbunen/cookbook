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
import { SCROLL_BAR_WIDTH } from '../constants/layout'
import { switchTheme } from './switch/switch-theme'
import { accordionTheme } from './accordion/accordions-theme'

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
        // scrollbarColor: VERY_DARK_COLOR,
        // scrollbarWidth: `${SCROLL_BAR_WIDTH}px`,
        '*::-webkit-scrollbar': {
          // backgroundColor: PALE_COLOR,
          // width: `${SCROLL_BAR_WIDTH}px`
          webkitAppearance: 'none',
          display: 'none'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: MEDIUM_COLOR,
          borderRadius: `${SCROLL_BAR_WIDTH}px`,
          webkitAppearance: 'none',
          display: 'none'
        },
        // '*::-webkit-overflow-scrolling': 'none',
        '*::webkitOverflowScrolling': 'none',
        '*::webkitScrollbarThumb': {
          backgroundColor: MEDIUM_COLOR,
          borderRadius: `${SCROLL_BAR_WIDTH}px`,
          webkitAppearance: 'none',
          display: 'none'
        },
        '*::webkitScrollbar': {
          webkitAppearance: 'none',
          display: 'none'
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
    Accordion: accordionTheme,
    Button: buttonsTheme,
    Checkbox: checkboxesTheme,
    Input: inputTheme,
    Switch: switchTheme,
    Textarea: textareaTheme
  }
})
