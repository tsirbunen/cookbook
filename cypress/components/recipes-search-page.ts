import { Base } from './base'
import { togglesTestId } from '../../app-ui/widgets/toggles/Toggles'
import {
  ViewRecipesMode,
  viewModeManagementToolDataTestId
} from '../../app-ui/app-pages/search/tools/ViewModeTool'
import { pickingToolDataTestId } from '../../app-ui/app-pages/search/tools/PickingTool'
import { filteringToolDataTestId } from '../../app-ui/app-pages/search/tools/FilteringTool'
import { photoRepresentationDataTestId } from '../../app-ui/app-pages/search/widgets/PhotoWidget'
import { summaryRepresentationDataTestId } from '../../app-ui/app-pages/search/widgets/SummaryWidget'
import { titleRepresentationDataTestId } from '../../app-ui/app-pages/search/widgets/TitleWidget'
import { cardRadioButtonSelectorDataTestId } from '../../app-ui/widgets/card-radio-button-selector/CardRadioButtonSelector'
import {
  selectModeToggleProperty,
  pickedRecipesToggleProperty,
  filteringToggleProperty,
  cookToggleProperty
} from '../../app-ui/widgets/toggles/Toggle'
import { recipesContentDataTestId } from '../../app-ui/app-pages/search/widgets/Widgets'

const CLIENT = 'localhost'
const CLIENT_BASE_URL = `http://${CLIENT}:3000`

const toolDataTestIdsByTool = {
  'select mode': viewModeManagementToolDataTestId,
  'picked recipes': pickingToolDataTestId,
  filtering: filteringToolDataTestId
}

export const toggleDataTestIdsByTool = {
  'select mode': selectModeToggleProperty,
  'picked recipes': pickedRecipesToggleProperty,
  filtering: filteringToggleProperty,
  cook: cookToggleProperty
}

const recipeDisplayTestIdsByMode = {
  [ViewRecipesMode.PHOTOS]: photoRepresentationDataTestId,
  [ViewRecipesMode.SUMMARIES]: summaryRepresentationDataTestId,
  [ViewRecipesMode.TITLES]: titleRepresentationDataTestId
}

export class RecipesSearchPage extends Base {
  navigateToCookbookAppRoute(route?: string) {
    const url = route ? `${CLIENT_BASE_URL}/${route}` : CLIENT_BASE_URL
    cy.visit(url)
  }

  headerTogglesAreVisible() {
    this.verifyIsVisible(togglesTestId)
  }

  managementToolVisibility(tool: string, isVisible: boolean) {
    const dataTestId = toolDataTestIdsByTool[tool]
    if (isVisible) this.verifyIsVisible(dataTestId)
    else this.verifyDataTestIdDoesNotExist(dataTestId)
  }

  toggleHeaderToggle(tool: string) {
    const dataTestId = toggleDataTestIdsByTool[tool]
    cy.getByDataTestId(dataTestId).click()
  }

  selectRecipeViewMode(mode: ViewRecipesMode) {
    cy.getByDataTestId(cardRadioButtonSelectorDataTestId).within(() => {
      cy.get('button').contains(mode).click()
    })
  }

  recipesAreDisplayedAsElementsOfType(type: ViewRecipesMode) {
    const dataTestId = recipeDisplayTestIdsByMode[type]
    cy.getByDataTestId(dataTestId).should('have.length.gt', 0)
  }

  pickedRecipesCountInToolComponent(count: number) {
    const toolDataTestId = pickingToolDataTestId
    const recipeElementDataTestId = titleRepresentationDataTestId
    cy.getByDataTestId(toolDataTestId).within(() => {
      if (count === 0) {
        this.verifyDataTestIdDoesNotExist(recipeElementDataTestId)
      } else {
        cy.getByDataTestId(recipeElementDataTestId).should('have.length', count)
      }
    })
  }

  countInToggleBadge(count: string, toggle: string) {
    const toggleDataTestId = toggleDataTestIdsByTool[toggle]
    if (count === '0') {
      cy.getByDataTestId(toggleDataTestId).contains(count).should('not.exist')
    } else {
      cy.getByDataTestId(toggleDataTestId).contains(count)
    }
  }

  clickDisplayedContentRecipeElementAtIndex(index: number) {
    const recipeElementDataTestId = photoRepresentationDataTestId
    cy.getByDataTestId(recipesContentDataTestId).within(() => {
      cy.getByDataTestId(recipeElementDataTestId).eq(index).click()
    })
  }

  clickRecipeElementInToolAtIndex(index: number) {
    const toolDataTestId = pickingToolDataTestId
    const recipeElementDataTestId = titleRepresentationDataTestId
    cy.getByDataTestId(toolDataTestId).within(() => {
      cy.getByDataTestId(recipeElementDataTestId)
        .eq(index)
        .within(() => {
          cy.get('[type="checkbox"]').uncheck({ force: true })
        })
    })
  }

  titleIsSameInToolAndContentDisplay() {
    cy.getByDataTestId(photoRepresentationDataTestId)
      .eq(0)
      .children('div')
      .then(($div) => {
        const title = $div.text()
        cy.getByDataTestId(titleRepresentationDataTestId).contains(title)
      })
  }
}
