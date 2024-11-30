import { type ChakraProps, Flex, Text } from '@chakra-ui/react'
import { Fragment } from 'react'
import { Shades } from '../../constants/shades'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import TitleWithSpacing from './TitleWithSpacing'

type AccountRouteSelectorProps = {
  info: string
  buttonLabel: string
  performAction: () => void
  title: string
  buttonVariant?: ButtonVariant
  children?: React.ReactNode
  hideButton?: boolean
}

const AccountRouteSelector = ({
  info,
  buttonLabel,
  performAction,
  buttonVariant,
  children,
  hideButton,
  title
}: AccountRouteSelectorProps) => {
  return (
    <Fragment>
      <TitleWithSpacing title={title} />
      <Flex {...outerCss}>
        <Flex {...optionContainerCss}>
          <Text {...optionTextCss}>{info}</Text>
          {children ?? null}
          {!hideButton ? (
            <Flex {...buttonsBoxClosedCss}>
              <ButtonWithTheme
                variant={buttonVariant ?? ButtonVariant.LargeDark}
                onClick={performAction}
                isToggled={true}
              >
                <Text>{buttonLabel}</Text>
              </ButtonWithTheme>
            </Flex>
          ) : null}
        </Flex>
      </Flex>
    </Fragment>
  )
}

export default AccountRouteSelector

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start',
  marginBottom: '5px'
}

const optionContainerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start',
  width: '100%'
}

const optionTextCss = {
  lineHeight: '1.1em',
  color: Shades.SLIGHTLY_DARK,
  marginBottom: '15px',
  marginTop: '5px'
}

const buttonsBoxClosedCss = {
  marginRight: '20px',
  flexDirection: 'column' as ChakraProps['flexDirection'],
  justifyContent: 'center',
  flex: 1,
  width: '100%'
}
