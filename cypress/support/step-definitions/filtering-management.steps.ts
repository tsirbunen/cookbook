import { When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'
import { RecipesViewingPage } from '../../components/recipes-viewing-page'
import { RecipesFilterForm } from '../../components/recipes-filter-form'

const recipesViewingPage = new RecipesViewingPage()
const recipesFilterForm = new RecipesFilterForm()

Then('the form contains the following elements:', (dataTable: DataTable) => {
  const dataRows = dataTable.hashes()
  dataRows.forEach((row) => {
    recipesFilterForm.verifyFormContainsElement(row.element)
  })
})

Then('the number of set filters shown in toggle badge is {string}', (count: string) => {
  recipesViewingPage.countInToggleBadge(count, 'filtering')
})

// When('one clicks the {string} button {string}', (category: string, buttonLabel: string) => {
//   recipesFilterForm.clickFormCategoryButton(buttonLabel)
// })

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
