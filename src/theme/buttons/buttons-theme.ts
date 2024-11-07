import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'

export enum ButtonVariant {
  SquareWithIcon = 'squareWithIcon',
  SquareWithIconWithoutFill = 'squareWithIconWithoutFill',
  HeaderToggle = 'headerToggle',
  MediumSizeDark = 'mediumSizeDark',
  MediumSizePale = 'mediumSizePale',
  LargeDark = 'largeDark',
  SmallDark = 'smallDark',
  DeleteLarge = 'deleteLarge',
  Pale = 'pale'
}

const mediumSizeDark = defineStyle({
  background: Shades.VERY_DARK,
  color: Shades.VERY_PALE,
  fontSize: '1em',
  variant: 'unstyled',
  borderRadius: '6px',
  padding: '10px',
  paddingTop: '0px',
  paddingBottom: '0px',
  marginRight: '5px',
  marginTop: '5px',
  _focus: { outline: 'none' },
  _disabled: {
    background: Shades.DARK,
    color: Shades.PALE,
    _hover: {
      background: Shades.DARK,
      color: Shades.PALE
    }
  },
  _hover: {
    _disabled: {
      background: Shades.DARK,
      color: Shades.PALE
    },
    background: Shades.DARK,
    color: Shades.PALE
  },
  height: '30px'
})

const mediumSizePale = defineStyle({
  size: 'sm',
  variant: 'solid',
  borderRadius: '4px',
  paddingLeft: '10px',
  paddingRight: '10px',
  bg: Shades.DARK,
  color: Shades.VERY_PALE,
  _focus: { outline: 'none' },
  _hover: {
    bg: Shades.VERY_PALE,
    color: Shades.DARK
  },
  height: '30px'
})

const pale = defineStyle({
  size: 'sm',
  variant: 'solid',
  borderRadius: '4px',
  paddingLeft: '10px',
  paddingRight: '10px',
  bg: Shades.PALE,
  color: Shades.DARK,
  _focus: { outline: 'none' },
  _hover: {
    bg: Shades.DARK,
    color: Shades.PALE
  },
  height: '30px'
})

const largeDark = defineStyle({
  size: 'md',
  variant: 'solid',
  borderRadius: '4px',
  paddingLeft: '15px',
  paddingRight: '15px',
  bg: Shades.DARK,
  color: Shades.EXTREMELY_PALE,
  _focus: { outline: 'none' },
  _hover: {
    bg: Shades.EXTREMELY_PALE,
    color: Shades.DARK
  },
  height: '40px'
})

const deleteLarge = defineStyle({
  size: 'md',
  variant: 'solid',
  borderRadius: '4px',
  paddingLeft: '15px',
  paddingRight: '15px',
  bg: Shades.ERROR,
  color: Shades.EXTREMELY_PALE,
  _focus: { outline: 'none' },
  _hover: {
    bg: Shades.EXTREMELY_PALE,
    color: Shades.ERROR
  },
  height: '40px'
})

const squareWithIcon = (toggled: boolean) => {
  return {
    size: 'xl',
    variant: 'solid',
    borderRadius: '6px',
    fontSize: '1.75em',
    padding: '5px',
    bg: toggled ? Shades.VERY_DARK : Shades.SLIGHTLY_DARK,
    color: toggled ? Shades.VERY_PALE : Shades.PALE,
    _focus: { outline: 'none' },
    _hover: {
      bg: toggled ? Shades.VERY_DARK : Shades.DARK,
      color: toggled ? Shades.VERY_PALE : Shades.PALE,
      _disabled: {
        background: Shades.DARK,
        color: Shades.PALE
      }
    }
  }
}

const squareWithIconWithoutFill = (toggled: boolean) => {
  return {
    size: 'xl',
    variant: 'solid',
    borderRadius: '6px',
    height: '30px',
    fontSize: '1.75em',
    color: toggled ? Shades.VERY_DARK : Shades.MEDIUM,
    _focus: { outline: 'none' },
    _hover: {
      bg: Shades.PALE,
      color: toggled ? Shades.VERY_DARK : Shades.VERY_DARK,
      _disabled: {
        color: Shades.PALE
      }
    }
  }
}

const headerToggle = (toggled: boolean) => {
  return {
    size: 'xl',
    variant: 'solid',
    borderRadius: '6px',
    fontSize: '1.75em',
    padding: '5px',
    bg: toggled ? Shades.VERY_PALE : Shades.VERY_DARK,
    color: toggled ? Shades.VERY_DARK : Shades.VERY_PALE,
    _focus: { outline: 'none' },
    _hover: {
      bg: Shades.MEDIUM,
      color: toggled ? Shades.VERY_DARK : Shades.VERY_DARK,
      _disabled: {
        background: Shades.VERY_DARK,
        color: Shades.PALE
      }
    }
  }
}

const smallDark = (toggled: boolean) => {
  return {
    size: 'xl',
    fontSize: '0.9em',
    variant: 'solid',
    borderRadius: '6px',
    padding: '5px',
    paddingTop: '1px',
    paddingBottom: '1px',
    marginRight: '5px',
    marginTop: '5px',
    bg: toggled ? Shades.VERY_DARK : Shades.MEDIUM,
    color: toggled ? Shades.VERY_PALE : Shades.PALE,
    _focus: { outline: 'none' },
    _hover: {
      bg: Shades.DARK,
      color: Shades.PALE
    },
    height: '20px'
  }
}

export const buttonsTheme = defineStyleConfig({
  variants: {
    mediumSizeDark,
    mediumSizePale,
    largeDark,
    deleteLarge,
    pale,
    squareWithIcon: ({ toggled }) => ({
      ...squareWithIcon(toggled)
    }),
    squareWithIconWithoutFill: ({ toggled }) => ({
      ...squareWithIconWithoutFill(toggled)
    }),
    headerToggle: ({ toggled }) => ({
      ...headerToggle(toggled)
    }),
    smallDark: ({ toggled }) => ({
      ...smallDark(toggled)
    })
  }
})
