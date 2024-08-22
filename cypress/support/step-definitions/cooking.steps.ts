import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'
import { CookingPage } from '../../components/cooking-page'

const cookingPage = new CookingPage()
type RecipeToggle = 'is scaling' | 'has two columns' | 'is cooking' | 'clear all' | 'is favorite'

When('one toggles {string} for recipe at {string}', (toggle: RecipeToggle, index: string) => {
  switch (toggle) {
    case 'is scaling':
      cookingPage.toggleIsScalingRecipe(index)
      break
    case 'has two columns':
      cookingPage.toggleHasTwoColumns(index)
      break
    case 'is cooking':
      cookingPage.toggleIsCooking(index)
      break
    case 'is favorite':
      cookingPage.toggleIsFavoriteRecipe(index)
      break
    case 'clear all':
      cookingPage.toggleClear(index)
      break
    default:
      throw new Error(`Unknown toggle: ${toggle}`)
  }
})

Given('one has selected three recipes to cook', () => {
  cookingPage.pickThreeRecipes()
})

Then('scaling options {string} visible for recipe at {string}', (visibility: 'are' | 'are not', index: string) => {
  cookingPage.scalingOptionsAreVisibleOrNotForRecipe(visibility === 'are', index)
})

When('one toggles the preset scale by {string} X for recipe at {string}', (multiplier: string, index: string) => {
  cookingPage.togglePresetMultiplier(multiplier, index)
})

Then(
  'the set multiplier of {string} {string} visible for recipe at {string}',
  (multiplier: 'string', isOrIsNot: 'is' | 'is not', index: string) => {
    cookingPage.verifySelectedMultiplierIsVisible(multiplier, isOrIsNot === 'is', index)
  }
)

Then(
  'ingredients and instructions are displayed in {string} columns for recipe at {string}',
  (count: string, index: string) => {
    cookingPage.verifyColumnCounts(count, index)
  }
)

Then(
  'ingredients and instructions {string} checkboxes for recipe at {string}',
  (haveOrHaveNot: 'have' | 'do not have', index: string) => {
    cookingPage.verifyCheckboxVisibility(haveOrHaveNot === 'have', index)
  }
)

When(
  'the {string} ingredient in recipe at {string} {string} opaque',
  (ingredient: 'first' | 'second', recipeIndex: string, isOrIsNotOpaque: string) => {
    cookingPage.verifyIngredientOpacity(isOrIsNotOpaque === 'is', ingredient === 'first' ? 0 : 1, recipeIndex)
  }
)

When(
  'one {string} the checkbox for the {string} ingredient in recipe at {string}',
  (checksOrUnchecks: 'checks' | 'unchecks', ingredient: 'first' | 'second', recipeIndex: string) => {
    cookingPage.checkOrUncheckIngredient(checksOrUnchecks === 'checks', ingredient === 'first' ? 0 : 1, recipeIndex)
  }
)

Then(
  'the {string} ingredient in recipe at {string} check status {string} checked',
  (ingredient: 'first' | 'second', recipeIndex: string, isOrIsNotChecked: 'is' | 'is not') => {
    cookingPage.verifyIngredientCheckboxCheckedStatus(
      isOrIsNotChecked === 'is',
      ingredient === 'first' ? 0 : 1,
      recipeIndex
    )
  }
)

Then('recipe at {string} {string} marked as favorite', (index: string, isOrIsNot: 'is' | 'is not') => {
  cookingPage.verifyFavoriteStatus(index, isOrIsNot === 'is')
})

Then('{string} recipes are displayed', (recipesCount: string) => {
  cookingPage.verifyRecipesDisplayCount(recipesCount)
})

When('one toggles to view {string} recipes at the same time', (recipesCount: string) => {
  cookingPage.setViewingRecipesCount(recipesCount)
})
