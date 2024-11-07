import { type ChakraProps, Divider, Flex, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { type Control, type FieldError, type FieldPath, useController } from 'react-hook-form'
import { Shades } from '../../../constants/shades'
import type { ErrorMapArrays } from '../../../utils/formValidators'
import { errorCss } from '../../../utils/styles'
import { useFormInputHover } from '../../../widgets/form-simple-input/useFormInputHover'
import RequiredAsterisk from '../../../widgets/required-asterisk/RequiredAsterisk'
import GroupInput, { type GeneralItem } from './GroupInput'
import type { IngredientGroupInputType, InstructionGroupInputType } from './WizardPage'
import {
  getFormFieldsWithUpdatedItemsChanged,
  getFormGroupInputsAfterGroupTitleChanged,
  getNewGroup,
  getUpdatedFormFieldItems,
  groupToGeneralItemGroup
} from './helpers'

export enum GroupType {
  Ingredients = 'Ingredients',
  Instructions = 'Instructions'
}

type GroupsInputWithHoverProps<T extends Record<string, unknown>, P extends FieldPath<T>> = {
  groupType: GroupType
  label: string
  control: Control<T>
  name: P
  info?: string
  isRequired?: boolean
  hoverId: string
  errors?: FieldError | ErrorMapArrays
}

const GroupsInputWithHover = <
  T extends Record<string, unknown>,
  P extends FieldPath<T>,
  V extends IngredientGroupInputType & InstructionGroupInputType
>({
  groupType,
  name,
  label,
  control,
  info,
  isRequired,
  hoverId,
  errors
}: GroupsInputWithHoverProps<T, P>) => {
  const { field } = useController<T, P>({ name, control })
  const { showInput } = useFormInputHover({
    hoverId: hoverId
  })
  const [focusTitleIndex, setFocusTitleIndex] = useState<number | null>(null)
  const titleRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // This workaround is to set the focus back to a group title after creating a new group
    if (focusTitleIndex !== null) {
      titleRef.current?.focus()
    }
  }, [focusTitleIndex])

  const onTitleChanged = (groupIndex: number, newTitle: string) => {
    const updatedGroups = getFormGroupInputsAfterGroupTitleChanged(newTitle, field.value as V[], groupIndex, groupType)
    field.onChange(updatedGroups)
    setFocusTitleIndex(groupIndex)
  }

  const onItemsChanged = (groupIndex: number, updatedItems: GeneralItem[]) => {
    const updatedFormItems = getUpdatedFormFieldItems(updatedItems)
    const updated = getFormFieldsWithUpdatedItemsChanged(
      field.value as IngredientGroupInputType[] | InstructionGroupInputType[],
      groupIndex,
      updatedFormItems,
      groupType
    )
    field.onChange(updated)
  }

  const showIsRequired = isRequired && !(field.value as V[]).length ? ' *' : ''
  const groupErrorMessage = (errors as FieldError)?.message
  const groups = [...((field.value as V[]) ?? []), getNewGroup(groupType)]

  return (
    <Flex {...outerCss(showInput)} id={hoverId}>
      <Text {...labelCss}>
        {label.toUpperCase()}
        {showIsRequired ? <RequiredAsterisk /> : null}
      </Text>
      <Divider {...dividerCss} key={`${label}-divider`} />
      <Text {...infoCss}>{info}</Text>

      {groups.map((group, groupIndex) => {
        // Note: We need a group specific key that does not change on group content changes so that we can
        // update the groups correctly in the case a group is deleted
        return (
          <GroupInput
            key={`${group.uiKey}`}
            groupType={groupType}
            onTitleChanged={(newValue) => onTitleChanged(groupIndex, newValue)}
            groupIndex={groupIndex}
            showInput={showInput}
            errors={(errors as ErrorMapArrays)?.[groupIndex] ?? {}}
            itemGroup={groupToGeneralItemGroup(group, groupType)}
            onItemsChanged={(newValues) => onItemsChanged(groupIndex, newValues)}
            ref={groupIndex === focusTitleIndex ? titleRef : undefined}
          />
        )
      })}

      {groupErrorMessage ? <Text {...errorCss}>{groupErrorMessage}</Text> : null}
    </Flex>
  )
}

export default GroupsInputWithHover

const dividerCss = {
  marginTop: '2px',
  marginBottom: '2px',
  borderColor: Shades.MEDIUM,
  borderWidth: '1.0px',
  variant: 'dashed'
}

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

const outerCss = (showInput: boolean) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'start',
    justifyContent: 'start',
    marginBottom: '10px',
    backgroundColor: showInput ? 'white' : 'transparent',
    padding: '10px',
    borderRadius: '8px',
    width: '100%',
    flex: 1
  }
}

const infoCss = {
  lineHeight: '1.1em',
  fontSize: '0.8em',
  color: Shades.SLIGHTLY_DARK,
  marginBottom: '15px',
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
