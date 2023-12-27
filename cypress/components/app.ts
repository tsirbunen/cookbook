import { Base } from './base'
import { ViewMode } from '../../src/contexts/ViewSizeContext'
import {
  drawerButtonDataCy,
  drawerDataCy,
  drawerTitle
} from '../../src/components/navigation/navigation-drawer/NavigationDrawer'
import { drawerItemDataCy } from '../../src/components/navigation/navigation-drawer/NavigationDrawerItem'
import { navigationBarDataCy } from '../../src/components/navigation/navigation-bar/NavigationBarItem'

const CLIENT = 'localhost'
const CLIENT_BASE_URL = `http://${CLIENT}:3000`

const viewPorts = {
  MOBILE: [400, 750],
  NARROW: [500, 750],
  MEDIUM: [650, 750],
  WIDE: [900, 750]
}

export class App extends Base {
  navigateToCookbookApp() {
    cy.visit(CLIENT_BASE_URL)
  }

  setViewMode(mode: ViewMode) {
    const [width, height] = viewPorts[mode]
    cy.viewport(width, height)
    cy.debug()
    cy.window().its('innerWidth').should('equal', width)
  }

  openNavigationDrawer() {
    cy.getByDataCy(drawerButtonDataCy).click()
  }

  navigationDrawerIsOpen() {
    this.verifyIsVisible(drawerDataCy)
    this.verifyTextContentDoesExist(drawerTitle)
  }

  navigationDrawerIsClosed() {
    this.verifyTextContentDoesNotExist(drawerTitle)
  }

  navigationDrawerIsNotAvailable() {
    this.verifyDataCyDoesNotExist(drawerDataCy)
  }

  tapNavigationDrawerItem(menuItem: string) {
    cy.getByDataCy(drawerItemDataCy).filter(`:contains("${menuItem}")`).click()
  }

  pageIsVisible(page: string) {
    this.verifyIsVisible(`${page}-page`)
  }

  navigationBarIsVisible() {
    this.verifyIsVisible(navigationBarDataCy)
  }

  navigationBarIsNotAvailable() {
    this.verifyDataCyDoesNotExist(navigationBarDataCy)
  }

  clickNavigationBarItem(menuItem: string) {
    cy.getByDataCy(navigationBarDataCy).filter(`:contains("${menuItem.toUpperCase()}")`).click()
  }
}
