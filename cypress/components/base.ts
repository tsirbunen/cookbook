export class Base {
  verifyIsVisible(dataTestId: string) {
    cy.getByDataTestId(dataTestId).should('be.visible')
  }

  verifyIsNotVisible(dataTestId: string) {
    cy.getByDataTestId(dataTestId).should('not.be.visible')
  }

  verifyTextContentDoesExist(text: string) {
    cy.contains(text).should('exist')
  }

  verifyTextContentDoesNotExist(text: string) {
    cy.contains(text).should('not.exist')
  }

  verifyDataTestIdDoesNotExist(dataTestId: string) {
    cy.getByDataTestId(dataTestId).should('not.exist')
  }

  verifyDataTestIdBeginsWithInstancesAreVisible(beginsWith: string, count?: number) {
    cy.getByDataTestIdBeginsWith(beginsWith, count).should('be.visible')
  }

  verifyDataTestIdContains(containedData: string) {
    cy.getByDataTestIdContains(containedData)
  }
}
