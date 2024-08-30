import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { DARK_COLOR, MEDIUM_COLOR, SLIGHTLY_DARK_COLOR, VERY_PALE_COLOR } from '../../constants/color-codes'
import { Account } from '../../types/graphql-schema-types.generated'

type AccountDetailsProps = {
  account: Pick<Account, 'username' | 'phoneNumber' | 'isVerified'>
}

const usernameLabel = 'Username'
const phoneNumberLabel = 'Phone number'
const accountVerifiedLabel = 'Account verified'
const yesLabel = 'YES'
const noLabel = 'NO'

const AccountDetails = ({ account }: AccountDetailsProps) => {
  if (!account) {
    return null
  }

  const { username, phoneNumber, isVerified } = account
  const accountDetails = [
    { label: usernameLabel, value: username },
    { label: phoneNumberLabel, value: phoneNumber },
    { label: accountVerifiedLabel, value: isVerified ? yesLabel : noLabel }
  ]

  return (
    <Flex {...cardCss}>
      {accountDetails.map(({ label, value }) => (
        <Flex key={label} flexDirection={'column'}>
          <Text {...labelCss}>{label}</Text>
          <Text {...titleCss}>{value}</Text>
        </Flex>
      ))}
    </Flex>
  )
}

export default AccountDetails

const cardCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start',
  marginTop: '5px',
  marginBottom: '30px',
  background: VERY_PALE_COLOR,
  padding: '20px',
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
