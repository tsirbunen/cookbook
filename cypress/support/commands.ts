/// <reference types="cypress" />

Cypress.Commands.add('getByDataTestId', (dataTestId: string) => {
  return cy.get(`[data-testid=${dataTestId}]`)
})

Cypress.Commands.add('getByDataTestIdBeginsWith', (dataTestIdBeginsWith: string, count?: number) => {
  if (count) return cy.get(`[data-testid^=${dataTestIdBeginsWith}]`).should('have.length', count)
  return cy.get(`[data-testid^=${dataTestIdBeginsWith}]`)
})

Cypress.Commands.add('getByDataTestIdContains', (dataContained: string) => {
  return cy.get(`[data-testid*=${dataContained}]`)
})

Cypress.Commands.addQuery('escapeFromWithin', () => () => cy.$$('body'))
