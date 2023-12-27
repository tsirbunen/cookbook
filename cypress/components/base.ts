export class Base {
  verifyIsVisible(dataCy: string) {
    cy.getByDataCy(dataCy).should('be.visible')
  }

  verifyIsNotVisible(dataCy: string) {
    cy.getByDataCy(dataCy).should('not.be.visible')
  }

  verifyTextContentDoesExist(text: string) {
    cy.contains(text).should('exist')
  }

  verifyTextContentDoesNotExist(text: string) {
    cy.contains(text).should('not.exist')
  }

  verifyDataCyDoesNotExist(dataCy: string) {
    cy.getByDataCy(dataCy).should('not.exist')
  }

  verifyDataCyBeginsWithInstancesAreVisible(beginsWith: string, count?: number) {
    cy.getByDataCyBeginsWith(beginsWith, count).should('be.visible')
  }

  verifyDataCyContains(containedData: string) {
    cy.getByDataContains(containedData)
  }
}
