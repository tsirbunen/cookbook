import { type ChakraProps, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { Page } from '../../navigation/router/router'
import { AppStateContext, type AppStateContextType } from '../../state/StateContextProvider'
import { Dispatch } from '../../state/reducer'
import { IdentityProvider, ValidationTarget } from '../../types/graphql-schema-types.generated'
import { getEmailAccountInputValidator } from '../../utils/formValidators'
import { getSubmitIsDisabled } from '../../utils/getSubmitIsDisabled'
import { pageCss } from '../../utils/styles'
import FormActionButtons from '../../widgets/form-action-buttons/FormActionButtons'
import FormSimpleStringInput from '../../widgets/form-simple-input/FormSimpleStringInput'
import SuccessInfo from './SuccessInfo'
import TitleWithSpacing from './TitleWithSpacing'
import { content } from './textContent'
import { getPasswordVisibilityToggle } from './utils'

export type CreateEmailAccountFormValues = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

const initialFormValues: CreateEmailAccountFormValues = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

const CreateEmailAccountPage = () => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { createEmailAccount } = useContext(ApiServiceContext)
  const [showPasswords, setShowPasswords] = useState(false)
  const router = useRouter()
  const validationSchema = state.validationSchemas?.[ValidationTarget.EmailAccountInput]

  const {
    handleSubmit,
    control,
    watch,
    trigger,
    reset,
    formState: { errors, touchedFields, isSubmitting }
  } = useForm<CreateEmailAccountFormValues>({
    context: 'createEmailAccountForm',
    resolver: validationSchema && getEmailAccountInputValidator(validationSchema),
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
    // FIXME: Follow if triggers too often
  }, [watch, touchedFields, trigger])

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
  const requiredProperties = validationSchema?.required ?? []
  const submitIsDisabled = getSubmitIsDisabled(
    touchedFields,
    initialFormValues,
    errors,
    isSubmitting,
    requiredProperties
  )

  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-${AccountRoute.CREATE}-page`}>
      <Flex {...outerCss}>
        <TitleWithSpacing title={content.createAccountWithEmailLabel} />

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

              <FormSimpleStringInput
                label={content.emailLabel}
                control={control}
                name={'email'}
                info={content.emailInfo}
                placeholder={content.emailPlaceholder}
              />
              <FormSimpleStringInput
                label={content.passwordLabel}
                control={control}
                name={'password'}
                info={content.passwordInfo}
                placeholder={content.passwordPlaceholder}
                type={passwordInputType}
                rightElement={getPasswordVisibilityToggle(showPasswords, setShowPasswords)}
              />
              <FormSimpleStringInput
                label={content.passwordConfirmationLabel}
                control={control}
                name={'passwordConfirmation'}
                info={content.passwordConfirmationInfo}
                placeholder={content.passwordConfirmationPlaceholder}
                type={passwordInputType}
              />
              <FormActionButtons
                cancelFn={() => navigateToRoute()}
                clearFn={reset}
                submitIsDisabled={submitIsDisabled}
              />
            </form>
          ) : (
            <SuccessInfo
              info={content.accountCreatedInfo}
              secondaryInfo={content.spamInfo}
              onClick={() => navigateToRoute(AccountRoute.SIGN_IN)}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CreateEmailAccountPage

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
