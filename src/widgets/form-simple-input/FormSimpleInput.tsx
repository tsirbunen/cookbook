import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { Control, FieldError, FieldPath, FieldValues, useController } from 'react-hook-form'
import InputWithTheme from '../../theme/inputs/InputWithTheme'
import { InputVariant } from '../../theme/inputs/inputs-theme'
import { ERROR_COLOR, SLIGHTLY_DARK_COLOR } from '../../constants/color-codes'
import { ColorCodes } from '../../theme/theme'
import { ReactNode } from 'react'

export const formSimpleInputTestId = 'form-simple-input'

export type CreateEmailAccountFormValues = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export type SignInWithEmailAndPasswordFormValues = {
  email: string
  password: string
}

export type RequestVerificationEmailValues = {
  email: string
}

type FormSimpleInputProps<T extends FieldValues, P> = {
  label: string
  control: Control<T>
  name: P
  info?: string
  type?: 'password' | 'text'
  placeholder?: string
  error?: FieldError
  rightElement?: ReactNode
}

const FormSimpleInput = <T extends Record<string, string>, P extends FieldPath<T>>({
  name,
  label,
  control,
  info,
  placeholder,
  error,
  rightElement,
  type
}: FormSimpleInputProps<T, P>) => {
  const { field } = useController<T, P>({ name, control })

  return (
    <Flex data-testid={formSimpleInputTestId} {...outerCss}>
      <Text {...labelCss}>{label}</Text>
      {info ? <Text {...infoCss}>{info}</Text> : null}
      <InputWithTheme
        variant={InputVariant.Dark}
        isDisabled={false}
        size="md"
        onChange={field.onChange}
        value={field.value}
        name={field.name}
        // FIXME: Implement focus. Send input ref, so we can focus on input when error appear
        // inputRef={field.ref}
        placeholder={placeholder}
        onBlur={field.onBlur}
        rightElement={rightElement}
        type={type}
      />
      {error ? <Text {...errorCss}>{error.message}</Text> : null}
    </Flex>
  )
}

export default FormSimpleInput

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start'
}

const infoCss = {
  lineHeight: '1.1em',
  fontSize: '0.9em',
  color: SLIGHTLY_DARK_COLOR,
  marginBottom: '3px',
  marginTop: '3px'
}

const labelCss = {
  fontWeight: 'bold',
  fontSize: '1em',
  color: ColorCodes.DARK,
  margin: '10px 0px 0px 0px',
  width: '100%',
  justifyContent: 'start'
}

const errorCss = {
  color: ERROR_COLOR,
  fontSize: '0.8em',
  lineHeight: '1.0em',
  marginTop: '3px'
}
