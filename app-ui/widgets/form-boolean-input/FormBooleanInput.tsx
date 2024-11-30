import { type ChakraProps, Divider, Flex, Text } from '@chakra-ui/react'
import { Fragment } from 'react'
import { type Control, type FieldPath, useController } from 'react-hook-form'
import { Shades } from '../../constants/shades'
import { dividerCss } from '../../utils/styles'
import { useFormInputHover } from '../form-simple-input/useFormInputHover'
import RequiredAsterisk from '../required-asterisk/RequiredAsterisk'
import SwitchToggleWithLabel from '../switch-toggle/SwitchToggleWithLabel'

type FormBooleanInputProps<T extends Record<string, unknown>, P extends FieldPath<T>> = {
  label: string
  control: Control<T>
  name: P
  info?: string
  isRequired?: boolean
  labelTrue: string
  labelFalse: string
  hoverId: string
}

const FormBooleanInput = <T extends Record<string, unknown>, P extends FieldPath<T>>({
  name,
  label,
  control,
  info,
  isRequired,
  labelTrue,
  labelFalse,
  hoverId
}: FormBooleanInputProps<T, P>) => {
  const { showInput } = useFormInputHover({ hoverId })

  const { field } = useController<T, P>({ name, control })
  const isStringArray = Array.isArray(field.value)
  if (isStringArray) return null

  const showIsRequired = isRequired && field.value === '' ? ' *' : ''
  return (
    <Flex {...outerCss} {...outerCss(showInput)} id={hoverId}>
      <Text {...labelCss}>
        {label}
        {showIsRequired ? <RequiredAsterisk /> : null}
      </Text>
      <Divider {...dividerCss} />
      {info ? <Text {...infoCss}>{info}</Text> : null}

      {showInput ? (
        <Fragment>
          <Flex {...innerCss}>
            <SwitchToggleWithLabel
              isChecked={field.value as boolean}
              onChange={field.onChange}
              emphasizedLabelChecked={labelTrue}
              emphasizedLabelNotChecked={labelFalse}
            />
          </Flex>
        </Fragment>
      ) : (
        <Flex {...simpleTextCss(field.value === '')}>
          <Text>{field.value ? 'YES' : 'NO'}</Text>
        </Flex>
      )}
    </Flex>
  )
}

export default FormBooleanInput

const outerCss = (showInput: boolean) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'start',
    justifyContent: 'start',
    marginBottom: '10px',
    backgroundColor: showInput ? 'white' : 'transparent',
    padding: '10px',
    borderRadius: '8px',
    flex: 1
  }
}
const simpleTextCss = (isPlaceholder: boolean) => {
  return {
    fontSize: isPlaceholder ? '1em' : '1.1em',
    fontWeight: isPlaceholder ? 'normal' : 'bold',
    color: isPlaceholder ? Shades.SLIGHTLY_DARK : Shades.DARK,
    margin: '5px 0px 0px 0px',
    width: '100%'
  }
}

const infoCss = {
  lineHeight: '1.1em',
  fontSize: '0.8em',
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

const innerCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  flexWrap: 'wrap' as ChakraProps['flexWrap'],
  display: 'flex'
}
