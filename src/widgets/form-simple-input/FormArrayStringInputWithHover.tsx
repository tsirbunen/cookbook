import { type ChakraProps, Divider, Flex, Text } from '@chakra-ui/react'
import { type Control, type FieldError, type FieldPath, useController } from 'react-hook-form'

import { type ReactNode, useEffect, useState } from 'react'
import { TbCircleCheck, TbTrash } from 'react-icons/tb'
import { Shades } from '../../constants/shades'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import InputWithTheme from '../../theme/inputs/InputWithTheme'
import { InputVariant } from '../../theme/inputs/inputs-theme'
import { dividerCss, errorCss } from '../../utils/styles'
import RequiredAsterisk from '../required-asterisk/RequiredAsterisk'
import { useFormInputHover } from './useFormInputHover'

export enum ItemDisplayMode {
  WRAPPED = 'WRAPPED',
  COLUMN = 'Column'
}

type FormArrayStringInputWithHoverProps<T extends Record<string, unknown>, P extends FieldPath<T>> = {
  placeholder?: string
  label: string
  info?: string
  control: Control<T>
  name: P
  rightElement?: ReactNode
  validateField?: (value: keyof T) => void
  hoverId: string
  isRequired?: boolean
}

const FormArrayStringInputWithHover = <T extends Record<string, unknown>, P extends FieldPath<T>>({
  name,
  label,
  control,
  placeholder,
  info,
  rightElement,
  isRequired,
  validateField,
  hoverId
}: FormArrayStringInputWithHoverProps<T, P>) => {
  const { showInput } = useFormInputHover({ hoverId })

  const {
    field,
    fieldState: { error }
  } = useController<T, P>({ name, control })
  const currentItems = (field.value as string[]) ?? []
  const [currentItemIndex, setCurrentItemIndex] = useState(currentItems.length)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    selectItemWithErrorAndFocusOnIt(currentItemIndex, isEditing, error)
  }, [error, currentItemIndex, isEditing])

  const selectItemWithErrorAndFocusOnIt = (
    indexNow: number,
    isEditingItem: boolean,
    itemsError?: FieldError[] | FieldError
  ) => {
    if (!itemsError) return
    if (isEditingItem) return

    if (!Array.isArray(error)) {
      // In case there is a single error, then the error involves more than one item.
      // It is not obvious, which item we should focus on.
      const itemsContainDuplicates = currentItems.length !== new Set(currentItems).size
      if (itemsContainDuplicates) {
        const itemIndexes = currentItems.reduce(
          // FIXME: Find the rule that requires next line here so that we need not force to next line
          // with a comment to silence biome linting error
          (acc, item, index) => {
            acc[item] ??= []
            acc[item].push(index)
            return acc
          },
          {} as Record<string, number[]>
        )
        const duplicatedItemIndexes = Object.entries(itemIndexes).find(([_, indexes]) => indexes.length > 1)?.[1]
        if (duplicatedItemIndexes) setCurrentItemIndex(duplicatedItemIndexes[1])
      } else {
        setCurrentItemIndex(currentItems.length)
      }

      return
    }

    const indexOfFirstError = (itemsError as FieldError[])?.findIndex((err) => err?.message) ?? -1
    if (indexOfFirstError === -1) return

    if (indexOfFirstError !== indexNow) {
      setCurrentItemIndex(indexOfFirstError)
    }
  }

  const onItemChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) setIsEditing(true)

    const valueWithoutSpaces = event.target.value.trim().toUpperCase()
    const shouldRemoveItem = valueWithoutSpaces === ''
    if (shouldRemoveItem) {
      deleteItem()
      return
    }

    const updatedItems =
      currentItemIndex === currentItems.length
        ? [...currentItems, valueWithoutSpaces]
        : currentItems.map((item, index) => (index === currentItemIndex ? valueWithoutSpaces : item))

    field.onChange(updatedItems)
  }

  const selectItemToEdit = (index: number) => {
    setCurrentItemIndex(index)
  }

  const onFocus = () => {
    setIsEditing(true)
  }

  const onBlur = () => {
    if (validateField) {
      validateField(field.name)
    }
    setIsEditing(false)

    setCurrentItemIndex(currentItems.length)
    field.onBlur()
  }

  const deleteItem = () => {
    const updatedItems = currentItems.filter((_, i) => i !== currentItemIndex)
    setCurrentItemIndex(updatedItems.length)
    field.onChange(updatedItems)
  }

  const getErrorToDisplay = (index: number) => {
    if (!error) return
    if (!Array.isArray(error)) return error.message
    return error[index]?.message
  }

  const errorToDisplay = getErrorToDisplay(currentItemIndex)
  const showIsRequired = isRequired && field.value === '' ? ' *' : ''

  return (
    <Flex {...outerCss} {...outerCss(showInput)} id={hoverId}>
      <Text {...labelCss((field.value as Array<object>).length === 0)}>
        {label}
        {showIsRequired ? <RequiredAsterisk /> : null}
      </Text>
      <Divider {...dividerCss} key={'ingredients-divider'} />
      {info ? <Text {...infoCss}>{info}</Text> : null}
      {currentItems.length ? (
        <Flex {...itemsBoxCss}>
          {currentItems.map((item, index) => {
            const key = `items-${index}`
            return (
              <Flex {...itemButtonCss} key={key}>
                <ButtonWithTheme
                  variant={ButtonVariant.Pale}
                  label={`#${item.toUpperCase()}`}
                  isSubmit={true}
                  onClick={() => selectItemToEdit(index)}
                />
              </Flex>
            )
          })}
        </Flex>
      ) : null}

      <Flex {...inputRowCss}>
        <Flex {...inputCss}>
          <InputWithTheme
            variant={InputVariant.Hover}
            isDisabled={false}
            size="md"
            onChange={onItemChanged}
            value={currentItems[currentItemIndex] ?? ''}
            placeholder={placeholder}
            onBlur={onBlur}
            rightElement={rightElement}
            onFocus={onFocus}
          />
        </Flex>

        <Flex {...iconButtonCss}>
          <ButtonWithTheme
            variant={ButtonVariant.SquareWithIconWithoutFill}
            onClick={deleteItem}
            isToggled={true}
            isDisabled={false}
          >
            <TbTrash />
          </ButtonWithTheme>
        </Flex>

        <ButtonWithTheme
          variant={ButtonVariant.SquareWithIconWithoutFill}
          onClick={onBlur}
          isToggled={true}
          isDisabled={false}
        >
          <TbCircleCheck />
        </ButtonWithTheme>
      </Flex>

      {errorToDisplay ? <Text {...errorCss}>{errorToDisplay}</Text> : null}
    </Flex>
  )
}
export default FormArrayStringInputWithHover

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

const inputCss = {
  marginRight: '10px',
  width: '100%'
}

const itemButtonCss = {
  marginRight: '5px',
  marginBottom: '5px'
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

const itemsBoxCss = {
  flexWrap: 'wrap' as ChakraProps['flexWrap'], // Allow items to wrap to the next line
  display: 'flex'
}

const iconButtonCss = {
  marginRight: '5px'
}

const inputRowCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  width: '100%'
}
