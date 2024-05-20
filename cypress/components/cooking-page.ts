import { presetMultiplierTestId } from '../../src/app-pages/cook/panel/ingredients-and-scaling/PresetMultiplierSelection'
import { ingredientScalingToggleProperty } from '../../src/widgets/toggles/Toggle'
import { Base } from './base'
import { getTestRecipesForCypressGitHubActionsTests } from '../../app/api/test-data-migrations/test-recipes-migration-data'
import { cardRadioButtonSelectorDataTestId } from '../../src/widgets/card-radio-button-selector/CardRadioButtonSelector'

export class CookingPage extends Base {
  testRecipes = getTestRecipesForCypressGitHubActionsTests()

  setViewingRecipesCount(count: string) {
    cy.getByDataTestId(cardRadioButtonSelectorDataTestId).within(() => {
      cy.get('button').each(($button, index) => {
        if (index === parseInt(count) - 1) {
          cy.wrap($button).click()
        }
      })
    })
  }

  toggleIsScalingRecipe(recipeId: string) {
    cy.getByDataTestId(`${recipeId}-toggles`).within(() => {
      cy.getByDataTestId(ingredientScalingToggleProperty).click()
    })
  }

  scalingOptionsAreVisibleOrNotForRecipe(areVisible: boolean, recipeId: string) {
    cy.getByDataTestId(`ingredients-for-recipe-${recipeId}`).within(() => {
      if (areVisible) {
        this.verifyIsVisible(presetMultiplierTestId)
        const ingredientsWithAmountOrUnitCount = this.getIngredientsWithAmountOrUnitCount(recipeId)
        cy.get('input').should('have.lengthOf', ingredientsWithAmountOrUnitCount)
      } else {
        this.verifyDataTestIdDoesNotExist(presetMultiplierTestId)
        cy.get('input').should('not.exist')
      }
    })
  }

  togglePresetMultiplier(multiplier: string, recipeId: string) {
    cy.getByDataTestId(`ingredients-for-recipe-${recipeId}`).within(() => {
      cy.contains(multiplier).click()
    })
  }

  getIngredientsWithAmountOrUnitCount(recipeId: string) {
    const recipe = this.testRecipes.find((recipe) => recipe.id === parseInt(recipeId))
    return recipe.ingredientGroups
      .map((group) => group.ingredients)
      .flat()
      .filter(({ amount, unit }) => !!amount || !!unit).length
  }

  verifySelectedMultiplierIsVisible(multiplier: string, isVisible: boolean, recipeId: string) {
    if (isVisible) {
      cy.getByDataTestId(`recipe-${recipeId}-panel`).within(() => {
        cy.contains(`${multiplier} X`).should('exist')
      })
    } else {
      cy.getByDataTestId(`recipe-${recipeId}-panel`).within(() => {
        cy.get(`${multiplier} X`).should('not.exist')
      })
    }
  }
}
