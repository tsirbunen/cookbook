import { type ChakraProps, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { Shades } from '../../constants/shades'
import { Page } from '../../navigation/router/router'
import { AppStateContext, type AppStateContextType } from '../../state/StateContextProvider'
import { Dispatch } from '../../state/reducer'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import { pageCss } from '../../utils/styles'
import SwitchToggleWithLabel from '../../widgets/switch-toggle/SwitchToggleWithLabel'
import Title, { TitleVariant } from '../../widgets/titles/Title'
import AccountDetails from './AccountDetails'
import AccountRouteSelector from './AccountRouteSelector'

export const manageAccountLabel = 'MANAGE ACCOUNT'
const signOutLabel = 'SIGN OUT'
const deleteAccountLabel = 'DELETE ACCOUNT'
const singOutToSignUpInfo =
  'Note: If you wish to sign in to another account, you need to sign out first. You can only be signed in to one account at a time.'
const signOutInfo =
  'Signing out clears the authentication data stored in the browser. General app data stored in the browser (like sound settings) are left untouched.'
const deleteAccountInfo =
  'Deleting your account will permanently remove all your data from the Cooking Companion app. This action cannot be undone.'
const iUnderstandDeleteConsequencesLabel = 'I understand that this action is irreversible and all my data is lost'
const deletedAllPermanentlyLabel = 'Delete my account and all my data permanently'

const ManageAccount = () => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { deleteAccount, setAuthenticationToken } = useContext(ApiServiceContext)
  const router = useRouter()
  const [iUnderstandDelete, setIUnderstandDelete] = useState(false)
  const [deleteConfirmed, setDeleteConfirmed] = useState(false)

  const clearAccountDataFromBrowser = () => {
    // FIXME: Implement possible related cookies actions
    dispatch({ type: Dispatch.SET_ACCOUNT, payload: { account: null } })
    setAuthenticationToken(null)
    router.push(`/${Page.ACCOUNT}`)
  }

  const signOut = () => {
    clearAccountDataFromBrowser()
  }

  const deleteAccountForGood = async () => {
    if (!state?.account?.id || !state?.account?.uuid) return

    await deleteAccount(state.account.id, state.account.uuid)
    clearAccountDataFromBrowser()
  }

  // FIXME: Implement possibility to change email and username

  const account = state.account
  if (account === null) {
    return null
  }

  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-${AccountRoute.MANAGE}-page`}>
      <Flex {...outerCss}>
        <Title title={manageAccountLabel} variant={TitleVariant.MediumMedium} />
        <AccountDetails account={account} />
        <Text {...infoCss}>{singOutToSignUpInfo}</Text>

        <AccountRouteSelector
          info={signOutInfo}
          buttonLabel={signOutLabel}
          performAction={signOut}
          title={signOutLabel}
        />

        <AccountRouteSelector
          info={deleteAccountInfo}
          buttonLabel={deleteAccountLabel}
          performAction={deleteConfirmed ? deleteAccountForGood : () => {}}
          buttonVariant={ButtonVariant.DeleteLarge}
          hideButton={!iUnderstandDelete || !deleteConfirmed}
          title={deleteAccountLabel}
        >
          <SwitchToggleWithLabel
            isChecked={iUnderstandDelete}
            onChange={() => setIUnderstandDelete(!iUnderstandDelete)}
            labelChecked={iUnderstandDeleteConsequencesLabel}
          />

          <SwitchToggleWithLabel
            isChecked={deleteConfirmed}
            onChange={() => setDeleteConfirmed(!deleteConfirmed)}
            labelChecked={deletedAllPermanentlyLabel}
          />
        </AccountRouteSelector>
      </Flex>
    </Flex>
  )
}

export default ManageAccount

const infoCss = {
  lineHeight: '1.15em',
  color: Shades.SLIGHTLY_DARK,
  marginBottom: '30px'
}

const outerCss = {
  marginTop: '30px',
  flexDirection: 'column' as ChakraProps['flexDirection'],
  display: 'flex'
}
