import { presetMultiplierTestId } from '../../src/app-pages/cook/panel/ingredients-and-scaling/PresetMultiplierSelection'
import {
  clearAllToggleProperty,
  cookToggleProperty,
  favoriteToggleProperty,
  ingredientScalingToggleProperty,
  multiColumnToggleProperty
} from '../../src/widgets/toggles/Toggle'
import { Base } from './base'
import { getTestRecipesForCypressGitHubActionsTests } from '../../app/api/test-data-migrations/test-recipes-migration-data'
import { cardRadioButtonSelectorDataTestId } from '../../src/widgets/card-radio-button-selector/CardRadioButtonSelector'
import { MULTI_COLUMN_DIV } from '../../src/layout/multi-column-wrapper/MultiColumnContent'
import { DARK_COLOR_RGB, MEDIUM_RBG, VERY_DARK_RGB } from '../../src/constants/color-codes'

export class CookingPage extends Base {
  testRecipes = getTestRecipesForCypressGitHubActionsTests()

  getRecipe(recipeId: string) {
    return this.testRecipes.find((recipe) => recipe.id === parseInt(recipeId))
  }

  getIngredientsWithAmountOrUnitCount(recipeId: string) {
    const recipe = this.getRecipe(recipeId)
    return recipe.ingredientGroups
      .map((group) => group.ingredients)
      .flat()
      .filter(({ amount, unit }) => !!amount || !!unit).length
  }

  getIngredientsAndInstructionsCount(recipeId: string) {
    const recipe = this.getRecipe(recipeId)
    return (
      recipe.ingredientGroups.reduce((acc, group) => acc + group.ingredients.length, 0) +
      recipe.instructionGroups.reduce((acc, group) => acc + group.instructions.length, 0)
    )
  }

  getIngredient(ingredient: string, group: string, recipeId: string) {
    return this.testRecipes.find((recipe) => recipe.id === parseInt(recipeId)).ingredientGroups[parseInt(group) - 1]
      .ingredients[parseInt(ingredient) - 1]
  }

  getCheckboxIndex(ingredient: string, group: string, recipeId: string) {
    const recipe = this.getRecipe(recipeId)
    let targetCheckboxIndex = 0
    for (let i = 0; i < parseInt(group) - 1; i++) {
      targetCheckboxIndex += recipe.ingredientGroups[i].ingredients.length
    }
    targetCheckboxIndex += parseInt(ingredient) - 1
    return targetCheckboxIndex
  }

  getFirstNRecipeTitles(recipesCount: number) {
    return this.testRecipes.slice(0, recipesCount).map((recipe) => recipe.title)
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

  toggleHasTwoColumns(recipeId: string) {
    cy.getByDataTestId(`${recipeId}-toggles`).within(() => {
      cy.getByDataTestId(multiColumnToggleProperty).click()
    })
  }

  verifyColumnCounts(count: string, recipeId: string) {
    cy.getByDataTestId(`recipe-${recipeId}-panel`).within(() => {
      cy.getByDataTestId(MULTI_COLUMN_DIV).each(($div) => {
        cy.wrap($div)
          .should('have.attr', 'style')
          .invoke('replace', /\s/g, '')
          .should('contain', `column-count:${count};`)
      })
    })
  }

  toggleIsCooking(recipeId: string) {
    cy.getByDataTestId(`${recipeId}-toggles`).within(() => {
      cy.getByDataTestId(cookToggleProperty).click()
    })
  }

  toggleClear(recipeId: string) {
    cy.getByDataTestId(`${recipeId}-toggles`).within(() => {
      cy.getByDataTestId(clearAllToggleProperty).click()
    })
  }

  verifyCheckboxVisibility(areVisible: boolean, recipeId: string) {
    cy.getByDataTestId(`recipe-${recipeId}-panel`).within(() => {
      if (areVisible) {
        const expectedCheckboxCount = this.getIngredientsAndInstructionsCount(recipeId)
        cy.get('input[type="checkbox"]').should('have.length', expectedCheckboxCount)
      } else {
        cy.get('input[type="checkbox"]').should('not.exist')
      }
    })
  }

  verifyIngredientOpacity(isOpaque: boolean, ingredient: string, group: string, recipeId: string) {
    const targetIngredient = this.getIngredient(ingredient, group, recipeId)
    const color = isOpaque ? DARK_COLOR_RGB : VERY_DARK_RGB
    cy.contains(targetIngredient.name).parent().should('have.css', 'color', color)
  }

  verifyCheckboxCheckedStatus(isChecked: boolean, ingredient: string, group: string, recipeId: string) {
    const targetCheckboxIndex = this.getCheckboxIndex(ingredient, group, recipeId)
    cy.get('input[type="checkbox"]').each(($input, index) => {
      if (index === targetCheckboxIndex) {
        if (isChecked) {
          cy.wrap($input).parent().find('span').should('have.attr', 'data-checked')
        } else {
          cy.wrap($input).should('not.be.checked')
        }
      }
    })
  }

  checkOrUncheckIngredient(isCheck: boolean, ingredient: string, group: string, recipeId: string) {
    const targetCheckboxIndex = this.getCheckboxIndex(ingredient, group, recipeId)
    cy.get('input[type="checkbox"]').each(($input, index) => {
      if (index === targetCheckboxIndex) {
        if (isCheck) cy.wrap($input).check({ force: true })
        else cy.wrap($input).uncheck({ force: true })
      }
    })
  }

  toggleIsFavoriteRecipe(recipeId: string) {
    cy.getByDataTestId(`${recipeId}-toggles`).within(() => {
      cy.getByDataTestId(favoriteToggleProperty).click()
    })
  }

  verifyFavoriteStatus(recipeId: string, isFavorite: boolean) {
    cy.getByDataTestId(`${recipeId}-toggles`).within(() => {
      const expectedColor = isFavorite ? VERY_DARK_RGB : MEDIUM_RBG

      cy.getByDataTestId(favoriteToggleProperty).within(() => {
        cy.get('button[type="button"]').should('have.css', 'color', expectedColor)
      })
    })
  }

  verifyRecipesDisplayCount(recipesCount: string) {
    const titles = this.getFirstNRecipeTitles(parseInt(recipesCount))
    for (const title of titles) {
      this.verifyTextContentDoesExist(title)
    }
  }

  setViewingRecipesCount(count: string) {
    cy.getByDataTestId(cardRadioButtonSelectorDataTestId).within(() => {
      cy.get('button').each(($button, index) => {
        if (index === parseInt(count) - 1) {
          cy.wrap($button).click()
        }
      })
    })
  }
}
