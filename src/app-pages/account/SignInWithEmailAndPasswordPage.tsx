import { type ChakraProps, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { Page } from '../../navigation/router/router'
import { AppStateContext, type AppStateContextType } from '../../state/StateContextProvider'
import { Dispatch } from '../../state/reducer'
import { IdentityProvider, ValidationTarget } from '../../types/graphql-schema-types.generated'
import { getValidatorFromJsonSchema } from '../../utils/formValidators'
import { pageCss } from '../../utils/styles'
import FormActionButtons from '../../widgets/form-action-buttons/FormActionButtons'
import FormSimpleStringInput from '../../widgets/form-simple-input/FormSimpleStringInput'
import TitleWithSpacing from './TitleWithSpacing'
import { content } from './textContent'
import { getPasswordVisibilityToggle, getSignInSubmitIsDisabled } from './utils'

export type SignInWithEmailAndPasswordFormValues = {
  email: string
  password: string
}

const initialFormValues: SignInWithEmailAndPasswordFormValues = {
  email: '',
  password: ''
}

const SignInWithEmailAndPasswordPage = () => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { signInToEmailAccount, setAuthenticationToken } = useContext(ApiServiceContext)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  // Parent component ensures that the relevant validation schema has been fetched
  const validationSchema = state.validationSchemas?.[ValidationTarget.SignInToEmailAccountInput]

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, touchedFields, isSubmitting }
  } = useForm<SignInWithEmailAndPasswordFormValues>({
    context: 'signInWithEmailAndPasswordForm',
    resolver: validationSchema && getValidatorFromJsonSchema(validationSchema),
    mode: 'onTouched',
    defaultValues: { ...initialFormValues, email: state.account?.email || '' }
  })

  const onSubmit: SubmitHandler<SignInWithEmailAndPasswordFormValues> = async ({
    email,
    password
  }: SignInWithEmailAndPasswordFormValues) => {
    const signedInAccount = await signInToEmailAccount({ email, password })
    if (signedInAccount?.token && signedInAccount?.email) {
      const { id, uuid, username, email, token } = signedInAccount
      setAuthenticationToken(token)
      dispatch({
        type: Dispatch.SET_ACCOUNT,
        payload: { account: { id, uuid, username, email, token, identityProvider: IdentityProvider.Email } }
      })
      router.push(`/${Page.ACCOUNT}`)
    }
  }

  const submitIsDisabled = getSignInSubmitIsDisabled(touchedFields, errors, isSubmitting)

  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-${AccountRoute.SIGN_IN}-page`}>
      <Flex {...outerCss}>
        <TitleWithSpacing title={content.signInLabel} />

        <Flex {...innerCss}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormSimpleStringInput
              label={content.emailLabel}
              control={control}
              name={'email'}
              info={content.emailSignInInfo}
              placeholder={content.emailPlaceholder}
            />
            <FormSimpleStringInput
              label={content.passwordLabel}
              control={control}
              name={'password'}
              info={content.passwordSignInInfo}
              placeholder={content.passwordPlaceholder}
              type={showPassword ? 'text' : 'password'}
              rightElement={getPasswordVisibilityToggle(showPassword, setShowPassword)}
            />
            <FormActionButtons
              cancelFn={() => router.push(`/${Page.ACCOUNT}`)}
              clearFn={reset}
              submitIsDisabled={submitIsDisabled}
            />
          </form>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SignInWithEmailAndPasswordPage

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
