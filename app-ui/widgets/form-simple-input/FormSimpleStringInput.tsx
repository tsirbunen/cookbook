import { type ChakraProps, Flex, Text } from '@chakra-ui/react'
import { type Control, type FieldPath, useController } from 'react-hook-form'

import type { ReactNode } from 'react'
import { Shades } from '../../constants/shades'
import RequiredAsterisk from '../required-asterisk/RequiredAsterisk'
import SingleStringInput from './SingleStringInput'
import StringArrayInput from './StringArrayInput'

export const formSimpleInputTestId = 'form-simple-input'

type FormSimpleStringInputProps<T extends Record<string, unknown>, P extends FieldPath<T>> = {
  label: string
  control: Control<T>
  name: P
  info?: string
  type?: 'password' | 'text'
  placeholder?: string
  rightElement?: ReactNode
  isRequired?: boolean
  validateField?: (value: keyof T) => void
}

const FormSimpleStringInput = <T extends Record<string, unknown>, P extends FieldPath<T>>({
  name,
  label,
  control,
  info,
  placeholder,
  rightElement,
  type,
  isRequired,
  validateField
}: FormSimpleStringInputProps<T, P>) => {
  const {
    field,
    fieldState: { error }
  } = useController<T, P>({ name, control })
  const showIsRequired = isRequired && field.value === '' ? ' *' : ''
  const isStringArray = Array.isArray(field.value)

  return (
    <Flex data-testid={formSimpleInputTestId} {...outerCss}>
      <Text {...labelCss}>
        {label}
        {showIsRequired ? <RequiredAsterisk /> : null}
      </Text>
      {info ? <Text {...infoCss}>{info}</Text> : null}
      {isStringArray ? (
        <StringArrayInput
          placeholder={placeholder}
          error={error}
          rightElement={rightElement}
          type={type}
          field={field}
          validateField={validateField}
        />
      ) : (
        <SingleStringInput
          placeholder={placeholder}
          error={error}
          rightElement={rightElement}
          type={type}
          field={field}
          isRequired={isRequired}
        />
      )}
    </Flex>
  )
}

export default FormSimpleStringInput

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start',
  marginBottom: '10px'
}

const infoCss = {
  lineHeight: '1.1em',
  fontSize: '0.9em',
  color: Shades.SLIGHTLY_DARK,
  marginBottom: '3px',
  marginTop: '3px'
}

const labelCss = {
  fontWeight: 'bold',
  fontSize: '1em',
  color: Shades.DARK,
  margin: '10px 0px 0px 0px',
  width: '100%',
  justifyContent: 'start'
}
