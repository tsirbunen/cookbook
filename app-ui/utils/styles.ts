import type { ChakraProps, Placement } from '@chakra-ui/react'
import { HEADER_HEIGHT } from '../constants/layout'
import { Shades } from '../constants/shades'

export const rowCentered = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'center'
}

export const errorCss = {
  color: Shades.ERROR,
  fontSize: '0.8em',
  lineHeight: '1.0em',
  marginTop: '3px'
}

export const dividerCss = {
  marginTop: '2px',
  marginBottom: '2px',
  borderColor: Shades.MEDIUM,
  borderWidth: '1.0px',
  variant: 'dashed'
}

export const pageCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  marginTop: `${HEADER_HEIGHT}px`,
  marginLeft: '25px',
  marginRight: '25px',
  width: '100%',
  maxWidth: '600px'
}

export const pageInfoCss = {
  lineHeight: '1.1em',
  color: Shades.SLIGHTLY_DARK,
  marginBottom: '5px',
  marginTop: '10px'
}

export const outerColumnCss = (marginTop = 20, marginBottom = 20) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'start',
    justifyContent: 'start',
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    width: '100%',
    flex: 1
  }
}

export const tooltipCss = {
  backgroundColor: Shades.VERY_DARK,
  placement: 'bottom' as Placement
}
