import { ChakraProps, Flex } from '@chakra-ui/react'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import { ChangeEvent, useEffect, useState } from 'react'
import { TbTrash } from 'react-icons/tb'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import Title, { TitleVariant } from '../titles/Title'
import CardRadioButtonSelector from '../card-radio-button-selector/CardRadioButtonSelector'
import TextAreaWithTheme from '../../theme/textareas/TextAreaWithTheme'
import { TextAreaVariant } from '../../theme/textareas/textareas-theme'

export enum SearchMode {
  'AND' = 'AND',
  'OR' = 'OR'
}

export type TextAreaSearchValues = {
  searchTerm: string
  searchMode: SearchMode | undefined
}

type FormTextAreaSearchProps<TextAreaSearchValues extends FieldValues, T> = {
  label: string
  control: Control<TextAreaSearchValues>
  name: T
  placeholder: string
}

const searchModeOptions = [
  { label: 'AND', value: SearchMode.AND },
  { label: 'OR', value: SearchMode.OR }
]

const FormTextAreaSearch = <TextAreaSearchValues extends FieldValues, T extends FieldPath<TextAreaSearchValues>>({
  label,
  name,
  control,
  placeholder
}: FormTextAreaSearchProps<TextAreaSearchValues, T>) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchMode, setSearchMode] = useState<SearchMode | undefined>(undefined)
  const { field } = useController<TextAreaSearchValues, T>({ name, control })

  useEffect(() => {
    setSearchTerm(field.value.searchTerm)
    setSearchMode(field.value.searchMode)
  }, [field])

  const updateSearchTerm = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const searchTermNewValue = event.target.value.trim()
    const searchModeValue = searchTermNewValue.length > 0 ? (searchMode ? searchMode : SearchMode.OR) : undefined
    field.onChange({ searchTerm: searchTermNewValue, searchMode: searchModeValue })
  }

  const clearSearchTerm = () => {
    setSearchTerm('')
    setSearchMode(undefined)
    field.onChange({ searchTerm: '', searchMode: undefined })
  }

  const toggleSearchMode = () => {
    const newMode = searchMode === SearchMode.AND ? SearchMode.OR : SearchMode.AND
    field.onChange({ searchTerm, searchMode: newMode })
  }

  const clearingIsDisabled = searchTerm.length === 0

  return (
    <Flex {...outerCss}>
      <Title title={label.toUpperCase()} variant={TitleVariant.Small} />

      <Flex {...innerCss}>
        <Flex {...inputCss}>
          <TextAreaWithTheme
            variant={TextAreaVariant.Search}
            value={searchTerm}
            onChange={updateSearchTerm}
            placeholder={placeholder}
          />
        </Flex>

        <Flex {...toolsCss}>
          <ButtonWithTheme
            variant={ButtonVariant.SquareWithIcon}
            onClick={clearSearchTerm}
            isToggled={!clearingIsDisabled}
            isDisabled={clearingIsDisabled}
          >
            <TbTrash />
          </ButtonWithTheme>

          <CardRadioButtonSelector
            options={searchModeOptions}
            currentValue={searchMode}
            selectValue={toggleSearchMode}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FormTextAreaSearch

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  marginLeft: '15px'
}

const innerCss = {
  flexDirection: 'row' as ChakraProps['flexDirection']
}

const inputCss = {
  flex: 1,
  flexDirection: 'row' as ChakraProps['flexDirection']
}

const toolsCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  justifyContent: 'center',
  alignItems: 'center'
}
