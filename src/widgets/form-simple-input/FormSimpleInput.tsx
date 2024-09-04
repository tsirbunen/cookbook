import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import InputWithTheme from '../../theme/inputs/InputWithTheme'
import { InputVariant } from '../../theme/inputs/inputs-theme'
import { SLIGHTLY_DARK_COLOR } from '../../constants/color-codes'
import { ColorCodes } from '../../theme/theme'

export const formSimpleInputTestId = 'form-simple-input'

export type CreateAccountFormValues = {
  username: string
  phoneNumber: string
}

export type SignInFormValues = {
  phoneNumber: string
}

export type VerificationFormValues = {
  code: string
}

type FormSimpleInputProps<T extends FieldValues, P> = {
  label: string
  control: Control<T>
  name: P
  info?: string
  type?: 'password' | 'text'
  placeholder?: string
}

const FormSimpleInput = <T extends Record<string, string>, P extends FieldPath<T>>({
  name,
  label,
  control,
  info,
  placeholder
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
        // inputRef={field.ref} // send input ref, so we can focus on input when error appear
        placeholder={placeholder}
      />
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
