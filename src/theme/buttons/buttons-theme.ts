import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

export enum ButtonVariant {
  SquareWithIcon = 'squareWithIcon',
  MediumSizeDark = 'mediumSizeDark',
  MediumSizePale = 'mediumSizePale',
  SmallDark = 'smallDark'
}

const mediumSizeDark = defineStyle({
  background: '#4F4A45',
  color: '#EBE3D5',
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
    background: '#776B5D',
    color: '#D6CBB8',
    _hover: {
      background: '#776B5D',
      color: '#D6CBB8'
    }
  },
  _hover: {
    _disabled: {
      background: '#776B5D',
      color: '#D6CBB8'
    },
    background: '#776B5D',
    color: '#D6CBB8'
  },
  height: '30px'
})

const mediumSizePale = defineStyle({
  size: 'sm',
  variant: 'solid',
  borderRadius: '4px',
  paddingLeft: '10px',
  paddingRight: '10px',
  bg: '#776B5D',
  color: '#EBE3D5',
  _focus: { outline: 'none' },
  _hover: {
    bg: '#EBE3D5',
    color: '#776B5D'
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
    bg: toggled ? '#4F4A45' : '#B0A695',
    color: toggled ? '#EBE3D5' : '#D6CBB8',
    _focus: { outline: 'none' },
    _hover: {
      bg: toggled ? '#4F4A45' : '#B0A695',
      color: toggled ? '#EBE3D5' : '#D6CBB8',
      _disabled: {
        background: '#776B5D',
        color: '#D6CBB8'
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
    bg: toggled ? '#4F4A45' : '#B0A695',
    color: toggled ? '#EBE3D5' : '#D6CBB8',
    _focus: { outline: 'none' },
    _hover: {
      bg: toggled ? '#776B5D' : '#776B5D',
      color: toggled ? '#D6CBB8' : '#D6CBB8'
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
