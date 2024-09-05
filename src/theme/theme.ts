import { extendTheme } from '@chakra-ui/react'
import { checkboxesTheme } from './checkboxes/checkboxes-theme'
import { inputTheme } from './inputs/inputs-theme'
import { buttonsTheme } from './buttons/buttons-theme'
import { textareaTheme } from './textareas/textareas-theme'

import { SCROLL_BAR_WIDTH } from '../constants/layout'
import { switchTheme } from './switch/switch-theme'
import { accordionTheme } from './accordion/accordions-theme'

// FIXME: Why importing these from constants does not work? See the comment below.
export const BACKGROUND_COLOR = '#E5E5E5'
export const EXTREMELY_PALE_COLOR = '#DEDDD9'
export const VERY_PALE_COLOR = '#c7c6c1'
export const PALE_COLOR = '#afada9'
export const SLIGHTLY_PALE_COLOR = '#9C9C9C'
export const MEDIUM_COLOR = '#8e8d8c'
export const MEDIUM_RBG = 'rgb(142, 141, 140)'
export const SLIGHTLY_DARK_COLOR = '#7F7F7F'
export const DARK_COLOR = '#474747'
export const DARK_COLOR_RGB = 'rgb(156, 156, 156)'
export const VERY_DARK_COLOR = '#282928'
export const VERY_DARK_RGB = 'rgb(40, 41, 40)'
export const SUCCESS_COLOR = '#65B741'
export const ERROR_COLOR = '#D62904'
export const LOADING_COLOR = '#0066ff'
export const WARNING_COLOR = '#ff9900'

// FIXME: There is some issue here: for example, 'ColorCodes.BACKGROUND' has
// a string type, but must have syntactically recognizable string syntax
// when 'isolatedModules' is enabled.
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
        // Note: These are to prevent elements turning blue when for example resizing panels
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        UserSelect: 'none',
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
        },
        overflow: 'hidden'
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
    // Alert: {
    //   variants: {
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     subtle: (props: any) => {
    //       // only applies to `subtle` variant
    //       // subtle: (props: any) => { // only applies to `subtle` variant
    //       // const { colorScheme: c } = props
    //       // if (c !== 'blue') {
    //       //   // use original definition for all color schemes except "blue"
    //       //   return props.origTheme.components.Alert.variants.subtle(props)
    //       // }
    //       return {
    //         container: {
    //           bg: 'purple' // `${c}.500` // or literal color, e.g. "#0984ff"
    //         }
    //       }
    //     }
    //   }
    // }
    // Alert: {
    //   variants: {
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     'left-accent': (props: any) => {
    //       const { status } = props
    //       return {
    //         container: {
    //           ...theme.components.Alert.variants?.['left-accent'](props).container,
    //           bg: 'orange' // `${status}.300`
    //         }
    //       }
    //     }
    //   }
    // }
  }
})
