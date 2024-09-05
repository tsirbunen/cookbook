import { Base } from './base'
import { navigationBarDataTestId } from '../../src/navigation/navigation-bar/NavigationBarItem'
import { launchPageTestId, startButtonTestId } from '../../app/page'

const CLIENT = 'localhost'
const CLIENT_BASE_URL = `http://${CLIENT}:3000`

const viewPortWindowWidthHeightPairs = {
  MEDIUM: [650, 750],
  WIDE: [1400, 750]
}

export class App extends Base {
  navigateToCookbookAppRoute(route?: string) {
    const url = route ? `${CLIENT_BASE_URL}/${route}` : CLIENT_BASE_URL
    cy.visit(url)
  }

  verifyWelcomePageIsVisible() {
    this.verifyIsVisible(launchPageTestId)
  }

  startUsingApp(mode: 'MEDIUM' | 'WIDE') {
    cy.getByDataTestId(startButtonTestId).click()
    // Note: We must wait for the dynamically loaded items to catch up!
    cy.wait(350)
    this.setViewMode(mode)
  }

  setViewMode(mode: 'MEDIUM' | 'WIDE') {
    const [width, height] = viewPortWindowWidthHeightPairs[mode]
    cy.viewport(width, height)
    cy.debug()
    cy.window().its('innerWidth').should('equal', width)
  }

  pageIsVisible(page: string) {
    this.verifyIsVisible(`${page}-page`)
  }

  navigationBarIsVisible() {
    this.verifyIsVisible(navigationBarDataTestId)
  }

  navigationBarIsNotAvailable() {
    this.verifyDataTestIdDoesNotExist(navigationBarDataTestId)
  }

  clickNavigationBarItem(menuItem: string) {
    cy.getByDataTestId(navigationBarDataTestId).filter(`:contains("${menuItem.toUpperCase()}")`).click()
  }

  clickAccountSubPageButton(subPage: 'CREATE ACCOUNT' | 'REQUEST CODE TO SIGN IN' | 'SIGN IN WITH CODE') {
    cy.get('button').contains(subPage).click()
  }
}
