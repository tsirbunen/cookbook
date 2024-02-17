import { Flex, ChakraProps } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import Title, { TitleVariant } from '../titles/Title'
import { isEqual } from 'lodash'

export const formButtonsSelectorDataTestId = 'form-buttons-selector'
export type FormButtonsSelectorValue = string[]

export type FormButtonsSelectorProps<FormButtonsSelectorValue extends FieldValues, T> = {
  label: string
  control: Control<FormButtonsSelectorValue>
  name: T
  options: string[]
}

const FormButtonsSelector = <
  FormButtonsSelectorValue extends FieldValues,
  T extends FieldPath<FormButtonsSelectorValue>
>({
  label,
  control,
  name,
  options
}: FormButtonsSelectorProps<FormButtonsSelectorValue, T>) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const { field } = useController<FormButtonsSelectorValue, T>({ name, control })

  useEffect(() => {
    // Note: This is only to detect form reset performed in parent from component.
    if (!isEqual(field.value, selectedOptions)) {
      setSelectedOptions(field.value)
    }
  }, [field])

  const selectOption = (option: string) => {
    const shouldDelete = selectedOptions.includes(option)
    const updated = shouldDelete ? selectedOptions.filter((o) => o !== option) : [...selectedOptions, option]
    setSelectedOptions([...updated])
    field.onChange([...updated])
  }

  return (
    <Flex {...outerCss} data-testid={formButtonsSelectorDataTestId}>
      <Title title={label.toUpperCase()} variant={TitleVariant.Small} />

      <Flex {...innerCss}>
        {options.map((option) => {
          return (
            <ButtonWithTheme
              key={`filter-button-${label}-${option}`}
              variant={ButtonVariant.SmallDark}
              onClick={() => selectOption(option)}
              label={option.toUpperCase()}
              isToggled={selectedOptions.includes(option)}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default FormButtonsSelector

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  margin: '15px'
}

const innerCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  flexWrap: 'wrap' as ChakraProps['flexWrap'],
  display: 'flex'
}
