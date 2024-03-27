import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { DARK_COLOR, MEDIUM_COLOR, PALE_COLOR, VERY_DARK_COLOR, VERY_PALE_COLOR } from '../../constants/color-codes'

export enum ButtonVariant {
  SquareWithIcon = 'squareWithIcon',
  MediumSizeDark = 'mediumSizeDark',
  MediumSizePale = 'mediumSizePale',
  SmallDark = 'smallDark'
}

const mediumSizeDark = defineStyle({
  background: VERY_DARK_COLOR,
  color: VERY_PALE_COLOR,
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
    background: DARK_COLOR,
    color: PALE_COLOR,
    _hover: {
      background: DARK_COLOR,
      color: PALE_COLOR
    }
  },
  _hover: {
    _disabled: {
      background: DARK_COLOR,
      color: PALE_COLOR
    },
    background: DARK_COLOR,
    color: PALE_COLOR
  },
  height: '30px'
})

const mediumSizePale = defineStyle({
  size: 'sm',
  variant: 'solid',
  borderRadius: '4px',
  paddingLeft: '10px',
  paddingRight: '10px',
  bg: DARK_COLOR,
  color: VERY_PALE_COLOR,
  _focus: { outline: 'none' },
  _hover: {
    bg: VERY_PALE_COLOR,
    color: DARK_COLOR
  },
  height: '30px'
})

const squareWithIcon = (toggled: boolean) => {
  return {
    size: 'xl',
    variant: 'solid',
    borderRadius: '6px',
    fontSize: '1.75em',
    padding: '5px',
    bg: toggled ? VERY_DARK_COLOR : MEDIUM_COLOR,
    color: toggled ? VERY_PALE_COLOR : PALE_COLOR,
    _focus: { outline: 'none' },
    _hover: {
      bg: toggled ? VERY_DARK_COLOR : MEDIUM_COLOR,
      color: toggled ? VERY_PALE_COLOR : PALE_COLOR,
      _disabled: {
        background: DARK_COLOR,
        color: PALE_COLOR
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
    bg: toggled ? VERY_DARK_COLOR : MEDIUM_COLOR,
    color: toggled ? VERY_PALE_COLOR : PALE_COLOR,
    _focus: { outline: 'none' },
    _hover: {
      bg: toggled ? DARK_COLOR : DARK_COLOR,
      color: toggled ? PALE_COLOR : PALE_COLOR
    },
    height: '20px'
  }
}

export const buttonsTheme = defineStyleConfig({
  variants: {
    mediumSizeDark,
    mediumSizePale,
    squareWithIcon: ({ toggled }) => ({
      ...squareWithIcon(toggled)
    }),
    smallDark: ({ toggled }) => ({
      ...smallDark(toggled)
    })
  }
})
