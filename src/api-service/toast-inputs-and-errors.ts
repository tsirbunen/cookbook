import { ToastVariant } from '../theme/alert/alert-theme'
import { SimpleToast } from '../toast-service/ToastServiceProvider'

export type ToastInputs = {
  loadingToast: SimpleToast
  successToast: SimpleToast
  errorToast: SimpleToast
  errorText: string
}

export const getAccountToasts: ToastInputs = {
  loadingToast: {
    title: 'LOADING ACCOUNT',
    description: 'Please wait...',
    variant: ToastVariant.Loading
  },
  successToast: {
    title: 'ACCOUNT LOADED',
    description: 'The account was successfully loaded',
    variant: ToastVariant.Success,
    duration: 6000,
    isClosable: true
  },
  errorToast: {
    title: 'FAILED LOAD ACCOUNT',
    description: 'Something went wrong and the account was not loaded',
    variant: ToastVariant.Error,
    duration: 9000,
    isClosable: true
  },
  errorText: 'Account loading failed'
}

export const createAccountToasts: ToastInputs = {
  loadingToast: {
    title: 'CREATING ACCOUNT',
    description: 'Please wait...',
    variant: ToastVariant.Loading
  },
  successToast: {
    title: 'ACCOUNT CREATED',
    description: 'Your account was successfully created',
    variant: ToastVariant.Success,
    duration: 6000,
    isClosable: true
  },
  errorToast: {
    title: 'FAILED CREATE ACCOUNT',
    description: 'Something went wrong and your account was not created',
    variant: ToastVariant.Error,
    duration: 9000,
    isClosable: true
  },
  errorText: 'Account creation failed'
}

export const signInToEmailAccountToasts: ToastInputs = {
  loadingToast: {
    title: 'SIGNING IN',
    description: 'Please wait...',
    variant: ToastVariant.Loading
  },
  successToast: {
    title: 'SIGNED IN',
    description: 'You have successfully signed in',
    variant: ToastVariant.Success,
    duration: 6000,
    isClosable: true
  },
  errorToast: {
    title: 'FAILED SIGN IN',
    description: 'Something went wrong and you were not signed in',
    variant: ToastVariant.Error,
    duration: 9000,
    isClosable: true
  },
  errorText: 'Sign in failed'
}

export const requestVerificationEmailToasts: ToastInputs = {
  loadingToast: {
    title: 'REQUESTING CODE',
    description: 'Please wait...',
    variant: ToastVariant.Loading
  },
  successToast: {
    title: 'EMAIL REQUESTED',
    description: 'The verification email was successfully requested',
    variant: ToastVariant.Success,
    duration: 6000,
    isClosable: true
  },
  errorToast: {
    title: 'FAILED REQUEST EMAIL',
    description: 'Something went wrong and the verification email was not requested',
    variant: ToastVariant.Error,
    duration: 15000,
    isClosable: true
  },
  errorText: 'Code request failed'
}

export const deleteAccountToasts: ToastInputs = {
  loadingToast: {
    title: 'DELETING ACCOUNT',
    description: 'Please wait...',
    variant: ToastVariant.Loading
  },
  successToast: {
    title: 'ACCOUNT DELETED',
    description: 'The account was successfully deleted',
    variant: ToastVariant.Success,
    duration: 6000,
    isClosable: true
  },
  errorToast: {
    title: 'FAILED DELETE ACCOUNT',
    description: 'Something went wrong and the account was not deleted',
    variant: ToastVariant.Error,
    duration: 9000,
    isClosable: true
  },
  errorText: 'Account deletion failed'
}
