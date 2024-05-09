import React from 'react'
import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import CardRadioButtonSelector from '../../../../widgets/card-radio-button-selector/CardRadioButtonSelector'

const PRESET_INFO = 'Either multiply all by a preset value'
const INGREDIENT_AS_BASE_INFO = 'Or specify an amount of an ingredient to use as the scaling base'
const X_LABEL = 'X'
const MULTIPLIER_FONT_SIZE = '1.1rem'

const presetValues = [0.5, 1, 1.5, 2, 3, 4]
const presetMultipliers = presetValues.map((value) => ({ label: value.toString(), value }))

type PresetMultiplierSelectionProps = {
  selectPresetMultiplier: (value: number) => void
  presetMultiplier?: number
}

const PresetMultiplierSelection = ({ selectPresetMultiplier, presetMultiplier }: PresetMultiplierSelectionProps) => {
  return (
    <Flex {...containerCss}>
      <Flex {...presetInfoCss}>
        <Text>{PRESET_INFO}</Text>
      </Flex>
      <Flex {...selectorCss}>
        <CardRadioButtonSelector
          options={presetMultipliers}
          selectValue={selectPresetMultiplier}
          currentValue={presetMultiplier}
          noMargin
          fontSize={MULTIPLIER_FONT_SIZE}
        />
        <Flex {...xLabelCss}>
          <Text>{X_LABEL}</Text>
        </Flex>
      </Flex>

      <Flex {...ingredientAsBaseInfoCss}>
        <Text>{INGREDIENT_AS_BASE_INFO}</Text>
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
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center' as ChakraProps['alignItems'],
  justifyContent: 'start' as ChakraProps['justifyContent'],
  flex: 1
}

const xLabelCss = {
  marginLeft: '10px',
  fontWeight: 'bold',
  fontSize: '1.35rem'
}

const presetInfoCss = {
  fontWeight: 'semibold',
  marginRight: '10px',
  marginBottom: '10px',
  marginTop: '10px'
}

const ingredientAsBaseInfoCss = {
  fontWeight: 'semibold',
  marginRight: '10px',
  marginTop: '30px'
}
