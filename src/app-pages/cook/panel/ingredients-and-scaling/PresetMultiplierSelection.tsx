import React from 'react'
import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import CardRadioButtonSelector from '../../../../widgets/card-radio-button-selector/CardRadioButtonSelector'
import { ColorCodes } from '../../../../theme/theme'
import { CardRadioButtonSelectorVariant } from '../../../../widgets/card-radio-button-selector/CardRadioButton'

const X_LABEL = 'X'
const presetValues = [0.5, 1, 1.5, 2, 3, 4, 5]
const presetMultipliers = presetValues.map((value) => ({ label: value.toString(), value }))

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
          variant={CardRadioButtonSelectorVariant.PaleNoFill}
        />
        <Text {...xLabelCss}>{X_LABEL}</Text>
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
  alignItems: 'center' as ChakraProps['alignItems'],
  marginTop: '10px'
}

const xLabelCss = {
  fontWeight: 'bold',
  color: ColorCodes.DARK,
  marginLeft: '10px',
  fontSize: '1.1rem'
}

const selectorCss = {
  marginTop: '10px',
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center' as ChakraProps['alignItems'],
  justifyContent: 'start' as ChakraProps['justifyContent'],
  flex: 1
}

const shortLineCss = {
  marginRight: '10px',
  marginLeft: '10px',
  backgroundColor: ColorCodes.PALE,
  height: '1.5px',
  width: '50px',
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'center' as ChakraProps['alignItems']
}

const orDividerCss = {
  marginTop: '15px',
  marginBottom: '5px',
  flexDirection: 'row' as ChakraProps['flexDirection'],
  fontWeight: 'bold',
  color: ColorCodes.MEDIUM,
  flex: 1,
  alignItems: 'center' as ChakraProps['alignItems'],
  justifyContent: 'center' as ChakraProps['justifyContent']
}
