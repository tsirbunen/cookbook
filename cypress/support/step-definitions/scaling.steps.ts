import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'
import { App } from '../../components/app'
import { RecipesSearchPage } from '../../components/recipes-search-page'
import { ViewRecipesMode } from '../../../src/app-pages/search/search-management/ViewModeManagementTool'
import { CookingPage } from '../../components/cooking-page'

const cookingPage = new CookingPage()

When('one has toggled to view {string} recipes at the same time', (recipesCount: string) => {
  cookingPage.setViewingRecipesCount(recipesCount)
})

When('one toggles is scaling recipe {string}', (recipeId: string) => {
  cookingPage.toggleIsScalingRecipe(recipeId)
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
