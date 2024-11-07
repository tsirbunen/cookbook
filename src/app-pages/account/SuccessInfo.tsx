import { type ChakraProps, Flex, Text } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import { content } from './textContent'

type SuccessInfoProps = {
  info: string
  secondaryInfo?: string
  onClick: () => void
}

const SuccessInfo = ({ info, secondaryInfo, onClick }: SuccessInfoProps) => {
  return (
    <Flex {...innerCss}>
      <Text {...infoCss}>{info}</Text>
      {secondaryInfo ? <Text {...infoCss}>{secondaryInfo}</Text> : null}

      <ButtonWithTheme variant={ButtonVariant.MediumSizePale} onClick={onClick} isToggled={true} isSubmit={false}>
        <Text {...buttonTextNoIconCss}>{content.okGotItLabel}</Text>
      </ButtonWithTheme>
    </Flex>
  )
}

export default SuccessInfo

const innerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start'
}

const infoCss = {
  lineHeight: '1.15em',
  color: Shades.DARK,
  fontWeight: 'bold',
  marginTop: '10px',
  marginBottom: '10px'
}

const buttonTextNoIconCss = {
  color: Shades.VERY_PALE
}
