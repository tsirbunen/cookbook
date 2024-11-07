import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'

export enum InputVariant {
  Dark = 'dark',
  Pale = 'pale',
  Selected = 'selected',
  Hover = 'hover',
  HoverSmall = 'hover-small'
}

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const dark = definePartsStyle({
  margin: '0px',
  field: {
    border: '1.5px solid',
    borderColor: Shades.DARK,
    color: Shades.VERY_DARK,
    background: Shades.PALE,
    fontWeight: 'bold',
    borderRadius: '6px',
    _placeholder: { color: Shades.SLIGHTLY_DARK, fontWeight: 'medium', fontStyle: 'italic' },
    _focus: {
      border: '3px solid',
      borderColor: Shades.DARK,
      color: Shades.VERY_DARK
    },
    _hover: {
      border: '3px solid',
      borderColor: Shades.DARK,
      color: Shades.VERY_DARK
    }
  }
})

const hover = definePartsStyle({
  margin: '0px',
  field: {
    borderColor: Shades.DARK,
    color: Shades.VERY_DARK,
    background: Shades.EXTREMELY_PALE,
    fontWeight: 'bold',
    borderRadius: '6px',
    _placeholder: { color: Shades.SLIGHTLY_DARK, fontWeight: 'medium', fontStyle: 'italic' },
    _focus: {
      border: '2px solid',
      borderColor: Shades.DARK,
      background: Shades.VERY_PALE,
      color: Shades.VERY_DARK
    },
    _hover: {
      border: '2px solid',
      borderColor: Shades.DARK,
      background: Shades.VERY_PALE,
      color: Shades.VERY_DARK
    }
  }
})

const hoverSmall = definePartsStyle({
  margin: '0px',
  field: {
    borderColor: Shades.DARK,
    color: Shades.VERY_DARK,
    background: Shades.EXTREMELY_PALE,
    fontWeight: 'bold',
    borderRadius: '6px',
    _placeholder: { color: Shades.SLIGHTLY_DARK, fontWeight: 'medium', fontStyle: 'italic' },
    _focus: {
      border: '2px solid',
      borderColor: Shades.DARK,
      background: Shades.VERY_PALE,
      color: Shades.VERY_DARK
    },
    _hover: {
      border: '2px solid',
      borderColor: Shades.DARK,
      background: Shades.VERY_PALE,
      color: Shades.VERY_DARK
    }
  }
})

const pale = definePartsStyle({
  field: {
    border: '1.5px solid',
    borderColor: Shades.PALE,
    color: Shades.PALE,
    background: Shades.BACKGROUND,
    borderRadius: '6px',
    fontWeight: 'bold',
    _placeholder: { color: Shades.PALE },
    _focus: {
      border: '3px solid',
      borderColor: Shades.DARK,
      color: Shades.VERY_DARK
    },
    _hover: {
      border: '3px solid',
      borderColor: Shades.DARK,
      color: Shades.VERY_DARK
    }
  }
})

const selected = definePartsStyle({
  margin: '0px',
  field: {
    border: '2px solid',
    borderColor: Shades.VERY_DARK,
    color: Shades.VERY_PALE,
    background: Shades.DARK,
    fontWeight: 'bold',
    borderRadius: '6px',
    _placeholder: { color: Shades.MEDIUM },
    _focus: {
      border: '3px solid',
      borderColor: Shades.VERY_DARK,
      color: Shades.VERY_PALE
    },
    _hover: {
      border: '3px solid',
      borderColor: Shades.VERY_DARK,
      color: Shades.VERY_PALE
    }
  }
})

export const inputTheme = defineMultiStyleConfig({
  variants: { dark, pale, selected, hover, hoverSmall }
})
