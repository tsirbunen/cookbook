'use client'

import { ToastId, ToastPosition, useToast } from '@chakra-ui/react'
import { createContext, MutableRefObject } from 'react'
import { createStandaloneToast } from '@chakra-ui/react'
import { toastTheme } from '../theme/alert/toast-theme'
import { ToastVariant } from '../theme/alert/alert-theme'

// Note 1: We need to add the ToastContainer component for the Chakra UI toasts to work.
// According to the Chakra UI documentation, the ChakraProvider should be enough, but
// it seems that it is not.
// Note 2: ChakraUI toasts use the Alert component under the hood. To customize the
// toast styles, we need to override the Alert component styles. And we need to do it
// here by supplying the Toast Container with a suitable theme since it is this
// ToastContainer component that displays the toasts (and provides their theme).
const { ToastContainer } = createStandaloneToast({ theme: toastTheme })

const defaultDurationMilliseconds = 12000

type ToastBase = {
  title: string
  description: string
}

export type SimpleToast = ToastBase & {
  variant: ToastVariant
  duration?: number
  isClosable?: boolean
}

type PromiseToasts = {
  loading: ToastBase
  success: Omit<SimpleToast, 'variant' | 'status'>
  error: Omit<SimpleToast, 'variant' | 'status'>
}

export type ToastService = {
  showSimpleToast: (toastInput: SimpleToast) => void
  showPromiseToast: (promise: Promise<unknown>, toastInputs: PromiseToasts) => Promise<void>
  showUpdatableToast: (ref: MutableRefObject<ToastId>, toastInput: SimpleToast) => void
  updateUpdatableToast: (ref: MutableRefObject<ToastId>, toastInput: Partial<SimpleToast>) => void
}

export const ToastServiceContext = createContext<ToastService>({} as ToastService)

/**
 * This provider enables showing toasts in the app. Currently it uses the Chakra UI useToast hook. This
 * hook could easily be used directly in any component of this app. However, it might be that in the future
 * we want to swap the toast library with some other toast library. In that case, it will be easier to do
 * library swap as changes will only need to be made here in this provider.
 */
const ToastServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast()

  // FIXME: Perhaps give user the option to choose the position of the toasts?
  const position = 'bottom-left' as ToastPosition

  const getInputWithDefaults = (toastInput: SimpleToast | Omit<SimpleToast, 'variant' | 'status'>) => {
    return {
      ...toastInput,
      duration: toastInput.duration ?? defaultDurationMilliseconds,
      isClosable: toastInput.isClosable === false ? false : true,
      position
    }
  }

  const getPromiseToastInputsWithDefaults = (toastInputs: PromiseToasts) => {
    return {
      loading: getInputWithDefaults({
        title: toastInputs.loading.title,
        description: toastInputs.loading.description,
        variant: ToastVariant.Loading,
        isClosable: false
      }),
      success: getInputWithDefaults({
        title: toastInputs.success.title,
        description: toastInputs.success.description,
        variant: ToastVariant.Success
      }),
      error: getInputWithDefaults({
        title: toastInputs.error.title,
        description: toastInputs.error.description,
        variant: ToastVariant.Error
      })
    }
  }

  const showSimpleToast = (toastInput: SimpleToast) => {
    const inputWithDefaults = getInputWithDefaults(toastInput)
    toast(inputWithDefaults)
  }

  const showPromiseToast = async (promise: Promise<unknown>, toastInputs: PromiseToasts) => {
    const inputsWithDefaults = getPromiseToastInputsWithDefaults(toastInputs)
    toast.promise(promise, inputsWithDefaults)
  }

  const showUpdatableToast = async (ref: MutableRefObject<ToastId>, toastInput: SimpleToast) => {
    const inputWithDefaults = getInputWithDefaults(toastInput)
    ref.current = toast(inputWithDefaults)
  }

  const updateUpdatableToast = async (ref: MutableRefObject<ToastId>, toastInput: Partial<SimpleToast>) => {
    if (!ref.current) return
    toast.update(ref.current, toastInput)
  }

  return (
    <ToastServiceContext.Provider
      value={{ showSimpleToast, showPromiseToast, showUpdatableToast, updateUpdatableToast }}
    >
      <ToastContainer />
      {children}
    </ToastServiceContext.Provider>
  )
}

export default ToastServiceProvider
