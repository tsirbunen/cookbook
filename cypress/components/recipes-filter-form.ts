import { Base } from './base'
import { formButtonsSelectorDataTestId } from '../../app-ui/widgets/form-buttons-selector/FormButtonsSelector'
import { formTextAreaSearchDataTestId } from '../../app-ui/widgets/form-textarea-search/FormTextAreaSearch'
import { formSubmitButtonsDataTestId } from '../../app-ui/widgets/form-submit-buttons/FormSubmitButtons'
import { photoRepresentationDataTestId } from '../../app-ui/app-pages/search/widgets/PhotoWidget'
import { filteringToolDataTestId } from '../../app-ui/app-pages/search/tools/FilteringTool'

export class RecipesFilterForm extends Base {
  verifyFormContainsElement(element: string) {
    let dataTestId
    let label

    if (element === 'languages selection') {
      dataTestId = formButtonsSelectorDataTestId
      label = 'languages'.toUpperCase()
    } else if (element === 'tags selection') {
      dataTestId = formTextAreaSearchDataTestId
      label = 'tags'.toUpperCase()
    } else if (element === 'ingredients selection') {
      dataTestId = formTextAreaSearchDataTestId
      label = 'ingredients'.toUpperCase()
    } else if (element === 'action buttons') {
      dataTestId = formSubmitButtonsDataTestId
    }

    this.verifyAreVisible(dataTestId)

    if (label) {
      cy.getByDataTestId(filteringToolDataTestId).should('contain', label)
    }
  }

  clickFormButton(selectorIndex: number, buttonLabel: string) {
    cy.getByDataTestId(formButtonsSelectorDataTestId).each(($selector, index) => {
      if (index === selectorIndex) {
        cy.wrap($selector).contains(buttonLabel).click()
      }
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
