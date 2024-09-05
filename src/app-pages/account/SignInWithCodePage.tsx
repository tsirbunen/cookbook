import { ChakraProps, Flex } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormSimpleInput, { VerificationFormValues } from '../../widgets/form-simple-input/FormSimpleInput'
import FormActionButtons from '../../widgets/form-action-buttons/FormActionButtons'
import { useContext } from 'react'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { pageCss } from './AccountPage'
import { AppStateContext, AppStateContextType } from '../../state/StateContextProvider'
import { Dispatch } from '../../state/reducer'
import { Page } from '../../navigation/router/router'
import { useRouter } from 'next/navigation'
import TitleWithSpacing from './TitleWithSpacing'
import { AccountRoute } from '../../../app/account/[accountAction]/page'

export const signInWIthVerificationCodeLabel = 'SIGN IN WITH CODE'
const verificationCodeLabel = 'Verification code'
const verificationCodeInfo =
  'Please type the verification code you received to your phone number. If you have not received any code, go back to the Accounts main page and request a new one.'
const verificationCodePlaceholder = 'Enter the verification code...'

const initialFormValues: VerificationFormValues = { code: '' }

const SignInWithCodePage = () => {
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const { signInToAccountWithCode } = useContext(ApiServiceContext)
  const router = useRouter()
  const { handleSubmit, control } = useForm<VerificationFormValues>({
    defaultValues: initialFormValues
  })

  const onSubmit: SubmitHandler<VerificationFormValues> = async ({ code }: VerificationFormValues) => {
    const signedInAccount = await signInToAccountWithCode(code)
    if (signedInAccount?.token) {
      const { id, username, phoneNumber, token } = signedInAccount
      dispatch({ type: Dispatch.SET_ACCOUNT, payload: { account: { id, username, phoneNumber, token } } })
      router.push(`/${Page.ACCOUNT}`)
    }
  }

  // FIXME: Add proper form validation and an example of phone number format

  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-${AccountRoute.SIGN_IN_WITH_CODE}-page`}>
      <Flex {...outerCss}>
        <TitleWithSpacing title={signInWIthVerificationCodeLabel} />

        <Flex {...innerCss}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormSimpleInput
              label={verificationCodeLabel}
              control={control}
              name={'code'}
              info={verificationCodeInfo}
              placeholder={verificationCodePlaceholder}
            />
            <FormActionButtons cancelFn={() => router.push(`/${Page.ACCOUNT}`)} />
          </form>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SignInWithCodePage

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
