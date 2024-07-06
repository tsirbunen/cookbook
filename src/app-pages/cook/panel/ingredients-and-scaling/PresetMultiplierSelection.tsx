import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import CardRadioButtonSelector from '../../../../widgets/card-radio-button-selector/CardRadioButtonSelector'
import { ColorCodes } from '../../../../theme/theme'
import { CardRadioButtonSelectorVariant } from '../../../../widgets/card-radio-button-selector/CardRadioButton'
import { columnItemsCenterCss, rowAllCenterCss, rowItemsCenterContentStartCss } from '../../../../constants/styling'

export const presetMultiplierTestId = 'preset-multiplier'

const X_LABEL = 'X'
const presetValues = [0.5, 1, 1.5, 2, 3, 4, 5]
const presetMultipliers = presetValues.map((value) => ({ label: value.toString(), value }))

type PresetMultiplierSelectionProps = {
  selectPresetMultiplier: (value: number) => void
  presetMultiplier?: number
}

const PresetMultiplierSelection = ({ selectPresetMultiplier, presetMultiplier }: PresetMultiplierSelectionProps) => {
  return (
    <Flex {...containerCss} data-testid={presetMultiplierTestId}>
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
  ...columnItemsCenterCss,
  marginLeft: '15px',
  marginTop: '10px'
}

const xLabelCss = {
  fontWeight: 'bold',
  color: ColorCodes.DARK,
  marginLeft: '10px',
  fontSize: '1.1rem'
}

const selectorCss = {
  ...rowItemsCenterContentStartCss,
  marginTop: '10px',
  flex: 1
}

const shortLineCss = {
  ...columnItemsCenterCss,
  marginRight: '10px',
  marginLeft: '10px',
  backgroundColor: ColorCodes.PALE,
  height: '1.5px',
  width: '50px'
}

const orDividerCss = {
  ...rowAllCenterCss,
  marginTop: '15px',
  marginBottom: '5px',
  fontWeight: 'bold',
  color: ColorCodes.MEDIUM,
  flex: 1
}
