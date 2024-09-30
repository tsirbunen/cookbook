import { ChakraProps, Flex } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import FormSimpleInput, { RequestVerificationEmailValues } from '../../widgets/form-simple-input/FormSimpleInput'
import FormActionButtons from '../../widgets/form-action-buttons/FormActionButtons'
import { useContext, useState } from 'react'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { pageCss } from './AccountPage'
import { useRouter } from 'next/navigation'
import { Page } from '../../navigation/router/router'
import TitleWithSpacing from './TitleWithSpacing'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { AppStateContext, AppStateContextType } from '../../state/StateContextProvider'
import { content } from './textContent'
import SuccessInfo from './SuccessInfo'
import { getValidatorFromJsonSchema } from './formValidators'
import { TargetSchema } from '../../types/graphql-schema-types.generated'
import { getSubmitIsDisabled } from './utils'

const initialFormValues: RequestVerificationEmailValues = {
  email: ''
}

const RequestVerificationEmailPage = () => {
  const { state } = useContext(AppStateContext) as AppStateContextType
  const { requestVerificationEmail } = useContext(ApiServiceContext)
  const [requestWasSent, setRequestWasSent] = useState(false)
  const router = useRouter()
  const validationSchema = state.validationSchemas?.[TargetSchema.RequestVerificationEmailInput]

  // FIXME: Implement storing the phone number in the browser's local storage.
  // This is here just for development purposes.
  const storedAccountEmail = ''

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, touchedFields, isSubmitting }
  } = useForm<RequestVerificationEmailValues>({
    context: 'requestVerificationEmailForm',
    resolver: validationSchema && getValidatorFromJsonSchema(validationSchema),
    mode: 'onTouched',
    defaultValues: storedAccountEmail
      ? {
          email: storedAccountEmail ?? ''
        }
      : initialFormValues
  })

  const onSubmit: SubmitHandler<RequestVerificationEmailValues> = async (
    accountVariables: RequestVerificationEmailValues
  ) => {
    console.log('accountVariables:', accountVariables)
    const emailSent = await requestVerificationEmail(accountVariables.email)
    if (emailSent) {
      setRequestWasSent(true)
    }
  }

  const navigateToRoute = (accountRoute?: AccountRoute) => {
    const route = accountRoute ? `/${Page.ACCOUNT}/${accountRoute}` : `/${Page.ACCOUNT}`
    router.push(route)
  }

  const submitIsDisabled = getSubmitIsDisabled(touchedFields, initialFormValues, errors, isSubmitting)

  console.log('errors:', errors, touchedFields, submitIsDisabled)

  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-${AccountRoute.VERIFICATION}-page`}>
      <Flex {...outerCss}>
        <TitleWithSpacing title={content.requestVerificationEmailLabel} />

        <Flex {...innerCss}>
          {!requestWasSent ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormSimpleInput
                label={content.emailLabel}
                control={control}
                name={'email'}
                error={errors?.email}
                info={content.emailRequestVerificationInfo}
              />

              <FormActionButtons
                cancelFn={() => router.push(`/${Page.ACCOUNT}`)}
                clearFn={reset}
                submitIsDisabled={submitIsDisabled}
              />
            </form>
          ) : (
            <SuccessInfo
              info={content.verificationEmailRequestedInfo}
              onClick={() => navigateToRoute(AccountRoute.SIGN_IN)}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default RequestVerificationEmailPage

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start',
  marginTop: '20px'
}

const innerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start'
}
