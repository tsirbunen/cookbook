import { Text } from '@chakra-ui/react'
import { SLIGHTLY_DARK_COLOR } from '../../constants/color-codes'
import { Fragment } from 'react'
import TitleWithSpacing from './TitleWithSpacing'

const generalAccountTitle = 'GENERAL INFO'
const generalAccountInfo = [
  'Viewing publicly available recipes in the Cooking Companion app does not require an account. But in case you wish to create or edit recipes of your own, you need one.',
  'When creating or signing into an account, you need to verify your identity with your phone. This is to ensure that only you have access to your account and that you are a real person.',
  'Cookies are used to remember your account and keep you signed in. You can enable or disable the cookies at any time.',
  'Phone number can be stored in the browser to make signing in easier. You can enable or disable also this feature at any time.'
]

const AccountGeneralInfo = () => {
  return (
    <Fragment>
      <TitleWithSpacing title={generalAccountTitle} />

      {generalAccountInfo.map((info, index) => (
        <Text key={`general-account-info-${index}`} {...infoCss}>
          {info}
        </Text>
      ))}
    </Fragment>
  )
}

export default AccountGeneralInfo

const infoCss = {
  lineHeight: '1.15em',
  color: SLIGHTLY_DARK_COLOR,
  marginBottom: '10px'
}
