import { type ChakraProps, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { Shades } from '../../constants/shades'
import { Page } from '../../navigation/router/router'
import { AppStateContext, type AppStateContextType } from '../../state/StateContextProvider'
import { Dispatch } from '../../state/reducer'
import { IdentityProvider, ValidationTarget } from '../../types/graphql-schema-types.generated'
import { getValidatorFromJsonSchema } from '../../utils/formValidators'
import { pageCss } from '../../utils/styles'
import FormActionButtons from '../../widgets/form-action-buttons/FormActionButtons'
import FormSimpleStringInput from '../../widgets/form-simple-input/FormSimpleStringInput'
import SuccessInfo from './SuccessInfo'
import TitleWithSpacing from './TitleWithSpacing'
import { content } from './textContent'

type CreateProviderAccountFormValues = {
  username: string
}

type CompleteGitHubAccountPageProps = {
  username: string
  token: string
}

const CompleteGitHubAccountPage = ({ username, token }: CompleteGitHubAccountPageProps) => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { createNonEmailAccount, setAuthenticationToken } = useContext(ApiServiceContext)
  const router = useRouter()

  const validationSchema = state.validationSchemas?.[ValidationTarget.ProviderAccountInput]

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateProviderAccountFormValues>({
    context: 'completeProviderAccountForm',
    resolver: validationSchema && getValidatorFromJsonSchema(validationSchema),
    mode: 'onTouched',
    defaultValues: { username }
  })

  const onSubmit: SubmitHandler<CreateProviderAccountFormValues> = async (
    accountVariables: CreateProviderAccountFormValues
  ) => {
    const { username } = accountVariables

    const newAccount = await createNonEmailAccount({ username, token, identityProvider: IdentityProvider.Github })
    if (newAccount?.token) {
      setAuthenticationToken(newAccount.token)
      dispatch({
        type: Dispatch.SET_ACCOUNT,
        payload: {
          account: {
            id: newAccount.id,
            uuid: newAccount.uuid,
            username,
            identityProvider: IdentityProvider.Github,
            token: newAccount.token
          }
        }
      })
    }
  }

  const navigateToRoute = (accountRoute?: AccountRoute) => {
    const route = accountRoute ? `/${Page.ACCOUNT}/${accountRoute}` : `/${Page.ACCOUNT}`
    router.push(route)
  }

  if (state.account) {
    navigateToRoute()
  }

  const submitIsDisabled = (isSubmitting || !!errors.username) ?? false

  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-${AccountRoute.CREATE}-page`}>
      <Flex {...outerCss}>
        <TitleWithSpacing title={content.createAccountWithGitHubLabel} />
        {!state.account ? <Text {...infoCss}>{content.completeCreateGitHubAccountInfo}</Text> : null}

        <Flex {...innerCss}>
          {!state.account ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormSimpleStringInput
                label={content.usernameLabel}
                control={control}
                name={'username'}
                info={content.usernameInfo}
                placeholder={content.usernamePlaceholder}
              />
              <FormActionButtons
                cancelFn={() => navigateToRoute()}
                clearFn={reset}
                submitIsDisabled={submitIsDisabled}
              />
            </form>
          ) : (
            <SuccessInfo info={content.accountCreatedInfo} onClick={() => navigateToRoute(AccountRoute.SIGN_IN)} />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CompleteGitHubAccountPage

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start'
}

const innerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start'
}

const infoCss = {
  lineHeight: '1.15em',
  color: Shades.SLIGHTLY_DARK,
  marginBottom: '10px'
}
