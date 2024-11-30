import { type ChakraProps, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { Page } from '../../navigation/page-paths'
import { AppStateContext, type AppStateContextType } from '../../state/StateContextProvider'
import { ValidationTarget } from '../../types/graphql-schema-types.generated'
import { getValidatorFromJsonSchema } from '../../utils/formValidators'
import { getSubmitIsDisabled } from '../../utils/getSubmitIsDisabled'
import { pageCss } from '../../utils/styles'
import FormActionButtons from '../../widgets/form-action-buttons/FormActionButtons'
import FormSimpleStringInput from '../../widgets/form-simple-input/FormSimpleStringInput'
import SuccessInfo from './SuccessInfo'
import TitleWithSpacing from './TitleWithSpacing'
import { content } from './textContent'

type RequestVerificationEmailValues = {
  email: string
}
const initialFormValues: RequestVerificationEmailValues = {
  email: ''
}

const RequestVerificationEmailPage = () => {
  const { state } = useContext(AppStateContext) as AppStateContextType
  const { requestVerificationEmail } = useContext(ApiServiceContext)
  const [requestWasSent, setRequestWasSent] = useState(false)
  const router = useRouter()
  const validationSchema = state.validationSchemas?.[ValidationTarget.RequestVerificationEmailInput]

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
    const emailSent = await requestVerificationEmail(accountVariables.email)
    if (emailSent) {
      setRequestWasSent(true)
    }
  }

  const navigateToRoute = (accountRoute?: AccountRoute) => {
    const route = accountRoute ? `/${Page.ACCOUNT}/${accountRoute}` : `/${Page.ACCOUNT}`
    router.push(route)
  }

  const requiredProperties = validationSchema?.required ?? []
  const submitIsDisabled = getSubmitIsDisabled(
    touchedFields,
    initialFormValues,
    errors,
    isSubmitting,
    requiredProperties
  )

  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-${AccountRoute.VERIFICATION}-page`}>
      <Flex {...outerCss}>
        <TitleWithSpacing title={content.requestVerificationEmailLabel} />

        <Flex {...innerCss}>
          {!requestWasSent ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormSimpleStringInput
                label={content.emailLabel}
                control={control}
                name={'email'}
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
