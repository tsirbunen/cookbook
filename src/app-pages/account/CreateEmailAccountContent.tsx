import { ChakraProps, Flex } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormSimpleInput, { CreateEmailAccountFormValues } from '../../widgets/form-simple-input/FormSimpleInput'
import FormActionButtons from '../../widgets/form-action-buttons/FormActionButtons'
import { useContext, useEffect, useState } from 'react'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { AppStateContext, AppStateContextType } from '../../state/StateContextProvider'
import { Dispatch } from '../../state/reducer'
import { Page } from '../../navigation/router/router'
import { useRouter } from 'next/navigation'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { IdentityProvider, TargetSchema } from '../../types/graphql-schema-types.generated'
import { content } from './textContent'
import SuccessInfo from './SuccessInfo'
import { getEmailAccountInputValidator } from './formValidators'
import { getPasswordVisibilityToggle, getSubmitIsDisabled } from './utils'

const initialFormValues: CreateEmailAccountFormValues = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

// FIXME: Implement different ways to create an account, for example, using GitHub of Facebook account.
const CreateEmailAccountContent = () => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { createEmailAccount } = useContext(ApiServiceContext)
  const [showPasswords, setShowPasswords] = useState(false)
  const router = useRouter()
  // Parent component ensures that the relevant validation schema has been fetched
  const validationSchema = state.validationSchemas![TargetSchema.EmailAccountInput]

  const {
    handleSubmit,
    control,
    watch,
    trigger,
    reset,
    formState: { errors, touchedFields, isSubmitting }
  } = useForm<CreateEmailAccountFormValues>({
    context: 'createEmailAccountForm',
    resolver: getEmailAccountInputValidator(validationSchema),
    mode: 'onTouched',
    defaultValues: initialFormValues
  })

  useEffect(() => {
    const subscription = watch((_value, { name }) => {
      if (name === 'password' && touchedFields.passwordConfirmation) {
        trigger('passwordConfirmation')
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, touchedFields])

  const onSubmit: SubmitHandler<CreateEmailAccountFormValues> = async (
    accountVariables: CreateEmailAccountFormValues
  ) => {
    const { username, email, password } = accountVariables

    const newAccount = await createEmailAccount({ username, email, password })
    if (newAccount) {
      dispatch({
        type: Dispatch.SET_ACCOUNT,
        payload: {
          account: {
            id: newAccount.id,
            uuid: newAccount.uuid,
            username,
            identityProvider: IdentityProvider.Email,
            email,
            emailVerified: false
          }
        }
      })
    }
  }

  const navigateToRoute = (accountRoute?: AccountRoute) => {
    const route = accountRoute ? `/${Page.ACCOUNT}/${accountRoute}` : `/${Page.ACCOUNT}`
    router.push(route)
  }

  const passwordInputType = showPasswords ? 'text' : 'password'
  const submitIsDisabled = getSubmitIsDisabled(touchedFields, initialFormValues, errors, isSubmitting)

  return (
    <Flex {...outerCss}>
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

            <FormSimpleInput
              label={content.emailLabel}
              control={control}
              name={'email'}
              info={content.emailInfo}
              placeholder={content.emailPlaceholder}
              error={errors?.email}
            />
            <FormSimpleInput
              label={content.passwordLabel}
              control={control}
              name={'password'}
              info={content.passwordInfo}
              placeholder={content.passwordPlaceholder}
              error={errors?.password}
              type={passwordInputType}
              rightElement={getPasswordVisibilityToggle(showPasswords, setShowPasswords)}
            />
            <FormSimpleInput
              label={content.passwordConfirmationLabel}
              control={control}
              name={'passwordConfirmation'}
              info={content.passwordConfirmationInfo}
              placeholder={content.passwordConfirmationPlaceholder}
              error={errors?.passwordConfirmation}
              type={passwordInputType}
            />
            <FormActionButtons cancelFn={() => navigateToRoute()} clearFn={reset} submitIsDisabled={submitIsDisabled} />
          </form>
        ) : (
          <SuccessInfo info={content.accountCreatedInfo} onClick={() => navigateToRoute(AccountRoute.SIGN_IN)} />
        )}
      </Flex>
    </Flex>
  )
}

export default CreateEmailAccountContent

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
