import { expect } from '@jest/globals'
import { getTableRowCountInDatabase, getTableRows } from './test-database-helpers'
import { RecipeInput } from '../../modules/types.generated'

export const verifyTableRowCountsInDatabase = async (testInput: RecipeInput) => {
  const recipesCount = await getTableRowCountInDatabase('recipes')
  expect(recipesCount).toBe(1)
  const tagsCount = await getTableRowCountInDatabase('tags')
  expect(tagsCount).toBe(testInput.tags?.length ?? 0)
  const photosCount = await getTableRowCountInDatabase('photos')
  expect(photosCount).toBe(testInput.photos?.length ?? 0)
  const languagesCount = await getTableRowCountInDatabase('languages')
  expect(languagesCount).toBe(1)
  const ingredientGroupsCount = await getTableRowCountInDatabase('ingredient_groups')
  expect(ingredientGroupsCount).toBe(testInput.ingredientGroups?.length)
  const ingredientsCount = await getTableRowCountInDatabase('ingredients')
  expect(ingredientsCount).toBe(testInput.ingredientGroups?.reduce((acc, curr) => acc + curr.ingredients!.length, 0))
  const instructionGroupsCount = await getTableRowCountInDatabase('instruction_groups')
  expect(instructionGroupsCount).toBe(testInput.instructionGroups?.length)
  const instructionsCount = await getTableRowCountInDatabase('instructions')
  expect(instructionsCount).toBe(testInput.instructionGroups?.reduce((acc, curr) => acc + curr.instructions!.length, 0))
}

export const verifyRecipeInDatabase = async (testInput: RecipeInput, recipeId: number) => {
  const [recipeRaw] = await getTableRows('recipes', { column: 'id', id: recipeId })
  expect(recipeRaw.id).toBeDefined()
  expect(recipeRaw.title).toBe(testInput.title)
  expect(recipeRaw.description).toBe(testInput.description)
  expect(recipeRaw.oven_needed).toBe(testInput.ovenNeeded)

  const [languageRaw] = await getTableRows('languages')
  expect(recipeRaw.language_id).toBe(languageRaw.id)
}

export const verifyRecipeLanguageInDatabase = async (testInput: RecipeInput, languageId: number) => {
  const [languageRaw] = await getTableRows('languages', { column: 'id', id: languageId })
  expect(languageRaw.id).toBeDefined()
  expect(languageRaw.language).toBe(testInput.language)
}

export const verifyRecipeTagsInDatabase = async (testInput: RecipeInput, newRecipeId: number) => {
  const recipesToTagsInDB = await getTableRows('recipes_to_tags', { column: 'recipe_id', id: newRecipeId })

  for (let i = 0; i < recipesToTagsInDB.length; i++) {
    const { id, tag_id, recipe_id } = recipesToTagsInDB[i]
    expect(id).toBeDefined()
    expect(tag_id).toBeDefined()
    expect(recipe_id).toBe(newRecipeId)
    const [tagInDB] = await getTableRows('tags', { column: 'id', id: tag_id as number })
    expect(tagInDB.tag).toBe(testInput.tags![i])
  }
}

export const verifyRecipeIngredientsInDatabase = async (testInput: RecipeInput, newRecipeId: number) => {
  const ingredientGroupsInput = testInput.ingredientGroups

  const ingredientGroupsInDB = await getTableRows('ingredient_groups', { column: 'recipe_id', id: newRecipeId })

  for (let i = 0; i < ingredientGroupsInput!.length; i++) {
    const groupInput = ingredientGroupsInput![i]
    const group = ingredientGroupsInDB[i]
    expect(group.id).toBeDefined()
    expect(group.recipe_id).toBe(newRecipeId)
    if (groupInput.title) expect(group.title).toBe(groupInput.title)

    const ingredientsInDB = await getTableRows('ingredients', { column: 'group_id', id: group.id as number })
    const groupIngredientsInBD = ingredientsInDB.filter((ingredient) => ingredient.ingredient_group_id === group.id)
    for (let j = 0; j < groupIngredientsInBD.length; j++) {
      const ingredientInput = groupInput!.ingredients![j]
      const ingredientInDB = groupIngredientsInBD[j]
      const { id, amount, unit, name, previous_id, ingredient_group_id } = ingredientInDB
      expect(id).toBeDefined()
      expect(ingredient_group_id).toBe(group.id)
      expect(name).toBe(ingredientInput.name)

      ingredientInput.amount ? expect(amount).toBe(ingredientInput.amount) : expect(amount).toBeNull()
      ingredientInput.unit ? expect(unit).toBe(ingredientInput.unit) : expect(unit).toBeNull()
      j === 0 ? expect(previous_id).toBeNull() : expect(previous_id).toBe(groupIngredientsInBD[j - 1].id)
    }
  }
}

export const verifyRecipeInstructionsInDatabase = async (testInput: RecipeInput, newRecipeId: number) => {
  const instructionGroupsInput = testInput.instructionGroups

  const instructionGroupsInDB = await getTableRows('instruction_groups')

  for (let i = 0; i < instructionGroupsInDB!.length; i++) {
    const groupInput = instructionGroupsInput![i]
    const group = instructionGroupsInDB[i]
    expect(group.id).toBeDefined()
    expect(group.recipe_id).toBe(newRecipeId)
    if (groupInput.title) expect(group.title).toBe(groupInput.title)

    const instructionsInDB = await getTableRows('instructions', { column: 'group_id', id: group.id as number })
    const groupInstructionsInBD = instructionsInDB.filter((instruction) => instruction.ingredient_group_id === group.id)
    for (let j = 0; j < groupInstructionsInBD.length; j++) {
      const instructionInput = groupInput!.instructions![j]
      const instructionInDB = groupInstructionsInBD[j]
      const { id, content, previous_id, instruction_group_id } = instructionInDB
      expect(id).toBeDefined()
      expect(instruction_group_id).toBe(group.id)
      expect(content).toBe(instructionInput)
      j === 0 ? expect(previous_id).toBeNull() : expect(previous_id).toBe(groupInstructionsInBD[j - 1].id)
    }
  }
}
