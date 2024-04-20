import { Base } from './base'
import { formButtonsSelectorDataTestId } from '../../src/widgets/form-buttons-selector/FormButtonsSelector'
import { formTextAreaSearchDataTestId } from '../../src/widgets/form-textarea-search/FormTextAreaSearch'
import { formSubmitButtonsDataTestId } from '../../src/widgets/form-submit-buttons/FormSubmitButtons'
import { photoRepresentationDataTestId } from '../../src/app-pages/search/recipes-display/PhotoCardRecipe'
import { filteringManagementToolDataTestId } from '../../src/app-pages/search/search-management/FilteringManagementTool'

export class RecipesFilterForm extends Base {
  verifyFormContainsElement(element: string) {
    let dataTestId
    let label

    if (element === 'categories selection') {
      dataTestId = formButtonsSelectorDataTestId
      label = 'categories'.toUpperCase()
    } else if (element === 'languages selection') {
      dataTestId = formButtonsSelectorDataTestId
      label = 'categories'.toUpperCase()
    } else if (element === 'ingredients selection') {
      dataTestId = formTextAreaSearchDataTestId
      label = 'ingredients'.toUpperCase()
    } else if (element === 'action buttons') {
      dataTestId = formSubmitButtonsDataTestId
    }

    this.verifyAreVisible(dataTestId)

    if (label) {
      cy.getByDataTestId(filteringManagementToolDataTestId).should('contain', label)
    }
  }

  clickFormCategoryButton(buttonLabel: string) {
    cy.getByDataTestId(formButtonsSelectorDataTestId)
      .first()
      .within(() => {
        cy.contains(buttonLabel).click()
      })
  }

  submitForm() {
    cy.getByDataTestId(formSubmitButtonsDataTestId).within(() => {
      cy.get('button[type="submit"]').click()
    })
  }

  clearForm() {
    cy.getByDataTestId(formSubmitButtonsDataTestId).within(() => {
      cy.get('button[type="button"]').click()
    })
  }

  checkDisplayedRecipesCount(count: number, type: 'exactly' | 'more than' | 'less than') {
    const comparison = type === 'exactly' ? 'have.length' : type === 'more than' ? 'have.length.gt' : 'have.length.lt'
    cy.getByDataTestId(photoRepresentationDataTestId).should(comparison, count)
  }

  enterIngredientsSearchTerm(searchTerm: string) {
    cy.getByDataTestId(formTextAreaSearchDataTestId).within(() => {
      cy.get('textarea').type(searchTerm)
    })
  }
}
