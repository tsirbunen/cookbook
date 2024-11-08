import type { FieldErrors, FieldValues } from 'react-hook-form'
import { BiSolidHide, BiSolidShow } from 'react-icons/bi'
import { ValidationTarget } from '../../types/graphql-schema-types.generated'
import type { JSONSchemaType } from '../../types/types'
import type { SignInWithEmailAndPasswordFormValues } from './SignInWithEmailAndPasswordPage'

export const getPasswordVisibilityToggle = (show: boolean, setShowFn: (value: boolean) => void) => {
  const Icon = show ? BiSolidHide : BiSolidShow
  return <Icon size={24} onClick={() => setShowFn(!show)} />
}

export const getSignInSubmitIsDisabled = <T extends FieldValues>(
  touchedFields: Partial<Record<keyof SignInWithEmailAndPasswordFormValues, boolean | undefined>>,
  errors: FieldErrors<T>,
  isSubmitting: boolean
) => {
  const passwordFieldHasBeenTouched = touchedFields.password
  const someFieldHasError = Object.keys(errors).length > 0
  const submitIsDisabled = !passwordFieldHasBeenTouched || someFieldHasError || isSubmitting
  return submitIsDisabled
}

export const accountRelatedValidationSchemasAreFetched = (
  schemas?: Record<ValidationTarget, JSONSchemaType> | null
) => {
  if (schemas === null) return false

  const fetchedTargets = Object.values(ValidationTarget)
  const accountRelatedTargets = [
    ValidationTarget.EmailAccountInput,
    ValidationTarget.SignInToEmailAccountInput,
    ValidationTarget.RequestVerificationEmailInput
  ]

  return accountRelatedTargets.every((target) => fetchedTargets.includes(target))
}
