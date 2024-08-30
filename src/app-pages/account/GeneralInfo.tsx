import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { SLIGHTLY_DARK_COLOR } from '../../constants/color-codes'
import Title, { TitleVariant } from '../../widgets/titles/Title'
import { Fragment, useState } from 'react'
import SwitchToggleWithLabel from '../../widgets/switch-toggle/SwitchToggleWithLabel'

const generalInfoTitle = 'GENERAL INFO'
const generalInfo = [
  'Viewing publicly available recipes in the Cooking Companion app does not require an account. But in case you wish to create or edit recipes of your own, you need one.',
  'When creating or signing into an account, you need to verify your identity with your phone. This is to ensure that only you have access to your account and that you are a real person.'
]
const cookiesEnabledLabel = 'Remember me with the help of cookies'
const cookiesDisabledLabel = 'Do not use cookies to store account information'
const cookiesInfo =
  'Cookies are used to remember your account and keep you signed in. You can enable or disable the cookies at any time.'

const AccountGeneralInfo = () => {
  const [cookiesAreEnabled, setCookiesAreEnabled] = useState(true)

  return (
    <Fragment>
      <Flex {...titleCss}>
        <Title variant={TitleVariant.MediumMedium} title={generalInfoTitle} />
      </Flex>

      {generalInfo.map((info, index) => (
        <Text key={`general-account-info-${index}`} {...infoCss}>
          {info}
        </Text>
      ))}

      <Flex {...outerCss}>
        <Text {...infoCss}>{cookiesInfo}</Text>
        <SwitchToggleWithLabel
          isChecked={cookiesAreEnabled}
          onChange={() => setCookiesAreEnabled(!cookiesAreEnabled)}
          labelChecked={cookiesEnabledLabel}
          labelNotChecked={cookiesDisabledLabel}
        />
      </Flex>
    </Fragment>
  )
}

export default AccountGeneralInfo

const titleCss = {
  marginBottom: '10px'
}

const infoCss = {
  lineHeight: '1.15em',
  color: SLIGHTLY_DARK_COLOR
}

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  display: 'flex'
}
