import { ChakraProps, Flex } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormSimpleInput, { SignInWithEmailAndPasswordFormValues } from '../../widgets/form-simple-input/FormSimpleInput'
import FormActionButtons from '../../widgets/form-action-buttons/FormActionButtons'
import { useContext, useState } from 'react'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { pageCss } from './AccountPage'
import { AppStateContext, AppStateContextType } from '../../state/StateContextProvider'
import { Dispatch } from '../../state/reducer'
import { Page } from '../../navigation/router/router'
import { useRouter } from 'next/navigation'
import TitleWithSpacing from './TitleWithSpacing'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { content } from './textContent'
import { IdentityProvider, TargetSchema } from '../../types/graphql-schema-types.generated'
import { getValidatorFromJsonSchema } from './formValidators'
import { getPasswordVisibilityToggle, getSignInSubmitIsDisabled } from './utils'

const initialFormValues: SignInWithEmailAndPasswordFormValues = {
  email: '',
  password: ''
}

const SignInWithEmailAndPasswordPage = () => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { signInToEmailAccount } = useContext(ApiServiceContext)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  // Parent component ensures that the relevant validation schema has been fetched
  const validationSchema = state.validationSchemas?.[TargetSchema.SignInToEmailAccountInput]

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
    if (signedInAccount?.token) {
      const { id, uuid, username, email, token } = signedInAccount
      dispatch({
        type: Dispatch.SET_ACCOUNT,
        payload: { account: { id, uuid, username, email: email!, token, identityProvider: IdentityProvider.Email } }
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
            <FormSimpleInput
              label={content.emailLabel}
              control={control}
              name={'email'}
              error={errors?.email}
              info={content.emailSignInInfo}
              placeholder={content.emailPlaceholder}
            />
            <FormSimpleInput
              label={content.passwordLabel}
              control={control}
              name={'password'}
              error={errors?.password}
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
