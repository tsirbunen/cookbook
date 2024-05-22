import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'
import { App } from '../../components/app'
import { RecipesSearchPage } from '../../components/recipes-search-page'
import { ViewRecipesMode } from '../../../src/app-pages/search/search-management/ViewModeManagementTool'
import { CookingPage } from '../../components/cooking-page'

const cookingPage = new CookingPage()
type RecipeToggle = 'is scaling' | 'has two columns' | 'is cooking'

When('one has toggled to view {string} recipes at the same time', (recipesCount: string) => {
  cookingPage.setViewingRecipesCount(recipesCount)
})

When('one toggles {string} for recipe {string}', (toggle: RecipeToggle, recipeId: string) => {
  switch (toggle) {
    case 'is scaling':
      cookingPage.toggleIsScalingRecipe(recipeId)
      break
    case 'has two columns':
      cookingPage.toggleHasTwoColumns(recipeId)
    case 'is cooking':
      cookingPage.toggleIsCooking(recipeId)
    default:
      break
  }
})

Then('scaling options {string} visible for recipe {string}', (visibility: 'are' | 'are not', recipeId: string) => {
  cookingPage.scalingOptionsAreVisibleOrNotForRecipe(visibility === 'are', recipeId)
})

When('one toggles the preset scale by {string} X for recipe {string}', (multiplier: string, recipeId: string) => {
  cookingPage.togglePresetMultiplier(multiplier, recipeId)
})

Then(
  'the set multiplier of {string} {string} visible for recipe {string}',
  (multiplier: 'string', isOrIsNot: 'is' | 'is not', recipeId: string) => {
    cookingPage.verifySelectedMultiplierIsVisible(multiplier, isOrIsNot === 'is', recipeId)
  }
)

When('one toggles is scaling recipe {string}', (recipeId: string) => {
  cookingPage.toggleIsScalingRecipe(recipeId)
})

Then(
  'ingredients and instructions are displayed in {string} columns for recipe {string}',
  (count: string, recipeId: string) => {
    cookingPage.verifyColumnCounts(count, recipeId)
  }
)

Then(
  'ingredients and instructions {string} checkboxes for recipe {string}',
  (haveOrHaveNot: 'have' | 'do not have', recipeId: string) => {
    cookingPage.verifyCheckboxVisibility(haveOrHaveNot === 'have', recipeId)
  }
)

When(
  'ingredient {string} of group {string} in recipe {string} {string} opaque',
  (ingredient: string, group: string, recipeId: string, isOrIsNotOpaque: string) => {
    cookingPage.verifyIngredientOpacity(isOrIsNotOpaque === 'is', ingredient, group, recipeId)
  }
)

When(
  'one {string} the checkbox for ingredient {string} of group {string} for recipe {string}',
  (checksOrUnchecks: 'checks' | 'unchecks', ingredient: string, group: string, recipeId: string) => {
    cookingPage.checkOrUncheckIngredient(checksOrUnchecks === 'checks', ingredient, group, recipeId)
  }
)

Then(
  'ingredient {string} of group {string} in recipe {string} check status {string} checked',
  (ingredient: string, group: string, recipeId: string, isOrIsNotChecked: 'is' | 'is not') => {
    cookingPage.verifyCheckboxCheckedStatus(isOrIsNotChecked === 'is', ingredient, group, recipeId)
  }
)

When('one toggles is favorite for recipe {string}', (recipeId: string) => {
  cookingPage.toggleIsFavoriteRecipe(recipeId)
})

Then('recipe {string} {string} marked as favorite', (recipeId: string, isOrIsNot: 'is' | 'is not') => {
  cookingPage.verifyFavoriteStatus(recipeId, isOrIsNot === 'is')
})
