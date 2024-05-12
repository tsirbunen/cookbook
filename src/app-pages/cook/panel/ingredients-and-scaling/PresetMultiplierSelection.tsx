import React from 'react'
import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import CardRadioButtonSelector from '../../../../widgets/card-radio-button-selector/CardRadioButtonSelector'
import { ColorCodes } from '../../../../theme/theme'

const MULTIPLIER_FONT_SIZE = '1.1rem'
const presetValues = ['0.5 X', '1 X', '1.5 X', '2 X', '3 X', '4 X', '5 X']
const presetMultipliers = presetValues.map((value) => ({ label: value, value: parseFloat(value.replace(' X', '')) }))

type PresetMultiplierSelectionProps = {
  selectPresetMultiplier: (value: number) => void
  presetMultiplier?: number
}

const PresetMultiplierSelection = ({ selectPresetMultiplier, presetMultiplier }: PresetMultiplierSelectionProps) => {
  return (
    <Flex {...containerCss}>
      <Flex {...selectorCss}>
        <CardRadioButtonSelector
          options={presetMultipliers}
          selectValue={selectPresetMultiplier}
          currentValue={presetMultiplier}
          noMargin
          fontSize={MULTIPLIER_FONT_SIZE}
        />
      </Flex>

      <Flex {...orDividerCss}>
        <Flex {...shortLineCss} />
        <Text>OR</Text>
        <Flex {...shortLineCss} />
      </Flex>
    </Flex>
  )
}

export default PresetMultiplierSelection

const containerCss = {
  marginLeft: '15px',
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'center' as ChakraProps['alignItems']
}

const selectorCss = {
  marginTop: '10px',
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center' as ChakraProps['alignItems'],
  justifyContent: 'start' as ChakraProps['justifyContent'],
  flex: 1
}

const shortLineCss = {
  marginRight: '15px',
  marginLeft: '15px',
  backgroundColor: ColorCodes.MEDIUM,
  height: '1.5px',
  width: '100px',
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'center' as ChakraProps['alignItems']
}

const orDividerCss = {
  marginTop: '10px',
  flexDirection: 'row' as ChakraProps['flexDirection'],
  fontWeight: 'bold',
  color: ColorCodes.DARK,
  flex: 1,
  alignItems: 'center' as ChakraProps['alignItems'],
  justifyContent: 'center' as ChakraProps['justifyContent']
}
