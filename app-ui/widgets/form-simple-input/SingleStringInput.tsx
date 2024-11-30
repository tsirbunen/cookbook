import { Text } from '@chakra-ui/react'
import { type ChangeEvent, Fragment, type ReactNode } from 'react'
import type { ControllerRenderProps, FieldError, FieldPath, FieldValues } from 'react-hook-form'
import InputWithTheme from '../../theme/inputs/InputWithTheme'
import { InputVariant } from '../../theme/inputs/inputs-theme'
import { errorCss } from '../../utils/styles'

type SingleStringInputProps<T extends FieldValues, P extends FieldPath<T>> = {
  placeholder?: string
  error?: FieldError
  rightElement?: ReactNode
  type?: 'password' | 'text'
  field: ControllerRenderProps<T, P>
  isRequired?: boolean
  variant?: InputVariant
}

const SingleStringInput = <T extends FieldValues, P extends FieldPath<T>>({
  placeholder,
  error,
  rightElement,
  type,
  field,
  isRequired,
  variant
}: SingleStringInputProps<T, P>) => {
  // FIXME: Should we instead NOT have empty strings in the form values?
  const isNotRequiredAndHasNoValue = !isRequired && !field.value
  const showError = !isNotRequiredAndHasNoValue && error

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const newFormValue = !isRequired && value === '' ? null : value
    field.onChange(newFormValue)
  }

  return (
    <Fragment>
      <InputWithTheme
        variant={variant ?? InputVariant.Dark}
        isDisabled={false}
        size="md"
        onChange={onChange}
        value={field.value ?? ''}
        name={field.name}
        placeholder={placeholder}
        onBlur={field.onBlur}
        rightElement={rightElement}
        type={type}
      />
      {showError ? <Text {...errorCss}>{error.message}</Text> : null}
    </Fragment>
  )
}

export default SingleStringInput
