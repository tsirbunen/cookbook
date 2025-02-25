import { type CreateRecipeInput, type Recipe, ValidationTarget } from '../../../types/graphql-schema-types.generated'
import type { AccountInfo, JSONSchemaType } from '../../../types/types'
import type { GeneralItem, GeneralItemGroup, ItemField } from './GroupInput'
import { GroupType } from './GroupsInputWithHover'
import type {
  CreateOrModifyRecipeFormValues,
  IngredientGroupInputType,
  IngredientInput,
  InstructionGroupInputType,
  InstructionInput
} from './WizardPage'

const emptyIngredient = { amount: '', unit: '', name: '' }
const emptyInstruction = { content: '' }
const initialFormValues: CreateOrModifyRecipeFormValues = {
  title: '',
  description: null,
  tags: [],
  language: '',
  ovenNeeded: false,
  isPrivate: false,
  ingredientGroups: [],
  instructionGroups: []
}

export enum RecipeMode {
  CREATE = 'CREATE',
  EDIT_OWN = 'EDIT_OWN',
  EDIT_OTHER = 'EDIT_OTHER'
}

export const getMode = (isMyRecipe?: boolean, recipeId?: string) => {
  return isMyRecipe ? RecipeMode.EDIT_OWN : recipeId ? RecipeMode.EDIT_OTHER : RecipeMode.CREATE
}

export const getExistingRecipe = (recipes: Recipe[], recipeId?: string) => {
  return recipeId ? recipes.filter((recipe) => recipe.id === Number(recipeId))?.[0] : undefined
}

export const getIsMyRecipe = (existingRecipe?: Recipe, account?: AccountInfo | null) => {
  return !!existingRecipe && existingRecipe.authorId === account?.id
}

export const getValidationSchema = (
  recipeId?: string,
  validationSchemas?: Record<ValidationTarget, JSONSchemaType> | null
) => {
  const schemaType = !recipeId ? ValidationTarget.CreateRecipeInput : ValidationTarget.PatchRecipeInput
  return validationSchemas?.[schemaType]
}

export const getInitialFormValues = (
  recipeId: string | undefined,
  existingRecipe: Recipe | undefined,
  isMyRecipe: boolean
): CreateOrModifyRecipeFormValues => {
  if (!recipeId) return initialFormValues
  if (!existingRecipe) return initialFormValues

  return {
    title: existingRecipe.title,
    description: existingRecipe.description ?? null,
    tags: existingRecipe.tags?.map((tag) => tag.tag) ?? [],
    language: existingRecipe.language.language ?? '',
    ovenNeeded: existingRecipe.ovenNeeded,
    isPrivate: existingRecipe.isPrivate ?? false,
    ingredientGroups: existingRecipe.ingredientGroups.map((group) => ({
      id: isMyRecipe ? group.id : undefined,
      title: group.title ?? '',
      ingredients: group.ingredients.map((item) => {
        return {
          id: isMyRecipe ? item.id : undefined,
          amount: item.amount ?? null,
          unit: item.unit ?? '',
          name: item.name ?? ''
        }
      }),
      uiKey: Math.random()
    })),
    instructionGroups: existingRecipe.instructionGroups.map((group) => ({
      id: isMyRecipe ? group.id : undefined,
      title: group.title ?? '',
      instructions: group.instructions.map((item) => {
        return {
          id: isMyRecipe ? item.id : undefined,
          content: item.content ?? ''
        }
      }),
      uiKey: Math.random()
    }))
  }
}

export const getNewGroup = (groupType: GroupType, title?: string) => {
  const newGroup = { title: title ?? '', uiKey: Math.random() }
  return groupType === GroupType.Ingredients
    ? { ...newGroup, ingredients: [{ name: '' }] }
    : { ...newGroup, instructions: [{ content: '' }] }
}

export const itemToGeneralItem = (item: IngredientInput | InstructionInput, groupType: GroupType): GeneralItem => {
  if (groupType === GroupType.Ingredients) {
    const { id, amount, unit, name } = item as IngredientInput

    return {
      id,
      amount: `${amount ?? ''}`,
      unit: unit ?? '',
      name: name ?? ''
    }
  }

  return {
    id: item.id,
    content: (item as InstructionInput).content ?? ''
  }
}

export const groupToGeneralItemGroup = (
  group: IngredientGroupInputType | InstructionGroupInputType,
  groupType: GroupType
): GeneralItemGroup => {
  const itemsFrom =
    groupType === GroupType.Ingredients
      ? (group as IngredientGroupInputType).ingredients
      : (group as InstructionGroupInputType).instructions
  const items = itemsFrom?.map((item) => itemToGeneralItem(item, groupType)) ?? []

  return {
    id: group.id,
    title: group.title,
    items,
    uiKey: group.uiKey
  }
}

const getFormattedNewItemValue = (newValue: string, changedField: keyof GeneralItem, originalValue?: string | null) => {
  if (changedField !== 'amount') return newValue

  const formattedNewAmount = newValue.trim().replace(',', '.')
  if (formattedNewAmount === '') return ''
  if (formattedNewAmount === '.') return '0.'
  const isANumber = /^(\d+)?[.]?(\d+)?$/.test(formattedNewAmount)
  if (isANumber) return formattedNewAmount
  return originalValue
}
export const itemIsEmpty = <V>(item: V) => {
  return (
    !(item as GeneralItem).amount &&
    !(item as GeneralItem).unit &&
    !(item as GeneralItem).name &&
    !(item as GeneralItem).content
  )
}

const getShouldAddNewEmptyLastItem = (index: number, items: GeneralItem[], updatedItems: GeneralItem[]): boolean => {
  const lastItem = updatedItems[updatedItems.length - 1]
  return index === items.length - 1 && !itemIsEmpty(lastItem)
}

export const getUpdatedItems = (
  items: GeneralItem[],
  itemIndex: number,
  newValue: string,
  changedField: ItemField,
  groupType: GroupType
): GeneralItem[] => {
  const formattedNewValue = getFormattedNewItemValue(
    newValue,
    changedField,
    changedField === 'amount' ? items[itemIndex][changedField] : undefined
  )

  const updatedItems = items.map((item, index) =>
    index === itemIndex ? { ...item, [changedField]: formattedNewValue } : item
  )

  if (getShouldAddNewEmptyLastItem(itemIndex, items, updatedItems)) {
    const emptyItem = groupType === GroupType.Ingredients ? { ...emptyIngredient } : { ...emptyInstruction }
    updatedItems.push(emptyItem)
  }

  return updatedItems
}

const itemToFormFieldInput = (item: GeneralItem) => {
  const updatedItem: Partial<IngredientInput & InstructionInput> = {}

  for (const [key, value] of Object.entries(item)) {
    if (key === 'amount') updatedItem[key] = !value ? null : Number.parseFloat(value as string)
    else if (key === 'unit') updatedItem[key] = !value ? null : (value as string)
    else if (key === 'name' || key === 'content') updatedItem[key] = value as string
  }

  return updatedItem
}

export const getUpdatedFormFieldItems = (updatedItems: GeneralItem[]) => {
  return updatedItems.map((item) => itemToFormFieldInput(item)) as IngredientInput[] | InstructionInput[]
}

export const getFormFieldsWithUpdatedItemsChanged = (
  groups: IngredientGroupInputType[] | InstructionGroupInputType[],
  groupIndex: number,
  updatedFormItems: IngredientInput[] | InstructionInput[],
  groupType: GroupType
) => {
  const updatedGroups = groups.map((group, index) => {
    if (index !== groupIndex) return group
    return (group as IngredientGroupInputType).ingredients
      ? { ...group, ingredients: updatedFormItems }
      : { ...group, instructions: updatedFormItems }
  })

  if (groupIndex === groups.length) {
    const emptyGroup = getNewGroup(groupType)
    updatedGroups.push(emptyGroup)
  }

  return updatedGroups
}

export const getUpdatedItemsAfterDelete = (itemIndex: number, items: GeneralItem[], groupType: GroupType) => {
  const isFirstAndOnly = itemIndex === 0 && items.length === 1
  const emptyItem = groupType === GroupType.Ingredients ? { ...emptyIngredient } : { ...emptyInstruction }
  return isFirstAndOnly ? [{ ...emptyItem }] : items.filter((_, index) => index !== itemIndex)
}

const getFormInputsAreEmpty = (items: IngredientInput[] | InstructionInput[]) => {
  return items.every(itemIsEmpty)
}

export const getFormGroupInputsAfterGroupTitleChanged = (
  newTitle: string,
  formGroups: IngredientGroupInputType[] | InstructionGroupInputType[],
  groupIndex: number,
  groupType: GroupType
) => {
  const updatedGroup = { ...formGroups[groupIndex], title: newTitle }
  const items =
    groupType === GroupType.Ingredients
      ? (updatedGroup as IngredientGroupInputType).ingredients
      : (updatedGroup as InstructionGroupInputType).instructions

  const shouldRemoveThisGroup = newTitle === '' && getFormInputsAreEmpty(items)
  if (shouldRemoveThisGroup) return formGroups.filter((_, index) => index !== groupIndex)

  const updatedGroups = formGroups.map((group, index) => {
    return index === groupIndex ? { ...group, title: newTitle } : group
  })

  if (groupIndex === formGroups.length) updatedGroups.push(getNewGroup(groupType, newTitle))

  return updatedGroups
}

const groupsWithoutUiKeys = (groups: IngredientGroupInputType[] | InstructionGroupInputType[]) => {
  return groups.map(({ uiKey: _uiKey, ...group }) => group)
}

export const formDataToRecipeInput = (
  formData: CreateOrModifyRecipeFormValues,
  authorId: number,
  photoIdentifiers?: string[]
): CreateRecipeInput => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, title, description, tags, language, ovenNeeded, isPrivate, ingredientGroups, instructionGroups } =
    formData

  return {
    authorId,
    title,
    description,
    tags,
    photoIdentifiers: photoIdentifiers?.length ? photoIdentifiers : [],
    language,
    ovenNeeded,
    isPrivate,
    ingredientGroups: groupsWithoutUiKeys(ingredientGroups) as CreateRecipeInput['ingredientGroups'],
    instructionGroups: groupsWithoutUiKeys(instructionGroups) as CreateRecipeInput['instructionGroups']
  }
}

export const getFormValuesPopulatedWithIds = (
  formData: CreateOrModifyRecipeFormValues,
  recipe: Recipe
): CreateOrModifyRecipeFormValues => {
  return {
    ...formData,
    ingredientGroups: formData.ingredientGroups.map((group, groupIndex) => {
      const savedGroup = recipe.ingredientGroups[groupIndex]
      return {
        id: savedGroup.id,
        title: group.title,
        ingredients: group.ingredients.map((item, itemIndex) => {
          const savedItem = savedGroup.ingredients[itemIndex]
          return {
            ...item,
            id: savedItem.id
          }
        }),
        uiKey: group.uiKey
      }
    }),
    instructionGroups: formData.instructionGroups.map((group, groupIndex) => {
      const savedGroup = recipe.instructionGroups[groupIndex]
      return {
        id: savedGroup.id,
        title: group.title,
        instructions: group.instructions.map((item, itemIndex) => {
          const savedItem = savedGroup.instructions[itemIndex]
          return {
            ...item,
            id: savedItem.id
          }
        }),
        uiKey: group.uiKey
      }
    })
  }
}
