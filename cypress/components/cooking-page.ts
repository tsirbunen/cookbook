import { presetMultiplierTestId } from '../../app-ui/app-pages/cook/panel/ingredients-and-scaling/PresetMultiplierSelection'
import {
  clearAllToggleProperty,
  cookToggleProperty,
  favoriteToggleProperty,
  ingredientScalingToggleProperty,
  multiColumnToggleProperty
} from '../../app-ui/widgets/toggles/Toggle'
import { Base } from './base'
import { cardRadioButtonSelectorDataTestId } from '../../app-ui/widgets/card-radio-button-selector/CardRadioButtonSelector'
import { MULTI_COLUMN_DIV } from '../../app-ui/layout/multi-column-wrapper/MultiColumnContent'
import { clickableRecipeCardArea } from '../../app-ui/widgets/image-with-fallback/ImageWithFallback'
import { ingredientName, ingredientRow } from '../../app-ui/app-pages/cook/panel/ingredients-and-scaling/IngredientRow'
import { instructionRow } from '../../app-ui/app-pages/cook/panel/instructions/Instructions'
import { recipeTitle } from '../../app-ui/app-pages/cook/panel/general/RecipeTitle'
import { Shades } from '../../app-ui/constants/shades'

export class CookingPage extends Base {
  // Note: We cannot pick all the buttons at once and then loop through them because clicking
  // each button changes the DOM and then Cypress no longer has a reference to the buttons.
  // Therefore we find the buttons recursively and click them one by one.
  pickNextRecipeRecursively(fromIndex: number, toIndex: number) {
    cy.getByDataTestId(`${clickableRecipeCardArea}-${fromIndex}`)
      .click()
      .then(() => {
        if (fromIndex < toIndex) this.pickNextRecipeRecursively(fromIndex + 1, toIndex)
      })
  }

  pickThreeRecipes() {
    this.pickNextRecipeRecursively(0, 2)
  }

  performForTogglesOfRecipe(recipeIndex: string, actionFunction: () => void) {
    cy.getByDataTestIdContains('-toggles').each(($toggle, index) => {
      if (index === parseInt(recipeIndex)) {
        cy.wrap($toggle).within(() => {
          actionFunction()
        })
      }
    })
  }

  performForIngredientsOfRecipe(recipeIndex: string, actionFunction: () => void) {
    cy.getByDataTestIdContains('ingredients-for-recipe-').each(($content, index) => {
      if (index === parseInt(recipeIndex)) {
        cy.wrap($content).within(() => {
          actionFunction()
        })
      }
    })
  }

  toggleIsScalingRecipe(recipeIndex: string) {
    this.performForTogglesOfRecipe(recipeIndex, () => {
      cy.getByDataTestId(ingredientScalingToggleProperty).click()
    })
  }

  scalingOptionsAreVisibleOrNotForRecipe(areVisible: boolean, recipeIndex: string) {
    this.performForIngredientsOfRecipe(recipeIndex, () => {
      if (areVisible) {
        this.verifyIsVisible(presetMultiplierTestId)
      } else {
        this.verifyDataTestIdDoesNotExist(presetMultiplierTestId)
        cy.get('input').should('not.exist')
      }
    })
  }

  togglePresetMultiplier(multiplier: string, recipeIndex: string) {
    this.performForIngredientsOfRecipe(recipeIndex, () => {
      cy.contains(multiplier).click()
    })
  }

  verifySelectedMultiplierIsVisible(multiplier: string, isVisible: boolean, recipeIndex: string) {
    this.performForTogglesOfRecipe(recipeIndex, () => {
      if (isVisible) {
        cy.contains(`${multiplier} X`).should('exist')
      } else {
        cy.get(`${multiplier} X`).should('not.exist')
      }
    })
  }

  toggleHasTwoColumns(recipeIndex: string) {
    this.performForTogglesOfRecipe(recipeIndex, () => {
      cy.getByDataTestId(multiColumnToggleProperty).click()
    })
  }

  verifyColumnCounts(count: string, recipeIndex: string) {
    cy.getByDataTestIdContains('-panel').each(($content, index) => {
      if (index === parseInt(recipeIndex)) {
        cy.wrap($content).within(() => {
          cy.getByDataTestId(MULTI_COLUMN_DIV).each(($div) => {
            cy.wrap($div)
              .should('have.attr', 'style')
              .invoke('replace', /\s/g, '')
              .should('contain', `column-count:${count};`)
          })
        })
      }
    })
  }

  toggleIsCooking(recipeIndex: string) {
    this.performForTogglesOfRecipe(recipeIndex, () => {
      cy.getByDataTestId(cookToggleProperty).click()
    })
  }

  toggleClear(recipeIndex: string) {
    this.performForTogglesOfRecipe(recipeIndex, () => {
      cy.getByDataTestId(clearAllToggleProperty).click()
    })
  }

  verifyCheckboxVisibility(areVisible: boolean, recipeIndex: string) {
    cy.getByDataTestIdContains('-panel').each(($content, index) => {
      if (index === parseInt(recipeIndex)) {
        cy.wrap($content).within(() => {
          if (areVisible) {
            let expectedCheckboxCount = 0
            cy.getByDataTestId(ingredientRow)
              .each((_) => {
                expectedCheckboxCount += 1
              })
              .then(() => {
                cy.getByDataTestId(instructionRow).each((_) => {
                  expectedCheckboxCount += 1
                })
              })
              .then(() => {
                cy.get('input[type="checkbox"]').should('have.length', expectedCheckboxCount)
              })
          } else {
            cy.get('input[type="checkbox"]').should('not.exist')
          }
        })
      }
    })
  }

  verifyIngredientOpacity(isOpaque: boolean, targetIndex: number, recipeIndex: string) {
    const color = isOpaque ? Shades.DARK_RGB : Shades.VERY_DARK_RGB

    this.performForIngredientsOfRecipe(recipeIndex, () => {
      cy.getByDataTestId(ingredientRow).each(($ingredient, i) => {
        if (i === targetIndex) {
          cy.wrap($ingredient).within(() => {
            cy.getByDataTestId(ingredientName).should('have.css', 'color', color)
          })
        }
      })
    })
  }

  verifyIngredientCheckboxCheckedStatus(isChecked: boolean, targetIndex: number, recipeIndex: string) {
    this.performForIngredientsOfRecipe(recipeIndex, () => {
      cy.get('input[type="checkbox"]').each(($input, index) => {
        if (index === targetIndex) {
          if (isChecked) {
            cy.wrap($input).parent().find('span').should('have.attr', 'data-checked')
          } else {
            cy.wrap($input).should('not.be.checked')
          }
        }
      })
    })
  }

  checkOrUncheckIngredient(isCheck: boolean, targetIndex: number, recipeIndex: string) {
    this.performForIngredientsOfRecipe(recipeIndex, () => {
      cy.get('input[type="checkbox"]').each(($input, index) => {
        if (index === targetIndex) {
          if (isCheck) cy.wrap($input).check({ force: true })
          else cy.wrap($input).uncheck({ force: true })
        }
      })
    })
  }

  toggleIsFavoriteRecipe(recipeIndex: string) {
    this.performForTogglesOfRecipe(recipeIndex, () => {
      cy.getByDataTestId(favoriteToggleProperty).click()
    })
  }

  verifyFavoriteStatus(recipeIndex: string, isFavorite: boolean) {
    this.performForTogglesOfRecipe(recipeIndex, () => {
      const expectedColor = isFavorite ? Shades.VERY_DARK_RGB : Shades.MEDIUM_RGB

      cy.getByDataTestId(favoriteToggleProperty).within(() => {
        cy.get('button[type="button"]').should('have.css', 'color', expectedColor)
      })
    })
  }

  verifyRecipesDisplayCount(recipesCount: string) {
    let titlesCount = 0
    cy.getByDataTestId(recipeTitle)
      .each((_) => {
        titlesCount += 1
      })
      .then(() => {
        expect(titlesCount).to.equal(parseInt(recipesCount))
      })
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
