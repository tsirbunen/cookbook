import { IngredientGroupInput } from '../../modules/types.generated'
import { ingredientGroups, ingredients } from '../../database/database-schemas/ingredients'
import { IngredientGroupInsert, DatabaseType, IngredientInsert } from '../../database/inferred-types/inferred-types'
import { getGroupInputs, getNonFirstGroupElementIds, setPreviousIds } from '../utils/utils'

export const handleCreateIngredients = async (
  trx: DatabaseType,
  inputs: IngredientGroupInput[],
  newRecipeId: number
) => {
  const groupInputs: IngredientGroupInsert[] = getGroupInputs(inputs, newRecipeId)
  const newIngredientGroups = await trx.insert(ingredientGroups).values(groupInputs).returning()

  const ingredientInputs = getIngredientInputs(inputs, newIngredientGroups)
  const newIngredients = await trx.insert(ingredients).values(ingredientInputs).returning()
  const toUpdateIds = getNonFirstGroupElementIds(newIngredients)
  await setPreviousIds(toUpdateIds, 'ingredients', trx)
}

const getIngredientInputs = (groups: IngredientGroupInput[], newGroups: IngredientGroupInsert[]) => {
  const inputsByGroup: Record<string, IngredientInsert[]> = {}

  groups.forEach((group, groupIndex: number) => {
    inputsByGroup[groupIndex] = []
    for (const ingredient of group.ingredients!) {
      inputsByGroup[groupIndex].push({ ...ingredient, groupId: newGroups[groupIndex].id })
    }
  })

  return Object.values(inputsByGroup).flat()
}
