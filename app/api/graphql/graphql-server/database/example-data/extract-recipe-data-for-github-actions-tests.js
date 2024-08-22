import { belugaBolognese } from './example-data-1.js'
import { lemonyLentilSoup } from './example-data-2.js'
import { maximumDeliciousDal } from './example-data-3.js'

const allTestRecipeData = [lemonyLentilSoup, belugaBolognese, maximumDeliciousDal]

const getTestLanguagesForCypressGitHubActionsTests = () => {
  const languageNames = allTestRecipeData.reduce((acc, recipe) => {
    if (!acc.includes(recipe.language)) acc.push(recipe.language)
    return acc
  }, [])

  return languageNames.map((name, index) => ({ id: index + 1, language: name }))
}

const allLanguages = getTestLanguagesForCypressGitHubActionsTests()

const getTestTagsForCypressGitHubActionsTests = () => {
  const tags = allTestRecipeData.reduce((acc, recipe) => {
    recipe.tags.forEach((tag) => {
      if (!acc.includes(tag)) acc.push(tag)
    })

    return acc
  }, [])

  return tags.map((tag, index) => ({ id: index + 1, tag }))
}

const allTags = getTestTagsForCypressGitHubActionsTests()

const getTestRecipesForCypressGitHubActionsTests = () => {
  let photoId = 1
  let ingredientId = 1
  let ingredientGroupId = 1
  let instructionId = 1
  let instructionGroupId = 1

  const newRecipes = allTestRecipeData.map((recipeData, index) => {
    const recipeId = index + 1
    const language = allLanguages.find((l) => l.language === recipeData.language)
    const tags = recipeData.tags.map((tag) => allTags.find((t) => t.tag === tag))
    const photos = recipeData.photoIdentifiers.map((photo, photoIndex) => {
      return { id: photoId + photoIndex, url: `https://something/${photo}`, isMainPhoto: photoIndex === 0 }
    })
    photoId += recipeData.photoIdentifiers.length

    const ingredientGroups = []
    for (let i = 0; i < recipeData.ingredientGroups.length; i++) {
      const groupData = recipeData.ingredientGroups[i]
      const ingredients = groupData.ingredients.map(({ name, amount, unit }, ingredientIndex) => {
        const id = ingredientId++
        return { id, name, amount, unit: unit, previousId: ingredientIndex === 0 ? null : id - 1 }
      })

      ingredientGroups.push({
        id: ingredientGroupId++,
        ingredients,
        title: groupData.title ?? null
      })
    }

    const instructionGroups = []
    for (let i = 0; i < recipeData.instructionGroups.length; i++) {
      const groupData = recipeData.instructionGroups[i]
      const instructions = groupData.instructions.map((content, instructionIndex) => {
        const id = instructionId++
        return { id, content, previousId: instructionIndex === 0 ? null : id - 1 }
      })

      instructionGroups.push({
        id: instructionGroupId++,
        instructions,
        title: groupData.title ?? null
      })
    }

    const newRecipe = {
      id: recipeId,
      title: recipeData.title,
      description: recipeData.description ?? null,
      language,
      tags,
      ovenNeeded: recipeData.ovenNeeded,
      photos,
      ingredientGroups,
      instructionGroups
    }

    return newRecipe
  })

  return newRecipes
}

const allTestRecipes = getTestRecipesForCypressGitHubActionsTests()

export { allTestRecipes, allLanguages, allTags }
