import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormSimpleInput, {
  CreateEmailAccountFormValues,
  CreateProviderAccountFormValues
} from '../../widgets/form-simple-input/FormSimpleInput'
import FormActionButtons from '../../widgets/form-action-buttons/FormActionButtons'
import { useContext } from 'react'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { AppStateContext, AppStateContextType } from '../../state/StateContextProvider'
import { Dispatch } from '../../state/reducer'
import { Page } from '../../navigation/router/router'
import { useRouter } from 'next/navigation'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { IdentityProvider, TargetSchema } from '../../types/graphql-schema-types.generated'
import { content } from './textContent'
import SuccessInfo from './SuccessInfo'
import { getValidatorFromJsonSchema } from './formValidators'
import { pageCss } from './AccountPage'
import TitleWithSpacing from './TitleWithSpacing'
import { SLIGHTLY_DARK_COLOR } from '../../constants/color-codes'

type CompleteGitHubAccountPageProps = {
  username: string
  token: string
}

const CompleteGitHubAccountPage = ({ username, token }: CompleteGitHubAccountPageProps) => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { createNonEmailAccount } = useContext(ApiServiceContext)
  const router = useRouter()

  const validationSchema = state.validationSchemas?.[TargetSchema.ProviderAccountInput]

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateEmailAccountFormValues>({
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
    if (newAccount && newAccount.token) {
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
    console.log(state.account)
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
              <FormSimpleInput
                label={content.usernameLabel}
                control={control}
                name={'username'}
                info={content.usernameInfo}
                placeholder={content.usernamePlaceholder}
                error={errors?.username}
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
  color: SLIGHTLY_DARK_COLOR,
  marginBottom: '10px'
}
