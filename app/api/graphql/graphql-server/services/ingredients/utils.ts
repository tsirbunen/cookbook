import { eq, inArray } from 'drizzle-orm'
import { ingredientGroups, ingredients } from '../../database/database-schemas/ingredients'
import type {
  DatabaseType,
  IngredientDBSelect,
  IngredientGroupDBSelect,
  IngredientInsert,
  RecipeSelectDBExpanded
} from '../../database/inferred-types/inferred-types'
import type { IngredientGroupInput, IngredientInput } from '../../modules/types.generated'

export const handleCreateOrPatchIngredientGroupsAndTheirIngredients = async (
  trx: DatabaseType,
  recipeId: number,
  newOrPatchedIngredientGroups: IngredientGroupInput[],
  originalIngredientGroups?: RecipeSelectDBExpanded['ingredientGroups']
) => {
  // Let's assume that the ingredient groups are in the same order as in the original recipe
  // (i.e. that the order of GROUPS cannot be changed in any UI and that if new GROUPS are added,
  // those are added at the end)
  const loopMax = Math.max(newOrPatchedIngredientGroups.length, originalIngredientGroups?.length ?? 0)
  for (let i = 0; i < loopMax; i++) {
    const newOrPatchedGroup = newOrPatchedIngredientGroups[i]
    const originalGroup = originalIngredientGroups?.[i]
    await handleCreateOrPatchIngredientGroupAndItsIngredients(trx, recipeId, newOrPatchedGroup, originalGroup)
  }
}

const handleCreateOrPatchIngredientGroupAndItsIngredients = async (
  trx: DatabaseType,
  recipeId: number,
  newOrPatchedGroup?: IngredientGroupInput,
  originalGroup?: IngredientGroupDBSelect & { ingredients: IngredientDBSelect[] }
) => {
  const groupId = await createOrPatchIngredientGroup(trx, recipeId, newOrPatchedGroup, originalGroup)
  await createPatchOrDeleteIngredients(trx, groupId, newOrPatchedGroup, originalGroup)
}

const createOrPatchIngredientGroup = async (
  trx: DatabaseType,
  recipeId: number,
  newOrPatchedGroup?: IngredientGroupInput,
  originalGroup?: IngredientGroupDBSelect
) => {
  let groupId: number
  if (!originalGroup) {
    const group = await createIngredientGroup(trx, { recipeId, title: newOrPatchedGroup?.title })
    groupId = group.insertedId
  } else {
    if (newOrPatchedGroup?.title) {
      await patchIngredientGroup(trx, originalGroup.id, { title: newOrPatchedGroup.title })
    }
    groupId = originalGroup.id
  }

  return groupId
}

const createPatchOrDeleteIngredients = async (
  trx: DatabaseType,
  groupId: number,
  newOrPatchedGroup?: IngredientGroupInput,
  originalGroup?: IngredientGroupDBSelect & { ingredients: IngredientDBSelect[] }
) => {
  const newOrPatchedIngredientInputs = newOrPatchedGroup?.ingredients ?? []
  const newOrPatchedIngredientIdsInOrder: number[] = []

  for (let i = 0; i < newOrPatchedIngredientInputs.length; i++) {
    const ingredientInput = newOrPatchedIngredientInputs[i]
    const ingredientWithAddedGroupInfo = {
      amount: ingredientInput.amount ?? null,
      unit: ingredientInput.unit ?? null,
      name: ingredientInput.name,
      groupId,
      previousId: i === 0 ? null : newOrPatchedIngredientIdsInOrder[i - 1]
    }

    const ingredientId = (ingredientInput as IngredientInput).id
    const existingIngredient =
      ingredientId && originalGroup?.ingredients.find((ingredient) => ingredient.id === ingredientId)

    if (!existingIngredient) {
      const newIngredientId = await insertIngredient(trx, ingredientWithAddedGroupInfo)
      newOrPatchedIngredientIdsInOrder.push(newIngredientId)
    } else {
      const areSame = ingredientContentsAreSame(existingIngredient, ingredientWithAddedGroupInfo, ingredientId)
      if (!areSame) {
        await updateIngredient(trx, ingredientId, ingredientWithAddedGroupInfo)
      }
      newOrPatchedIngredientIdsInOrder.push(ingredientId)
    }
  }

  await deleteIngredientsNotInIdsToKeep(trx, newOrPatchedIngredientIdsInOrder, originalGroup)
}

const deleteIngredientsNotInIdsToKeep = async (
  trx: DatabaseType,
  idsToKeep: number[],
  originalGroup?: IngredientGroupDBSelect & { ingredients: IngredientDBSelect[] }
) => {
  const ingredientsToDeleteIds: number[] = []
  const groupIngredients = originalGroup?.ingredients ?? []
  for (let i = 0; i < groupIngredients.length; i++) {
    const originalIngredient = groupIngredients[i]
    const shouldDelete = !idsToKeep.includes(originalIngredient.id)

    if (shouldDelete) {
      ingredientsToDeleteIds.push(originalIngredient.id)
    }
  }

  if (!ingredientsToDeleteIds.length) return

  await trx
    .update(ingredients)
    .set({ previousId: null })
    .where(inArray(ingredients.id, ingredientsToDeleteIds))
    .returning()
  await trx.delete(ingredients).where(inArray(ingredients.id, ingredientsToDeleteIds))
}

const createIngredientGroup = async (trx: DatabaseType, groupInsert: { recipeId: number; title?: string | null }) => {
  const createdGroup = await trx
    .insert(ingredientGroups)
    .values(groupInsert)
    .returning({ insertedId: ingredientGroups.id })
  return createdGroup[0]
}

const patchIngredientGroup = async (trx: DatabaseType, groupId: number, groupPatch: { title?: string | null }) => {
  await trx.update(ingredientGroups).set(groupPatch).where(eq(ingredientGroups.id, groupId)).returning()
}

const insertIngredient = async (trx: DatabaseType, updatedPatchedIngredient: IngredientInsert) => {
  const newIngredient = await trx
    .insert(ingredients)
    .values(updatedPatchedIngredient)
    .returning({ insertedId: ingredients.id })
  return newIngredient[0].insertedId
}

const updateIngredient = async (
  trx: DatabaseType,
  id: number,
  updatedPatchedIngredient: Omit<IngredientInsert, 'id'>
) => {
  await trx.update(ingredients).set(updatedPatchedIngredient).where(eq(ingredients.id, id)).returning()
}

const ingredientContentsAreSame = (
  original: IngredientDBSelect,
  // compareIngredient: Omit<UpdatedIngredient, 'id'>,
  compareIngredient: Omit<IngredientInput, 'id'>,
  compareIngredientId: number
) => {
  return (
    original.amount === compareIngredient.amount &&
    original.unit === compareIngredient.unit &&
    original.name === compareIngredient.name &&
    original.previousId === compareIngredient.previousId &&
    original.groupId === compareIngredient.groupId &&
    original.id === compareIngredientId
  )
}
