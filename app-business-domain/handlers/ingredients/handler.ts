import type {
  Ingredient,
  IngredientFull,
  IngredientGroupBodyFull,
  IngredientGroupInput,
  RecipeExpanded
} from '../../types-and-interfaces/types'
import { DataStore } from '../../../app-datastore/data-stores/data-store'

export class IngredientGroupHandler {
  constructor(private dataStore: DataStore) {}

  async handleUpsertIngredientGroupsAndIngredients(
    recipeId: number,
    newOrPatchedIngredientGroups: IngredientGroupInput[],
    originalIngredientGroups?: RecipeExpanded['ingredientGroups']
  ) {
    const loopMax = Math.max(newOrPatchedIngredientGroups.length, originalIngredientGroups?.length ?? 0)
    for (let i = 0; i < loopMax; i++) {
      const newOrPatchedGroup = newOrPatchedIngredientGroups[i]
      const originalGroup = originalIngredientGroups?.[i]
      await this.handleUpsertIngredientGroupAndIngredients(recipeId, newOrPatchedGroup, originalGroup)
    }
  }

  async handleUpsertIngredientGroupAndIngredients(
    recipeId: number,
    newOrPatchedGroup?: IngredientGroupInput,
    originalGroup?: IngredientGroupBodyFull & { ingredients: IngredientFull[] }
  ) {
    const groupId = await this.createOrPatchIngredientGroup(recipeId, newOrPatchedGroup, originalGroup)
    await this.createPatchOrDeleteIngredients(groupId, newOrPatchedGroup, originalGroup)
  }

  async createOrPatchIngredientGroup(
    recipeId: number,
    newOrPatchedGroup?: IngredientGroupInput,
    originalGroup?: IngredientGroupBodyFull
  ) {
    let groupId: number
    if (!originalGroup) {
      const group = await this.dataStore.createIngredientGroup({ recipeId, title: newOrPatchedGroup?.title })
      groupId = group.insertedId
    } else {
      if (newOrPatchedGroup?.title) {
        await this.dataStore.patchIngredientGroup(originalGroup.id, { title: newOrPatchedGroup.title })
      }
      groupId = originalGroup.id
    }

    return groupId
  }

  async createPatchOrDeleteIngredients(
    groupId: number,
    newOrPatchedGroup?: IngredientGroupInput,
    originalGroup?: IngredientGroupBodyFull & { ingredients: IngredientFull[] }
  ) {
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

      const ingredientId = (ingredientInput as IngredientFull).id
      const existingIngredient =
        ingredientId && originalGroup?.ingredients.find((ingredient) => ingredient.id === ingredientId)

      if (!existingIngredient) {
        const newIngredientId = await this.dataStore.insertIngredient(ingredientWithAddedGroupInfo)
        newOrPatchedIngredientIdsInOrder.push(newIngredientId)
      } else {
        const areSame = this.ingredientContentsAreSame(existingIngredient, ingredientWithAddedGroupInfo, ingredientId)
        if (!areSame) {
          await this.dataStore.updateIngredient(ingredientId, ingredientWithAddedGroupInfo)
        }
        newOrPatchedIngredientIdsInOrder.push(ingredientId)
      }
    }

    await this.deleteIngredientsNotInIdsToKeep(newOrPatchedIngredientIdsInOrder, originalGroup)
  }

  async deleteIngredientsNotInIdsToKeep(
    idsToKeep: number[],
    originalGroup?: IngredientGroupBodyFull & { ingredients: IngredientFull[] }
  ) {
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

    await this.dataStore.removePreviousIngredientReferences(ingredientsToDeleteIds)
    await this.dataStore.deleteIngredients(ingredientsToDeleteIds)
  }

  ingredientContentsAreSame(original: IngredientFull, compareIngredient: Ingredient, compareIngredientId: number) {
    return (
      original.amount === compareIngredient.amount &&
      original.unit === compareIngredient.unit &&
      original.name === compareIngredient.name &&
      original.previousId === compareIngredient.previousId &&
      original.groupId === compareIngredient.groupId &&
      original.id === compareIngredientId
    )
  }
}
