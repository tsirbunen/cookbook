import { ChakraProps, Flex } from '@chakra-ui/react'
import AccountActionSelector from './AccountAction'
import AccountDetails from './AccountDetails'
import Title, { TitleVariant } from '../../widgets/titles/Title'
import { Account } from '../../types/graphql-schema-types.generated'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import { useState } from 'react'
import SwitchToggleWithLabel from '../../widgets/switch-toggle/SwitchToggleWithLabel'

const accountTitle = 'ACCOUNT DETAILS'
const signOutTitle = 'SIGN OUT'
const deleteAccountTitle = 'DELETE ACCOUNT'
const signOutLabel =
  'Signing out clears possible account-related cookies stored in your browser. Other app data stored in the browser (like sound settings) are left untouched. Signing in again will require verifying your phone number again.'
const signOutButtonLabel = 'SIGN OUT'
const deleteAccountLabel =
  'Deleting your account will permanently remove all your data from the Cooking Companion app. This action cannot be undone.'
const deleteAccountButtonLabel = 'DELETE ACCOUNT'
const confirmDeleteLabel = 'I understand that this action is irreversible and all my data is lost'

type ManageAccountProps = {
  account: Omit<Account, 'id'> & { id?: number }
  signOut: () => void
  deleteAccount: () => void
}

const ManageAccount = ({ account, signOut, deleteAccount }: ManageAccountProps) => {
  const [deleteConfirmed, setDeleteConfirmed] = useState(false)

  // TODO: Implement possibility to change phone number and username

  return (
    <Flex {...outerCss}>
      <Title title={accountTitle} variant={TitleVariant.MediumMedium} />
      <AccountDetails account={account} />

      <Title title={signOutTitle} variant={TitleVariant.MediumMedium} />
      <AccountActionSelector label={signOutLabel} buttonLabel={signOutButtonLabel} performAction={signOut} />

      <Flex {...spacerCss}>
        <Title title={deleteAccountTitle} variant={TitleVariant.MediumMedium} />
      </Flex>
      <AccountActionSelector
        label={deleteAccountLabel}
        buttonLabel={deleteAccountButtonLabel}
        performAction={deleteConfirmed ? deleteAccount : () => {}}
        buttonVariant={ButtonVariant.DeleteLarge}
      >
        <SwitchToggleWithLabel
          isChecked={deleteConfirmed}
          onChange={() => setDeleteConfirmed(!deleteConfirmed)}
          labelChecked={confirmDeleteLabel}
        />
      </AccountActionSelector>
    </Flex>
  )
}

export default ManageAccount

const outerCss = {
  marginTop: '30px',
  flexDirection: 'column' as ChakraProps['flexDirection'],
  display: 'flex'
}

const spacerCss = {
  marginTop: '30px'
}
