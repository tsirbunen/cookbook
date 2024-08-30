import { Page } from '../../navigation/router/router'
import { HEADER_HEIGHT } from '../../constants/layout'
import { ChakraProps, Flex } from '@chakra-ui/react'
import AccountAction from './AccountAction'
import { useState } from 'react'
import CreateAccount from './CreateAccount'
import { Account } from '../../types/graphql-schema-types.generated'
import ManageAccount from './ManageAccount'
import GeneralInfo from './GeneralInfo'
import Title, { TitleVariant } from '../../widgets/titles/Title'

enum AccountActionType {
  CREATE = 'CREATE',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  DELETE = 'DELETE'
}

const createLabel =
  'If you have no account yet, you  can easily create one with your phone number. You can also create another account if you wish, but then you need another phone number for verification.'
const createButtonLabel = 'CREATE ACCOUNT'
const signInWithStoredPhoneNumberLabel =
  'It seems that you have previously signed in to the Cooking Companion app from this browser using the phone number: '
const signInToAnotherAccountLabel =
  'You can also sign in to another account with another phone number, in case you have multiple accounts.'
const signInToButtonLabel = 'SIGN IN TO'
const signInToAnotherButtonLabel = 'SIGN IN TO ANOTHER ACCOUNT'
const signInButtonLabel = 'SIGN IN TO AN ACCOUNT'
const signInLabel =
  'If you have previously created an account with your phone number, sign in to your account using your phone number.'
const createAccountTitle = 'CREATE ACCOUNT'
const signInTitle = 'SIGN IN'

const AccountPage = () => {
  // const storedAccountPhoneNumber = null //'+358 50 1234567'
  const storedAccountPhoneNumber = '+358 50 1234567'
  const [accountAction, setAccountAction] = useState<AccountActionType | null>(null)
  const [account, setAccount] = useState<Account | null>(
    // null
    {
      id: 1,
      phoneNumber: storedAccountPhoneNumber,
      isVerified: true,
      username: 'testuser'
    }
  )

  const signOut = () => {
    // TODO: Implement this
    setAccount(null)
    setAccountAction(null)
  }

  const deleteAccount = () => {
    // TODO: Implement this
    setAccount(null)
    setAccountAction(null)
  }

  return (
    <Flex {...outerCss} data-testid={`${Page.ACCOUNT}-page`}>
      <GeneralInfo />

      {account ? (
        <ManageAccount account={account} signOut={signOut} deleteAccount={deleteAccount} />
      ) : (
        <Flex {...optionsContainerCss}>
          <Flex {...spacerCss}>
            <Title title={createAccountTitle} variant={TitleVariant.MediumMedium} />
          </Flex>
          <AccountAction
            label={createLabel}
            buttonLabel={createButtonLabel}
            performAction={() => setAccountAction(AccountActionType.CREATE)}
          />

          <Flex {...spacerCss}>
            <Title title={signInTitle} variant={TitleVariant.MediumMedium} />
          </Flex>
          {storedAccountPhoneNumber ? (
            <AccountAction
              label={`${signInWithStoredPhoneNumberLabel} ${storedAccountPhoneNumber}.`}
              buttonLabel={`${signInToButtonLabel} ${storedAccountPhoneNumber}`}
              performAction={() => setAccountAction(AccountActionType.SIGN_IN)}
            />
          ) : null}
          <AccountAction
            label={storedAccountPhoneNumber ? signInToAnotherAccountLabel : signInLabel}
            buttonLabel={storedAccountPhoneNumber ? signInToAnotherButtonLabel : signInButtonLabel}
            performAction={() => setAccountAction(AccountActionType.SIGN_IN)}
          />
        </Flex>
      )}

      {accountAction === AccountActionType.CREATE && <CreateAccount />}
    </Flex>
  )
}

export default AccountPage

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  marginTop: `${HEADER_HEIGHT + 25}px`,
  marginLeft: '25px',
  marginRight: '25px',
  width: '100%',
  maxWidth: '600px',
  flex: 1
}

const optionsContainerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  display: 'flex',
  flex: 1
}

const spacerCss = {
  marginTop: '30px'
}
