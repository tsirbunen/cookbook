import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { DARK_COLOR, VERY_PALE_COLOR } from '../../constants/color-codes'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { content } from './textContent'

type SuccessInfoProps = {
  info: string
  onClick: () => void
}

// FIXME: Implement different ways to create an account, for example, using GitHub of Facebook account.
const SuccessInfo = ({ info, onClick }: SuccessInfoProps) => {
  return (
    <Flex {...innerCss}>
      <Text {...infoCss}>{info}</Text>
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
  color: DARK_COLOR,
  fontWeight: 'bold',
  marginTop: '10px',
  marginBottom: '10px'
}

const buttonTextNoIconCss = {
  color: VERY_PALE_COLOR
}
