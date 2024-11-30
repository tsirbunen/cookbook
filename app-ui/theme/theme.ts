import { extendTheme } from '@chakra-ui/react'
import { SCROLL_BAR_WIDTH } from '../constants/layout'
import { Shades } from '../constants/shades'
import { accordionTheme } from './accordion/accordions-theme'
import { buttonsTheme } from './buttons/buttons-theme'
import { checkboxesTheme } from './checkboxes/checkboxes-theme'
import { inputTheme } from './inputs/inputs-theme'
import { switchTheme } from './switch/switch-theme'
import { textareaTheme } from './textareas/textareas-theme'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: Shades.BACKGROUND,
        success: Shades.SUCCESS,
        error: Shades.ERROR,
        overscrollBehavior: 'none',
        // Note: These are to prevent elements turning blue when for example resizing panels
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        UserSelect: 'none',
        // NOTE: MDN documents advice to use scrollbarColor and scrollbarWidth, but they
        // do not work so using the webkit-scrollbar instead...
        // https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar
        '*::-webkit-scrollbar': {
          webkitAppearance: 'none',
          display: 'none'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: Shades.MEDIUM,
          borderRadius: `${SCROLL_BAR_WIDTH}px`,
          webkitAppearance: 'none',
          display: 'none'
        },
        '*::webkitOverflowScrolling': 'none',
        '*::webkitScrollbarThumb': {
          backgroundColor: Shades.MEDIUM,
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
    background: Shades.BACKGROUND,
    veryPale: Shades.VERY_PALE,
    pale: Shades.PALE,
    dark: Shades.DARK,
    success: Shades.SUCCESS,
    error: Shades.ERROR
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
