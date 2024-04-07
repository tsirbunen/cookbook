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

Then('the navigation bar is not available', () => {
  app.navigationBarIsNotAvailable()
})

Then('the page {string} is navigated to', (page: string) => {
  app.pageIsVisible(page)
})

Then('the navigation bar is visible', () => {
  app.navigationBarIsVisible()
})

When('one clicks menu item {string}', (menuItem: string) => {
  app.clickNavigationBarItem(menuItem)
})
