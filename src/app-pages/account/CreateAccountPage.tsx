import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormSimpleInput, { CreateAccountFormValues } from '../../widgets/form-simple-input/FormSimpleInput'
import FormActionButtons from '../../widgets/form-action-buttons/FormActionButtons'
import { useContext } from 'react'
import { ApiServiceContext } from '../../api-service/ApiServiceProvider'
import { pageCss } from './AccountPage'
import { DARK_COLOR, VERY_PALE_COLOR } from '../../constants/color-codes'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { AppStateContext, AppStateContextType } from '../../state/StateContextProvider'
import { Dispatch } from '../../state/reducer'
import { Page } from '../../navigation/router/router'
import { useRouter } from 'next/navigation'
import { AccountRoute } from '../../../app/account/[accountAction]/page'
import TitleWithSpacing from './TitleWithSpacing'

export const createAccountLabel = 'CREATE ACCOUNT'
const usernameLabel = 'Username'
const usernameInfo =
  "Publicity of one's recipes is optional and is set individually for each recipe. In case you allow some of your recipes to be public, this name will be displayed as the author of those recipes for all users of this app."
const phoneNumberLabel = 'Phone number'
const phoneNumberInfo =
  'Your phone number is needed for account verification purposes only. Your phone number will not be shown to other users of this app or shared with any third party.'
const usernamePlaceholder = 'Enter your username...'
const phoneNumberPlaceholder = 'Enter your phone number...'
const accountCreatedInfo =
  'Your account has been successfully created. Please check your phone for a verification code and then sign in. Note that sometimes it may take a few minutes for the code to arrive.'
const okLabel = 'GOT IT'

const initialFormValues: CreateAccountFormValues = {
  username: '',
  phoneNumber: ''
}

const CreateAccountPage = () => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { createAccount } = useContext(ApiServiceContext)
  const { handleSubmit, control } = useForm<CreateAccountFormValues>({ defaultValues: initialFormValues })
  const router = useRouter()

  const onSubmit: SubmitHandler<CreateAccountFormValues> = async (accountVariables: CreateAccountFormValues) => {
    try {
      const result = await createAccount(accountVariables)
      if (result.data?.createAccount) {
        dispatch({
          type: Dispatch.SET_ACCOUNT,
          payload: {
            account: {
              id: result.data.createAccount.id,
              username: result.data.createAccount.username,
              phoneNumber: result.data.createAccount.phoneNumber
            }
          }
        })
      }
    } catch (error) {
      // FIXME: Implement error handling properly
      console.log('catch error', error)
    }
  }

  const navigateToAccountRoute = (accountRoute?: AccountRoute) => {
    const route = accountRoute ? `/${Page.ACCOUNT}/${accountRoute}` : `/${Page.ACCOUNT}`
    router.push(route)
  }

  // FIXME: Add proper form validation and an example of phone number format

  return (
    <Flex {...pageCss} data-testid={`${Page.ACCOUNT}-${AccountRoute.CREATE_ACCOUNT}-page`}>
      <Flex {...outerCss}>
        <TitleWithSpacing title={createAccountLabel} />

        <Flex {...innerCss}>
          {!state.account ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormSimpleInput
                label={usernameLabel}
                control={control}
                name={'username'}
                info={usernameInfo}
                placeholder={usernamePlaceholder}
              />
              <FormSimpleInput
                label={phoneNumberLabel}
                control={control}
                name={'phoneNumber'}
                info={phoneNumberInfo}
                placeholder={phoneNumberPlaceholder}
              />
              <FormActionButtons cancelFn={() => navigateToAccountRoute()} />
            </form>
          ) : (
            <Flex {...innerCss}>
              <Text {...infoCss}>{accountCreatedInfo}</Text>
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

export default CreateAccountPage

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
  color: DARK_COLOR,
  fontWeight: 'bold',
  marginTop: '10px',
  marginBottom: '10px'
}

const buttonTextNoIconCss = {
  color: VERY_PALE_COLOR
}
