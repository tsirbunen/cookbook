import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { DARK_COLOR, MEDIUM_COLOR, SLIGHTLY_DARK_COLOR, VERY_PALE_COLOR } from '../../constants/color-codes'
import { AccountInfo } from '../../types/types'
import SwitchToggleWithLabel from '../../widgets/switch-toggle/SwitchToggleWithLabel'
import { useState } from 'react'

type AccountDetailsProps = {
  account: AccountInfo
}

const usernameLabel = 'Username'
const phoneNumberLabel = 'Phone number'
const cookiesEnabledLabel = 'Keep me signed in with the help of cookies'
const cookiesDisabledLabel = 'Do not use cookies to store sign-in information'
const storePhoneNumberEnabledLabel = 'Store my phone number in the browser'
const storePhoneNumberDisabledLabel = 'Do not store my phone number in the browser'

const AccountDetails = ({ account }: AccountDetailsProps) => {
  // FIXME: Implement the functionality to store the phone number in the browser's local storage
  // and token in the browser's cookies
  const [cookiesAreEnabled, setCookiesAreEnabled] = useState(true)
  const [savePhoneNumberIsEnabled, setSavePhoneNumberIsEnabled] = useState(true)

  if (!account) {
    return null
  }

  const { username, phoneNumber } = account

  return (
    <Flex {...cardCss}>
      <AccountDetail label={usernameLabel} value={username!} />
      <AccountDetail label={phoneNumberLabel} value={phoneNumber} />

      <SwitchToggleWithLabel
        isChecked={cookiesAreEnabled}
        onChange={() => setCookiesAreEnabled(!cookiesAreEnabled)}
        labelChecked={cookiesEnabledLabel}
        labelNotChecked={cookiesDisabledLabel}
      />

      <SwitchToggleWithLabel
        isChecked={savePhoneNumberIsEnabled}
        onChange={() => setSavePhoneNumberIsEnabled(!savePhoneNumberIsEnabled)}
        labelChecked={storePhoneNumberEnabledLabel}
        labelNotChecked={storePhoneNumberDisabledLabel}
      />
    </Flex>
  )
}

const AccountDetail = ({ label, value }: { label: string; value: string }) => {
  return (
    <Flex key={label} flexDirection={'column'}>
      <Text {...labelCss}>{label}</Text>
      <Text {...titleCss}>{value}</Text>
    </Flex>
  )
}

export default AccountDetails

const cardCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start',
  marginTop: '5px',
  marginBottom: '10px',
  background: VERY_PALE_COLOR,
  padding: '20px 20px 10px 20px',
  borderRadius: '10px',
  borderWidth: '2.5px',
  borderColor: MEDIUM_COLOR
}

const labelCss = {
  lineHeight: '1.1em',
  color: SLIGHTLY_DARK_COLOR,
  marginTop: '3px',
  fontWeight: '600'
}

const titleCss = {
  marginBottom: '10px',
  color: DARK_COLOR,
  fontWeight: '800'
}
