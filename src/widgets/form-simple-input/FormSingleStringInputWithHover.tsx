import { type ChakraProps, Divider, Flex, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { type Control, type FieldPath, useController } from 'react-hook-form'
import { Shades } from '../../constants/shades'
import { InputVariant } from '../../theme/inputs/inputs-theme'
import { dividerCss } from '../../utils/styles'
import RequiredAsterisk from '../required-asterisk/RequiredAsterisk'
import SingleStringInput from './SingleStringInput'
import { useFormInputHover } from './useFormInputHover'

export const formSimpleInputTestId = 'form-simple-input'

type FormSingleStringInputWithHoverProps<T extends Record<string, unknown>, P extends FieldPath<T>> = {
  label: string
  control: Control<T>
  name: P
  info?: string
  type?: 'password' | 'text'
  placeholder?: string
  rightElement?: ReactNode
  isRequired?: boolean
  hoverId: string
}

const FormSingleStringInputWithHover = <T extends Record<string, unknown>, P extends FieldPath<T>>({
  name,
  label,
  control,
  info,
  placeholder,
  rightElement,
  type,
  isRequired,
  hoverId
}: FormSingleStringInputWithHoverProps<T, P>) => {
  const { showInput } = useFormInputHover({ hoverId })

  const {
    field,
    fieldState: { error }
  } = useController<T, P>({ name, control })
  const showIsRequired = isRequired && field.value === '' ? ' *' : ''

  // FIXME: Add focus to input when hovering over the hoverId!
  return (
    <Flex data-testid={formSimpleInputTestId} {...outerCss(showInput)} id={hoverId}>
      <Text {...labelCss(field.value === '')}>
        {label}
        {showIsRequired ? <RequiredAsterisk /> : null}
      </Text>
      <Divider {...dividerCss} />
      {info ? <Text {...infoCss}>{info}</Text> : null}

      <SingleStringInput
        placeholder={placeholder}
        error={error}
        rightElement={rightElement}
        type={type}
        field={field}
        isRequired={isRequired}
        variant={InputVariant.Hover}
      />
    </Flex>
  )
}

export default FormSingleStringInputWithHover

const outerCss = (showInput: boolean) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'start',
    justifyContent: 'start',
    marginBottom: '10px',
    backgroundColor: showInput ? 'white' : 'transparent',

    padding: '10px',
    borderRadius: '8px'
  }
}

const infoCss = {
  lineHeight: '1.1em',
  fontSize: '0.8em',
  color: Shades.SLIGHTLY_DARK,
  marginBottom: '3px',
  marginTop: '3px'
}

const labelCss = (isDark: boolean) => {
  return {
    fontWeight: 'bold',
    fontSize: '1em',
    color: isDark ? Shades.DARK : Shades.MEDIUM,
    margin: '10px 0px 0px 0px',
    width: '100%',
    justifyContent: 'start'
  }
}
