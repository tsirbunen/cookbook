import { type ChakraProps, Flex, Text } from '@chakra-ui/react'
import { type ForwardedRef, Fragment, forwardRef, useState } from 'react'
import { TbTrash } from 'react-icons/tb'
import { Shades } from '../../../constants/shades'
import ButtonWithTheme from '../../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../../theme/buttons/buttons-theme'
import InputWithTheme from '../../../theme/inputs/InputWithTheme'
import { InputVariant } from '../../../theme/inputs/inputs-theme'
import type { ErrorMap, ErrorMapOfErrorMaps, ErrorMaps } from '../../../utils/formValidators'
import { errorCss } from '../../../utils/styles'
import GroupTitleInput from './GroupTitleInput'
import { GroupType } from './GroupsInputWithHover'
import { formLabels } from './formLabels'
import { getUpdatedItems, getUpdatedItemsAfterDelete, itemIsEmpty } from './helpers'

export enum ItemField {
  Amount = 'amount',
  Unit = 'unit',
  Name = 'name',
  Content = 'content'
}

export type GeneralItem = {
  id?: number | null
  name?: string
  amount?: string | null
  unit?: string | null
  content?: string
}

export type GeneralItemGroup = {
  id?: number
  title: string
  items: GeneralItem[]
  uiKey: number
}

type GroupInputProps = {
  groupType: GroupType
  groupIndex: number
  itemGroup: GeneralItemGroup
  onTitleChanged: (newValue: string) => void
  onItemsChanged: (updatedItems: GeneralItem[]) => void
  showInput: boolean
  errors?: ErrorMaps
  ref?: ForwardedRef<Element>
}

const GroupInput = forwardRef(function GroupInput(
  { groupType, onItemsChanged, onTitleChanged, groupIndex, showInput, errors, itemGroup }: GroupInputProps,
  ref
) {
  const [items, setItems] = useState<GeneralItem[]>(itemGroup.items)

  const onFieldChanged = (newUnit: string, itemIndex: number, field: ItemField) => {
    const updated = getUpdatedItems(items, itemIndex, newUnit, field, groupType)
    setItems(updated)
    onItemsChanged(updated.filter((_, index) => index < updated.length - 1))
  }

  const onDeleteItem = (itemIndex: number) => {
    const isLast = itemIndex === items.length - 1
    if (isLast && itemIsEmpty(items[itemIndex])) return

    const updated = getUpdatedItemsAfterDelete(itemIndex, items, groupType)
    setItems(updated)
    onItemsChanged(updated.filter((_, index) => index < updated.length - 1))
  }

  const groupErrorMessage = (errors as ErrorMap)?.ingredients?.message

  return (
    <Flex {...outerCss}>
      <GroupTitleInput
        title={itemGroup.title}
        onChanged={onTitleChanged}
        showInput={showInput}
        titleError={(errors as ErrorMap)?.title?.message}
        ref={ref as ForwardedRef<Element>}
      />

      {items.map((item, index) => {
        const itemKey = `items-${index}-${groupType}`
        const showError = index !== items.length - 1
        const ingredientErrorMessage = showError
          ? (errors as ErrorMapOfErrorMaps)?.ingredients?.[index]?.name?.message
          : undefined

        return (
          <Flex key={`${itemKey}-outer`} {...ingredientEditingRowWithErrorCss}>
            <Flex {...ingredientEditingRowCss}>
              {groupType === GroupType.Ingredients ? (
                <Fragment>
                  <Flex {...inputCss(false)} key={`${itemKey}-0`}>
                    <InputWithTheme
                      variant={InputVariant.Hover}
                      isDisabled={false}
                      size="sm"
                      onChange={(event) => onFieldChanged(event.target.value, index, ItemField.Amount)}
                      value={item.amount ?? ''}
                      placeholder={formLabels.amountPlaceholder}
                    />
                  </Flex>
                  <Flex {...inputCss(false)} key={`${itemKey}-1`}>
                    <InputWithTheme
                      variant={InputVariant.Hover}
                      isDisabled={false}
                      size="sm"
                      onChange={(event) => onFieldChanged(event.target.value, index, ItemField.Unit)}
                      value={item.unit ?? ''}
                      placeholder={formLabels.unitPlaceholder}
                    />
                  </Flex>
                  <Flex {...inputCss(true)} key={`${itemKey}-2`}>
                    <InputWithTheme
                      variant={InputVariant.Hover}
                      isDisabled={false}
                      size="sm"
                      onChange={(event) => onFieldChanged(event.target.value, index, ItemField.Name)}
                      value={item.name ?? ''}
                      placeholder={formLabels.namePlaceholder}
                    />
                  </Flex>
                </Fragment>
              ) : (
                <Flex {...inputCss(true)} key={`${itemKey}-instruction`}>
                  <InputWithTheme
                    variant={InputVariant.Hover}
                    isDisabled={false}
                    size="sm"
                    onChange={(event) => onFieldChanged(event.target.value, index, ItemField.Content)}
                    value={item.content ?? ''}
                    placeholder={formLabels.contentPlaceholder}
                  />
                </Flex>
              )}

              {showInput ? (
                <Flex key={`thrash-${groupType}-${groupIndex}-${itemKey}`}>
                  <ButtonWithTheme
                    variant={ButtonVariant.SquareWithIconWithoutFill}
                    onClick={() => onDeleteItem(index)}
                    isToggled={true}
                    isDisabled={false}
                  >
                    <TbTrash />
                  </ButtonWithTheme>
                </Flex>
              ) : null}
            </Flex>

            {ingredientErrorMessage ? <Text {...errorCss}>{ingredientErrorMessage}</Text> : null}
          </Flex>
        )
      })}

      {groupErrorMessage ? <Text {...errorCss}>{groupErrorMessage}</Text> : null}
    </Flex>
  )
})

export default GroupInput

export const rowItemsStartCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'start' as ChakraProps['alignItems']
}

export const nameCss = (isPale: boolean) => {
  return {
    overflow: 'wrap',
    flex: 1,
    color: isPale ? Shades.SLIGHTLY_PALE : Shades.VERY_DARK
  }
}

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start',
  marginBottom: '10px',
  width: '100%',
  flex: 1
}

const ingredientEditingRowWithErrorCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start' as ChakraProps['alignItems'],
  width: '100%'
}

const ingredientEditingRowCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  marginTop: '2px',
  alignItems: 'center',
  width: '100%'
}

const inputCss = (isWide: boolean) => {
  return {
    flex: isWide ? 4 : 1,
    paddingRight: isWide ? '0px' : '5px'
  }
}
