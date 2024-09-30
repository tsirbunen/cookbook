import { Page } from '../../navigation/router/router'
import { HEADER_HEIGHT } from '../../constants/layout'
import { ChakraProps, Flex } from '@chakra-ui/react'
import { Fragment, useContext, useEffect } from 'react'
import GeneralAccountInfo from './GeneralAccountInfo'
import { AppStateContext, AppStateContextType } from '../../state/StateContextProvider'
import AccountRouteSelector from './AccountRouteSelector'
import { useRouter } from 'next/navigation'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { manageAccountLabel } from './ManageAccountPage'
import { content } from './textContent'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { Dispatch } from '../../state/reducer'
import LoadingIndicator from '../../widgets/loading-indicator/LoadingIndicator'
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

export const pageCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  marginTop: `${HEADER_HEIGHT}px`,
  marginLeft: '25px',
  marginRight: '25px',
  width: '100%',
  maxWidth: '600px'
}
