import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { Fragment, useContext, useEffect } from 'react'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { Page } from '../../navigation/page-paths'
import { AppStateContext, type AppStateContextType } from '../../state/StateContextProvider'
import { Dispatch } from '../../state/reducer'
import { pageCss } from '../../utils/styles'
import LoadingIndicator from '../../widgets/loading-indicator/LoadingIndicator'
import AccountRouteSelector from './AccountRouteSelector'
import GeneralAccountInfo from './GeneralAccountInfo'
import { manageAccountLabel } from './ManageAccountPage'
import { content } from './textContent'
import { accountRelatedValidationSchemasAreFetched } from './utils'

const githubAuthenticationRoute = '/api/login/github'
const loadingFormDataMessage = 'Loading form data, please wait...'
/**  
 This is the default/fallback user account page. It shows th user some general information on, for example,
 why one would want to have an account. On this page, the available account-related actions are displayed 
 as buttons that take the user to the corresponding pages, for example, to create
 a new account or to sign in to an existing account.
 */
const AccountPage = () => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { fetchValidationSchemas } = useContext(ApiServiceContext)
  const router = useRouter()

  // biome-ignore lint/correctness/useExhaustiveDependencies:Only run if schemas change
  useEffect(() => {
    if (state.validationSchemas) return

    const getSchemas = async () => {
      const schemas = await fetchValidationSchemas()

      if (schemas) {
        dispatch({ type: Dispatch.SET_VALIDATION_SCHEMAS, payload: { validationSchemas: schemas } })
      }
    }

    getSchemas()
  }, [state.validationSchemas])

  const navigateTo = (route: AccountRoute) => router.push(`/${Page.ACCOUNT}/${route}`)

  if (!accountRelatedValidationSchemasAreFetched(state.validationSchemas)) {
    return (
      <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-page`}>
        <GeneralAccountInfo />
        <LoadingIndicator message={loadingFormDataMessage} />
      </Flex>
    )
  }

  const userIsSignedIn = state.account?.token

  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-page`}>
      <GeneralAccountInfo />

      {userIsSignedIn ? (
        <AccountRouteSelector
          title={manageAccountLabel}
          info={content.manageAccountInfo}
          buttonLabel={manageAccountLabel}
          performAction={() => navigateTo(AccountRoute.MANAGE)}
        />
      ) : (
        <Fragment>
          <AccountRouteSelector
            title={content.withEmailLabel}
            info={content.emailMainInfo}
            buttonLabel={content.withEmailLabel}
            performAction={() => navigateTo(AccountRoute.EMAIL)}
          />

          <AccountRouteSelector
            title={content.githubLabel}
            info={content.githubInfo}
            buttonLabel={content.githubLabel}
            performAction={() => router.push(githubAuthenticationRoute)}
          />
        </Fragment>
      )}
    </Flex>
  )
}

export default AccountPage
