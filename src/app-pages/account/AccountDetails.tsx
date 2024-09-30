import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { DARK_COLOR, MEDIUM_COLOR, SLIGHTLY_DARK_COLOR, VERY_PALE_COLOR } from '../../constants/color-codes'
import { AccountInfo } from '../../types/types'
import SwitchToggleWithLabel from '../../widgets/switch-toggle/SwitchToggleWithLabel'
import { Fragment, useState } from 'react'
import { content } from './textContent'
import { IdentityProvider } from '../../types/graphql-schema-types.generated'

type AccountDetailsProps = {
  account: AccountInfo
}

const storeEmailEnabledLabel = 'Store my email in the browser'
const storeEmailDisabledLabel = 'Do not store my email in the browser'

const AccountDetails = ({ account }: AccountDetailsProps) => {
  // FIXME: Implement the functionality to store the email in the browser's local storage
  const [saveEmailIsEnabled, setSaveEmailIsEnabled] = useState(true)

  const getIdentityProviderMethod = (identityProvider: IdentityProvider) => {
    switch (identityProvider) {
      case IdentityProvider.Email:
        return 'Email and password'
      case IdentityProvider.Github:
        return 'GitHub'

      default:
        throw new Error(`Unknown identity confirmation method: ${identityProvider}`)
    }
  }

  if (!account) {
    return null
  }

  const { username, email, identityProvider } = account

  return (
    <Flex {...cardCss}>
      <AccountDetail label={content.usernameLabel} value={username!} />
      <AccountDetail label={content.identityProvider} value={getIdentityProviderMethod(identityProvider)} />
      {email ? (
        <Fragment>
          <AccountDetail label={content.emailLabel} value={email} />
          <SwitchToggleWithLabel
            isChecked={saveEmailIsEnabled}
            onChange={() => setSaveEmailIsEnabled(!saveEmailIsEnabled)}
            labelChecked={storeEmailEnabledLabel}
            labelNotChecked={storeEmailDisabledLabel}
          />
        </Fragment>
      ) : null}
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
