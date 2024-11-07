import { type ChakraProps, Divider, Flex, Text } from '@chakra-ui/react'
import { type Control, type FieldPath, useController } from 'react-hook-form'

import { useEffect, useState } from 'react'
import { Shades } from '../../constants/shades'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import InputWithTheme from '../../theme/inputs/InputWithTheme'
import { InputVariant } from '../../theme/inputs/inputs-theme'
import { dividerCss, errorCss } from '../../utils/styles'
import { useFormInputHover } from '../form-simple-input/useFormInputHover'
import RequiredAsterisk from '../required-asterisk/RequiredAsterisk'

type FormRadioInputWithHoverProps<T extends Record<string, unknown>, P extends FieldPath<T>> = {
  label: string
  control: Control<T>
  name: P
  existingOptions: string[]
  info?: string
  placeholder?: string
  isRequired?: boolean
  hoverId: string
}

const FormRadioInputWithHover = <T extends Record<string, unknown>, P extends FieldPath<T>>({
  name,
  label,
  control,
  info,
  placeholder,
  existingOptions,
  isRequired,
  hoverId
}: FormRadioInputWithHoverProps<T, P>) => {
  const { showInput } = useFormInputHover({ hoverId })
  const [currentItem, setCurrentItem] = useState('')

  const {
    field,
    fieldState: { error }
  } = useController<T, P>({ name, control })

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only run if showInput changes
  useEffect(() => {
    if (!showInput && field.value === currentItem) setCurrentItem('')
  }, [showInput])

  const selectExistingOption = (option: string) => {
    field.onChange(option)
    if (!existingOptions.some((item) => item === option)) {
      setCurrentItem(option)
    }
  }

  const onAddedItemChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event.target.value)
    setCurrentItem(event.target.value)
  }

  const showIsRequired = isRequired && field.value === '' ? ' *' : ''
  // FIXME: Should we instead NOT have empty strings in the form values?
  const isNotRequiredAndHasNoValue = !isRequired && !field.value
  const showError = !isNotRequiredAndHasNoValue && error

  const fieldValueIsInExistingOptions = existingOptions.some((item) => item === field.value)
  const newElementLabel =
    currentItem !== '' ? currentItem : field.value !== '' && !fieldValueIsInExistingOptions ? field.value : null

  return (
    <Flex {...outerCss(showInput)} id={hoverId}>
      <Text {...labelCss}>
        {label}
        {showIsRequired ? <RequiredAsterisk /> : null}
      </Text>
      {info ? <Text {...infoCss}>{info}</Text> : null}
      <Divider {...dividerCss} />

      <Flex {...innerCss}>
        {existingOptions.map((option) => {
          const isSelected = field.value === option

          return (
            <ButtonWithTheme
              key={`filter-button-${label}-${option}`}
              variant={ButtonVariant.SmallDark}
              onClick={() => selectExistingOption(option)}
              label={option.toUpperCase()}
              isToggled={isSelected}
            />
          )
        })}

        {newElementLabel ? (
          <ButtonWithTheme
            key={`filter-button-${label}-${currentItem}`}
            variant={ButtonVariant.SmallDark}
            onClick={() => selectExistingOption(newElementLabel as string)}
            label={(newElementLabel as string).toUpperCase()}
            isToggled={newElementLabel === field.value}
          />
        ) : null}
      </Flex>

      <Flex {...inputCss}>
        <InputWithTheme
          variant={InputVariant.Hover}
          isDisabled={false}
          size="md"
          onChange={onAddedItemChanged}
          value={currentItem}
          placeholder={placeholder}
          onBlur={field.onBlur}
        />
      </Flex>

      {showError ? <Text {...errorCss}>{error.message}</Text> : null}
    </Flex>
  )
}

export default FormRadioInputWithHover

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

const inputCss = {
  marginRight: '10px',
  width: '100%',
  marginTop: '10px'
}
