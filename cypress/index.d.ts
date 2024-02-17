declare namespace Cypress {
  interface Chainable {
    getByDataTestId(dataTestId: string): Chainable<JQuery<HTMLElement>>
    getByDataTestIdBeginsWith(dataTestIdBeginsWith: string, count?: number): Chainable<JQuery<HTMLElement>>
    getByDataTestIdContains(dataContained: string): Chainable<JQuery<HTMLElement>>
    escapeFromWithin(): Chainable<JQuery<HTMLElement>>
  }
}
