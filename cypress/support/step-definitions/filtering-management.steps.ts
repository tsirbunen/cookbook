import { When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'
import { RecipesSearchPage } from '../../components/recipes-search-page'
import { RecipesFilterForm } from '../../components/recipes-filter-form'

const recipesSearchPage = new RecipesSearchPage()
const recipesFilterForm = new RecipesFilterForm()

Then('the form contains the following elements:', (dataTable: DataTable) => {
  const dataRows = dataTable.hashes()
  dataRows.forEach((row) => {
    recipesFilterForm.verifyFormContainsElement(row.element)
  })
})

Then('the number of set filters shown in toggle badge is {string}', (count: string) => {
  recipesSearchPage.countInToggleBadge(count, 'filtering')
})

Then('no number is shown in toggle badge', () => {
  recipesSearchPage.countInToggleBadge('0', 'filtering')
})

When('one clicks the {string} button {string}', (languageOrTag: string, buttonLabel: string) => {
  const selectorIndex = languageOrTag === 'language' ? 0 : 1
  recipesFilterForm.clickFormButton(selectorIndex, buttonLabel)
})

When('one submits the form', () => {
  recipesFilterForm.submitForm()
})

Then('{string} {string} recipes are displayed', (description: string, amount: string) => {
  const count = parseInt(amount)
  recipesFilterForm.checkDisplayedRecipesCount(count, description as 'exactly' | 'more than' | 'less than')
})

When('one clears the form', () => {
  recipesFilterForm.clearForm()
})

When('one enters text {string} into the ingredients text input area', (searchTerm: string) => {
  recipesFilterForm.enterIngredientsSearchTerm(searchTerm)
})
