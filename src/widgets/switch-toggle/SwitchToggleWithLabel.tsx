import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { SwitchVariant } from '../../theme/switch/switch-theme'
import SwitchWithTheme from '../../theme/switch/SwitchWithTheme'
import { DARK_COLOR, SLIGHTLY_DARK_COLOR } from '../../constants/color-codes'
import { ChangeEvent } from 'react'

type SwitchToggleWithLabelProps = {
  isChecked: boolean
  onChange: (event?: ChangeEvent<HTMLInputElement>) => void
  labelChecked: string
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
  const labelToDisplay = isChecked ? labelChecked : labelNotChecked ?? labelChecked

  return (
    <Flex {...switchCss}>
      <SwitchWithTheme isChecked={isChecked} onChange={onChange} variant={SwitchVariant.MediumSizeDark} size="md" />
      <Text {...textCss}>{labelToDisplay}</Text>
      {emphasizedLabelChecked && emphasizedLabelNotChecked ? (
        <Text {...emphasizeCss}>{isChecked ? emphasizedLabelChecked : emphasizedLabelNotChecked}</Text>
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
  color: SLIGHTLY_DARK_COLOR,
  fontWeight: 'bold'
}

export const rowCentered = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'center'
}

const emphasizeCss = {
  marginLeft: '10px',
  color: DARK_COLOR,
  fontWeight: '900',
  fontSize: '1.25em'
}
