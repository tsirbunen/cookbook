import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import FormSimpleInput, { SignInFormValues } from '../../widgets/form-simple-input/FormSimpleInput'
import FormActionButtons from '../../widgets/form-action-buttons/FormActionButtons'
import { useContext, useEffect, useState } from 'react'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { pageCss } from './AccountPage'
// import { AppStateContext, AppStateContextType } from '../../state/StateContextProvider'
import { useRouter } from 'next/navigation'
import { Page } from '../../navigation/router/router'
import TitleWithSpacing from './TitleWithSpacing'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import { DARK_COLOR, VERY_PALE_COLOR } from '../../constants/color-codes'
import { AppStateContext, AppStateContextType } from '../../state/StateContextProvider'
import { Dispatch } from '../../state/reducer'

export const requestVerificationCodeLabel = 'REQUEST CODE TO SIGN IN'
const phoneNumberLabel = 'Phone number'
const phoneNumberFormInfo =
  'Please type your phone number below to receive a verification code to enable verification of your account.'
const verificationCodeRequestedInfo =
  'A verification code should be on its way now. Please check your phone for the code and then sign in. Note that sometimes it may take a few minutes for the code to arrive.'
const okLabel = 'GOT IT'

const RequestVerificationCodePage = () => {
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const { requestVerificationCode } = useContext(ApiServiceContext)
  const [requestWasSent, setRequestWasSent] = useState(false)
  const router = useRouter()

  // FIXME: Implement storing the phone number in the browser's local storage.
  // This is here just for development purposes.
  const storedAccountPhoneNumber = '+358 50 1234567'

  const { handleSubmit, control, setValue } = useForm<SignInFormValues>({
    defaultValues: {
      phoneNumber: storedAccountPhoneNumber ?? ''
    }
  })

  const onSubmit: SubmitHandler<SignInFormValues> = async (accountVariables: SignInFormValues) => {
    try {
      const result = await requestVerificationCode(accountVariables.phoneNumber)
      if (result.data?.requestVerificationCode) {
        setRequestWasSent(true)
        dispatch({ type: Dispatch.SET_ACCOUNT, payload: { account: { phoneNumber: accountVariables.phoneNumber } } })
      }
    } catch (error) {
      console.log('catch error', error)
    }
  }

  const updateFormValue = (phoneNumber: string) => {
    setValue('phoneNumber', phoneNumber)
  }

  const navigateToAccountRoute = (accountRoute?: AccountRoute) => {
    const route = accountRoute ? `/${Page.ACCOUNT}/${accountRoute}` : `/${Page.ACCOUNT}`
    router.push(route)
  }

  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-${AccountRoute.REQUEST_CODE}-page`}>
      <Flex {...outerCss}>
        <TitleWithSpacing title={requestVerificationCodeLabel} />

        <Flex {...innerCss}>
          {!requestWasSent ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormSimpleInput
                label={phoneNumberLabel}
                control={control}
                name={'phoneNumber'}
                info={phoneNumberFormInfo}
              />

              <FormActionButtons cancelFn={() => router.push(`/${Page.ACCOUNT}`)} clearFn={() => updateFormValue('')} />
            </form>
          ) : (
            <Flex {...innerCss}>
              <Text {...infoCss}>{verificationCodeRequestedInfo}</Text>
              <ButtonWithTheme
                variant={ButtonVariant.MediumSizePale}
                onClick={() => navigateToAccountRoute(AccountRoute.SIGN_IN_WITH_CODE)}
                isToggled={true}
                isSubmit={false}
              >
                <Text {...buttonTextNoIconCss}>{okLabel}</Text>
              </ButtonWithTheme>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default RequestVerificationCodePage

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

const infoCss = {
  lineHeight: '1.15em',
  color: DARK_COLOR,
  fontWeight: 'bold',
  marginTop: '10px',
  marginBottom: '10px'
}

const buttonTextNoIconCss = {
  color: VERY_PALE_COLOR
}
