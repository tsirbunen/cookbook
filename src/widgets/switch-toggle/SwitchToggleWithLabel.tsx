import { type ChakraProps, Flex, Text } from '@chakra-ui/react'
import type { ChangeEvent } from 'react'
import { Shades } from '../../constants/shades'
import SwitchWithTheme from '../../theme/switch/SwitchWithTheme'
import { SwitchVariant } from '../../theme/switch/switch-theme'

type SwitchToggleWithLabelProps = {
  isChecked: boolean
  onChange: (event?: ChangeEvent<HTMLInputElement>) => void
  labelChecked?: string
  labelNotChecked?: string
  emphasizedLabelChecked?: string
  emphasizedLabelNotChecked?: string
}

const SwitchToggleWithLabel = ({
  isChecked,
  onChange,
  labelChecked,
  labelNotChecked,
  emphasizedLabelChecked,
  emphasizedLabelNotChecked
}: SwitchToggleWithLabelProps) => {
  const labelToDisplay = isChecked ? labelChecked : labelNotChecked ? labelNotChecked : labelChecked
  const emphasizeLabelCss = labelChecked ? emphasizeBoldCss : emphasizeMildCss

  return (
    <Flex {...switchCss}>
      <SwitchWithTheme isChecked={isChecked} onChange={onChange} variant={SwitchVariant.MediumSizeDark} size="md" />
      {labelToDisplay ? <Text {...textCss}>{labelToDisplay}</Text> : null}
      {emphasizedLabelChecked && emphasizedLabelNotChecked ? (
        <Text {...emphasizeLabelCss}>{isChecked ? emphasizedLabelChecked : emphasizedLabelNotChecked}</Text>
      ) : null}
    </Flex>
  )
}

export default SwitchToggleWithLabel

const switchCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'start',
  marginBottom: '10px'
}
const textCss = {
  marginLeft: '10px',
  color: Shades.SLIGHTLY_DARK,
  fontWeight: 'bold'
}

export const rowCentered = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'center'
}

const emphasizeBoldCss = {
  marginLeft: '10px',
  color: Shades.DARK,
  fontWeight: '900',
  fontSize: '1.25em'
}

const emphasizeMildCss = {
  marginLeft: '10px',
  color: Shades.DARK,
  fontWeight: '800'
  // fontSize: '1.25em'
}
