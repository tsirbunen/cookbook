import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'
import { App } from '../../components/app'
import { Page } from '../../../src/navigation/router/router'
import { AccountRoute } from '../../../app/account/[accountAction]/page'

const app = new App()

Given('one has navigated to the COOKBOOK app', () => {
  app.navigateToCookbookAppRoute()
})

Then('the welcome page is visible', () => {
  app.verifyWelcomePageIsVisible()
})

Given('one has started using the app in {string} mode', (mode: string) => {
  app.startUsingApp(mode as 'MEDIUM' | 'WIDE')
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

When(
  'one clicks the {string} button to navigate to that sub page',
  (subPage: 'CREATE ACCOUNT' | 'REQUEST CODE TO SIGN IN' | 'SIGN IN WITH CODE') => {
    app.clickAccountSubPageButton(subPage)
  }
)

Then(
  'the account sub page {string} is navigated to',
  (subPage: 'CREATE ACCOUNT' | 'REQUEST CODE TO SIGN IN' | 'SIGN IN WITH CODE') => {
    const page =
      subPage === 'CREATE ACCOUNT'
        ? AccountRoute.CREATE_ACCOUNT
        : subPage === 'REQUEST CODE TO SIGN IN'
        ? AccountRoute.REQUEST_CODE
        : AccountRoute.SIGN_IN_WITH_CODE
    app.pageIsVisible(`${Page.ACCOUNT}-${page}`)
  }
)
