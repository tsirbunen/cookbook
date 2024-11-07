import { expect } from '@jest/globals'
import type { CreateRecipeInput, PatchRecipeInput, Recipe } from '../../modules/types.generated'
import { getTableRowCountInDatabase, getTableRows } from './test-database-helpers'

export const verifyTableRowCountsInDatabase = async (testInput: CreateRecipeInput) => {
  const recipesCount = await getTableRowCountInDatabase('recipes')
  expect(recipesCount).toBe(1)
  const tagsCount = await getTableRowCountInDatabase('tags')
  expect(tagsCount).toBe(testInput.tags?.length ?? 0)
  const photosCount = await getTableRowCountInDatabase('photos')
  expect(photosCount).toBe(testInput.photoIdentifiers?.length ?? 0)
  const languagesCount = await getTableRowCountInDatabase('languages')
  expect(languagesCount).toBe(1)
  const ingredientGroupsCount = await getTableRowCountInDatabase('ingredient_groups')
  expect(ingredientGroupsCount).toBe(testInput.ingredientGroups?.length)
  const ingredientsCount = await getTableRowCountInDatabase('ingredients')
  expect(ingredientsCount).toBe(
    testInput.ingredientGroups?.reduce((acc, curr) => acc + (curr.ingredients ?? []).length, 0)
  )
  const instructionGroupsCount = await getTableRowCountInDatabase('instruction_groups')
  expect(instructionGroupsCount).toBe(testInput.instructionGroups?.length)
  const instructionsCount = await getTableRowCountInDatabase('instructions')
  expect(instructionsCount).toBe(
    testInput.instructionGroups?.reduce((acc, curr) => acc + (curr.instructions ?? []).length, 0)
  )
}

export const verifyRecipeInDatabase = async (testInput: CreateRecipeInput, recipeId: number) => {
  const [recipeRaw] = await getTableRows('recipes', { column: 'id', id: recipeId })
  expect(recipeRaw.id).toBeDefined()
  expect(recipeRaw.title).toBe(testInput.title)
  expect(recipeRaw.description).toBe(testInput.description)
  expect(recipeRaw.oven_needed).toBe(testInput.ovenNeeded)

  const [languageRaw] = await getTableRows('languages')
  expect(recipeRaw.language_id).toBe(languageRaw.id)
}

export const verifyRecipeLanguageInDatabase = async (testInput: CreateRecipeInput, languageId: number) => {
  const [languageRaw] = await getTableRows('languages', { column: 'id', id: languageId })
  expect(languageRaw.id).toBeDefined()
  expect(languageRaw.language).toBe(testInput.language)
}

export const verifyRecipeTagsInDatabase = async (testInput: CreateRecipeInput, newRecipeId: number) => {
  const recipesToTagsInDB = await getTableRows('recipes_to_tags', { column: 'recipe_id', id: newRecipeId })

  for (let i = 0; i < recipesToTagsInDB.length; i++) {
    const { id, tag_id, recipe_id } = recipesToTagsInDB[i]
    expect(id).toBeDefined()
    expect(tag_id).toBeDefined()
    expect(recipe_id).toBe(newRecipeId)
    const [tagInDB] = await getTableRows('tags', { column: 'id', id: tag_id as number })
    expect(tagInDB.tag).toBe((testInput.tags ?? [])[i])
  }
}

export const verifyRecipeIngredientsInDatabase = async (testInput: CreateRecipeInput, newRecipeId: number) => {
  const ingredientGroupsInput = testInput.ingredientGroups

  const ingredientGroupsInDB = await getTableRows('ingredient_groups', { column: 'recipe_id', id: newRecipeId })

  for (let i = 0; i < ingredientGroupsInput.length; i++) {
    const groupInput = ingredientGroupsInput[i]
    const group = ingredientGroupsInDB[i]
    expect(group.id).toBeDefined()
    expect(group.recipe_id).toBe(newRecipeId)
    if (groupInput.title) expect(group.title).toBe(groupInput.title)

    const ingredientsInDB = await getTableRows('ingredients', { column: 'group_id', id: group.id as number })
    const groupIngredientsInBD = ingredientsInDB.filter((ingredient) => ingredient.ingredient_group_id === group.id)
    for (let j = 0; j < groupIngredientsInBD.length; j++) {
      if (!groupInput.ingredients) throw new Error('No ingredients found in the input')
      const ingredientInput = groupInput.ingredients[j]
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

export const verifyRecipeInstructionsInDatabase = async (testInput: CreateRecipeInput, newRecipeId: number) => {
  const instructionGroupsInput = testInput.instructionGroups

  const instructionGroupsInDB = await getTableRows('instruction_groups')
  if (!instructionGroupsInDB) throw new Error('No instruction groups found in the database')

  for (let i = 0; i < instructionGroupsInDB.length; i++) {
    const groupInput = instructionGroupsInput[i]
    const group = instructionGroupsInDB[i]
    expect(group.id).toBeDefined()
    expect(group.recipe_id).toBe(newRecipeId)
    if (groupInput.title) expect(group.title).toBe(groupInput.title)

    const instructionsInDB = await getTableRows('instructions', { column: 'group_id', id: group.id as number })
    const groupInstructionsInBD = instructionsInDB.filter((instruction) => instruction.ingredient_group_id === group.id)
    for (let j = 0; j < groupInstructionsInBD.length; j++) {
      if (!groupInput.instructions) throw new Error('No instructions found in the input')

      const instructionInput = groupInput.instructions[j]
      const instructionInDB = groupInstructionsInBD[j]
      const { id, content, previous_id, instruction_group_id } = instructionInDB
      expect(id).toBeDefined()
      expect(instruction_group_id).toBe(group.id)
      expect(content).toBe(instructionInput)
      j === 0 ? expect(previous_id).toBeNull() : expect(previous_id).toBe(groupInstructionsInBD[j - 1].id)
    }
  }
}

export const verifyPatchedRecipe = (patchedRecipe: Recipe, original: Recipe, patch: PatchRecipeInput) => {
  expect(patchedRecipe.id).toBe(original.id)
  expect(patchedRecipe.title).toBe(patch.title ?? original.title)
  expect(patchedRecipe.description).toBe(patch.description ?? original.description)
  expect(patchedRecipe.ovenNeeded).toBe(patch.ovenNeeded !== undefined ? patch.ovenNeeded : original.ovenNeeded)

  if (patch.language) {
    expect(patchedRecipe.language.id).not.toBe(original.language.id)
    expect(patchedRecipe.language.language).toBe(patch.language)
  } else {
    expect(patchedRecipe.language.id).toBe(original.language.id)
    expect(patchedRecipe.language.language).toBe(original.language.language)
  }

  if (patch.tags) {
    const expectedTags = patch.tags ?? []
    patchedRecipe.tags?.forEach((tag, i) => {
      const expectedTag = expectedTags[i]
      expect(tag.tag).toBe(expectedTag)
    })
  } else {
    const expectedTags = original.tags ?? []
    patchedRecipe.tags?.forEach((tag, i) => {
      const expectedTag = expectedTags[i]
      expect(tag.id).toBe(expectedTag.id)
      expect(tag.tag).toBe(expectedTag.tag)
    })
  }

  const expectedIngredientGroups = patch.ingredientGroups ? patch.ingredientGroups : (original.ingredientGroups ?? [])

  patchedRecipe.ingredientGroups?.forEach((group, i) => {
    const expectedGroup = expectedIngredientGroups[i]
    expect(group.id).toBe(expectedGroup.id)
    expect(group.title).toBe(expectedGroup.title)

    const expectedIngredients = expectedGroup.ingredients ?? []
    for (const ingredient of group.ingredients ?? []) {
      // Note: The order of ingredients is not guaranteed to be the "correct" one and usually is not.
      const expectedIngredient = expectedIngredients.find((e: { name: string }) => e.name === ingredient.name)
      if (expectedIngredient?.id) {
        expect(ingredient.id).toBe(expectedIngredient.id)
        expect(ingredient.amount).toBe(expectedIngredient.amount)
        expect(ingredient.unit).toBe(expectedIngredient.unit)
        expect(ingredient.name).toBe(expectedIngredient.name)
      }
    }
  })

  const expectedInstructionGroups = patch.instructionGroups
    ? patch.instructionGroups
    : (original.instructionGroups ?? [])
  if (patch.instructionGroups) {
    for (const [i, group] of patchedRecipe.instructionGroups?.entries() ?? []) {
      const expectedGroup = expectedInstructionGroups[i]
      expect(group.id).toBe(expectedGroup.id)
      expect(group.title).toBe(expectedGroup.title)
      // Note: The order of instructions is not guaranteed to be the "correct" one and usually is not.
      const expectedInstructions = expectedGroup.instructions ?? []
      for (const instruction of group.instructions ?? []) {
        const expectedInstruction = expectedInstructions.find(
          (e: { content: string }) => e.content === instruction.content
        )
        if (expectedInstruction?.id) {
          expect(instruction.id).toBe(expectedInstruction.id)
          expect(instruction.content).toBe(expectedInstruction.content)
        }
      }
    }
  }
}
