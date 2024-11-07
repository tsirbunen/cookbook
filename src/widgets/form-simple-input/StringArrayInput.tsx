import { type ChakraProps, Flex, Text } from '@chakra-ui/react'
import { type ReactNode, useEffect, useState } from 'react'
import type { ControllerRenderProps, FieldError, FieldPath, FieldValues } from 'react-hook-form'
import { TbCircleCheck, TbTrash } from 'react-icons/tb'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import InputWithTheme from '../../theme/inputs/InputWithTheme'
import { InputVariant } from '../../theme/inputs/inputs-theme'
import { errorCss } from '../../utils/styles'

export enum ItemDisplayMode {
  WRAPPED = 'WRAPPED',
  COLUMN = 'Column'
}

type StringArrayInputProps<T extends FieldValues, P extends FieldPath<T>> = {
  placeholder?: string
  error?: FieldError[] | FieldError
  rightElement?: ReactNode
  type?: 'password' | 'text'
  field: ControllerRenderProps<T, P>
  validateField?: (value: keyof T) => void
}

const StringArrayInput = <T extends FieldValues, P extends FieldPath<T>>({
  placeholder,
  error,
  rightElement,
  type,
  field,
  validateField
}: StringArrayInputProps<T, P>) => {
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

  return (
    <Flex {...outerCss}>
      <Flex {...itemsBoxCss}>
        {currentItems.map((item, index) => {
          const key = `item-${index}`
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

      <Flex {...inputRowCss}>
        <Flex {...inputCss}>
          <InputWithTheme
            variant={InputVariant.Dark}
            isDisabled={false}
            size="md"
            onChange={onItemChanged}
            value={currentItems[currentItemIndex] ?? ''}
            placeholder={placeholder}
            onBlur={onBlur}
            rightElement={rightElement}
            type={type}
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
export default StringArrayInput

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start',
  width: '100%'
}

const inputCss = {
  marginRight: '10px',
  width: '100%'
}

const itemButtonCss = {
  marginRight: '5px',
  marginBottom: '5px'
}

const itemsBoxCss = {
  marginBottom: '10px',
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
