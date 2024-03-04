import { Base } from './base'
import { ViewMode } from '../../src/layout/view-size-service/ViewSizeProvider'
import {
  drawerButtonDataTestId,
  drawerDataTestId,
  drawerTitle
} from '../../src/navigation/navigation-drawer/NavigationDrawer'
import { drawerItemDataTestId } from '../../src/navigation/navigation-drawer/NavigationDrawerItem'
import { navigationBarDataTestId } from '../../src/navigation/navigation-bar/NavigationBarItem'
import { launchPageTestId, startButtonTestId } from '../../app/page'

const CLIENT = 'localhost'
const CLIENT_BASE_URL = `http://${CLIENT}:3000`

const viewPortWindowWidthHeightPairs = {
  MOBILE: [400, 750],
  NARROW: [500, 750],
  MEDIUM: [650, 750],
  WIDE: [900, 750],
  VERY_WIDE: [1400, 750]
}

export class App extends Base {
  navigateToCookbookAppRoute(route?: string) {
    const url = route ? `${CLIENT_BASE_URL}/${route}` : CLIENT_BASE_URL
    cy.visit(url)
  }

  verifyWelcomePageIsVisible() {
    this.verifyIsVisible(launchPageTestId)
  }

  startUsingApp(mode: ViewMode) {
    cy.getByDataTestId(startButtonTestId).click()
    // Note: We must wait for the dynamically loaded items to catch up!
    cy.wait(350)
    this.setViewMode(mode)
  }

  setViewMode(mode: ViewMode) {
    const [width, height] = viewPortWindowWidthHeightPairs[mode]
    cy.viewport(width, height)
    cy.debug()
    cy.window().its('innerWidth').should('equal', width)
  }

  openNavigationDrawer() {
    cy.getByDataTestId(drawerButtonDataTestId).click()
  }

  navigationDrawerIsOpen() {
    this.verifyIsVisible(drawerDataTestId)
    this.verifyTextContentDoesExist(drawerTitle)
  }

  navigationDrawerIsClosed() {
    this.verifyTextContentDoesNotExist(drawerTitle)
  }

  navigationDrawerIsNotAvailable() {
    this.verifyDataTestIdDoesNotExist(drawerDataTestId)
  }

  tapNavigationDrawerItem(menuItem: string) {
    cy.getByDataTestId(drawerItemDataTestId).filter(`:contains("${menuItem}")`).click()
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
}
