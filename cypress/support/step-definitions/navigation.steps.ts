import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'
import { App } from '../../components/app'
import { ViewMode } from '../../../src/layout/view-size-service/ViewSizeProvider'

const app = new App()

Given('one has navigated to the COOKBOOK app', () => {
  app.navigateToCookbookAppRoute()
})

Then('the welcome page is visible', () => {
  app.verifyWelcomePageIsVisible()
})

Given('one has started using the app in {string} mode', (mode: string) => {
  app.startUsingApp(mode as ViewMode)
})

When('one clicks the menu button to open the navigation drawer', () => {
  app.openNavigationDrawer()
})

Then('the navigation drawer becomes visible', () => {
  app.navigationDrawerIsOpen()
})

Then('the navigation bar is not available', () => {
  app.navigationBarIsNotAvailable()
})

Given('one has opened the navigation drawer', () => {
  app.setViewMode(ViewMode.MOBILE)
  app.navigateToCookbookAppRoute()
  app.openNavigationDrawer()
  app.navigationDrawerIsOpen()
})

When('one taps navigation drawer {string}', (menuItem: string) => {
  app.tapNavigationDrawerItem(menuItem)
})

Then('the page {string} is navigated to', (page: string) => {
  app.pageIsVisible(page)
})

Then('the navigation drawer is closed', () => {
  app.navigationDrawerIsClosed()
})

Then('the navigation bar is visible', () => {
  app.navigationBarIsVisible()
})

Then('the navigation drawer is not available', () => {
  app.navigationDrawerIsNotAvailable()
})

When('one clicks menu item {string}', (menuItem: string) => {
  app.clickNavigationBarItem(menuItem)
})
