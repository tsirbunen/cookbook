import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'
import { App } from '../../components/app'
import { ViewMode } from '../../../src/layout/view-size-service/ViewSizeProvider'
import { RecipesViewingPage } from '../../components/recipes-viewing-page'
import { ViewRecipesMode } from '../../../src/app-pages/search/search-management/ViewModeManagementTool'

const app = new App()
const recipesViewingPage = new RecipesViewingPage()

Given('use mode is {string}', (mode: string) => {
  app.setViewMode(mode as ViewMode)
})

Given('one has navigated to the COOKBOOK app page {string}', (page: string) => {
  recipesViewingPage.navigateToCookbookAppRoute(page)
})

When('one toggles the toggle for tool {string}', (tool: string) => {
  recipesViewingPage.toggleHeaderToggle(tool)
})

Then('the header toggles are visible', () => {
  recipesViewingPage.headerTogglesAreVisible()
})

Then('management tool {string} {string} visible', (tool: string, isOrIsNot: string) => {
  const isVisible = isOrIsNot === 'is'
  recipesViewingPage.managementToolVisibility(tool, isVisible)
})

When('one selects recipes view mode {string}', (mode: string) => {
  recipesViewingPage.selectRecipeViewMode(mode.toUpperCase() as ViewRecipesMode)
})

Then('recipes are displayed as {string} elements', (mode: string) => {
  recipesViewingPage.recipesAreDisplayedAsElementsOfType(mode.toUpperCase() as ViewRecipesMode)
})

Then('the number of picked recipes shown in tool is {string}', (count: string) => {
  const expectedCount = parseInt(count)
  recipesViewingPage.pickedRecipesCountInToolComponent(expectedCount)
})

Then('the number of picked recipes shown in toggle badge is {string}', (count: string) => {
  recipesViewingPage.countInToggleBadge(count, 'picked recipes')
})

When('one clicks the displayed recipe at index {string}', (index: string) => {
  recipesViewingPage.clickDisplayedContentRecipeElementAtIndex(parseInt(index))
})

When('one clicks the picked recipe in the tool at index {string}', (index: string) => {
  recipesViewingPage.clickRecipeElementInToolAtIndex(parseInt(index))
})

Then('the selected title is the same in the tool and the display', () => {
  recipesViewingPage.titleIsSameInToolAndContentDisplay()
})

Then('all viewing management tools are {string}', (visible: string) => {
  const tools = ['select mode', 'picked recipes', 'filtering']
  tools.forEach((tool) => {
    recipesViewingPage.managementToolVisibility(tool, visible === 'visible')
  })
})
