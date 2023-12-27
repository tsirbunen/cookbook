import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'

import { App } from '../../components/app'
import { ViewMode } from '../../../src/contexts/ViewSizeContext'

const app = new App()

Given('one has navigated to the COOKBOOK app', () => {
  app.navigateToCookbookApp()
})

Then('the welcome page is visible', () => {
  app.verifyWelcomePageIsVisible()
})

Given('one has started using the app in {string} mode', (mode: string) => {
  app.startUsingApp(mode as ViewMode)
})

When('one clicks the menu button to open the navigation drawer', (useMode: string) => {
  app.openNavigationDrawer()
})

Then('the navigation drawer becomes visible', (targetPage: string) => {
  app.navigationDrawerIsOpen()
})

Then('the navigation bar is not available', () => {
  app.navigationBarIsNotAvailable()
})

Given('one has opened the navigation drawer', () => {
  app.setViewMode(ViewMode.MOBILE)
  app.navigateToCookbookApp()
  app.openNavigationDrawer()
  app.navigationDrawerIsOpen()
})

When('one taps {string}', (menuItem: string) => {
  app.tapNavigationDrawerItem(menuItem)
})

Then('the {string} is navigated to', (page: string) => {
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

When('one clicks {string}', (menuItem: string) => {
  app.clickNavigationBarItem(menuItem)
})
