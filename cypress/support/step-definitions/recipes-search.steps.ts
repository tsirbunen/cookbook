import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'
import { App } from '../../components/app'
import { RecipesSearchPage } from '../../components/recipes-search-page'
import { ViewRecipesMode } from '../../../app-ui/app-pages/search/tools/ViewModeTool'

const app = new App()
const recipesSearchPage = new RecipesSearchPage()

Given('use mode is {string}', (mode: string) => {
  app.setViewMode(mode as 'MEDIUM' | 'WIDE')
})

Given('one has navigated to the COOKBOOK app page {string}', (page: string) => {
  recipesSearchPage.navigateToCookbookAppRoute(page)
})

When('one toggles the toggle for tool {string}', (tool: string) => {
  recipesSearchPage.toggleHeaderToggle(tool)
})

Then('the header toggles are visible', () => {
  recipesSearchPage.headerTogglesAreVisible()
})

Then('management tool {string} {string} visible', (tool: string, isOrIsNot: string) => {
  const isVisible = isOrIsNot === 'is'
  recipesSearchPage.managementToolVisibility(tool, isVisible)
})

When('one selects recipes view mode {string}', (mode: string) => {
  recipesSearchPage.selectRecipeViewMode(mode.toUpperCase() as ViewRecipesMode)
})

Then('recipes are displayed as {string} elements', (mode: string) => {
  recipesSearchPage.recipesAreDisplayedAsElementsOfType(mode.toUpperCase() as ViewRecipesMode)
})

Then('the number of picked recipes shown in tool is {string}', (count: string) => {
  const expectedCount = parseInt(count)
  recipesSearchPage.pickedRecipesCountInToolComponent(expectedCount)
})

Then('the number of picked recipes shown in toggle badge is {string}', (count: string) => {
  recipesSearchPage.countInToggleBadge(count, 'picked recipes')
})

When('one clicks the displayed recipe at index {string}', (index: string) => {
  recipesSearchPage.clickDisplayedContentRecipeElementAtIndex(parseInt(index))
})

When('one clicks the picked recipe in the tool at index {string}', (index: string) => {
  recipesSearchPage.clickRecipeElementInToolAtIndex(parseInt(index))
})

Then('the selected title is the same in the tool and the display', () => {
  recipesSearchPage.titleIsSameInToolAndContentDisplay()
})

Then('all search management tools are {string}', (visible: string) => {
  const tools = ['select mode', 'picked recipes', 'filtering']
  tools.forEach((tool) => {
    recipesSearchPage.managementToolVisibility(tool, visible === 'visible')
  })
})
