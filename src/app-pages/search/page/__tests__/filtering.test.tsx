import '@testing-library/jest-dom/jest-globals'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TestAppStateContextProvider } from '../../../../test-utils/TestStateContextProvider'
import TestRecipeServiceProvider, {
  NO_CATEGORIES,
  NO_INGREDIENTS,
  NO_LANGUAGES,
  TEST_PREFIX
} from '../../../../test-utils/TestRecipeServiceProvider'
import FilteringProvider, { RecipesFilterValues, getEmptyFilterValues } from '../FilteringProvider'
import FilteringManagementTool, {
  applyChangesLabel,
  applyFiltersLabel,
  clearFormLabel
} from '../../search-management/FilteringManagementTool'
import { formTextAreaSearchDataTestId } from '../../../../widgets/form-textarea-search/FormTextAreaSearch'
import TestSearchRecipesProvider from '../../../../test-utils/TestSearchRecipesProvider'
import { AppState } from '../../../../state/StateContextProvider'

const category = 'DINNER'
const language = 'ENGLISH'
const ingredient = 'BLUEBERRY'
const changedCategory = 'BREAKFAST'
const changedIngredient = 'STRAWBERRY'
const noFiltersTexts = [NO_CATEGORIES, NO_LANGUAGES, NO_INGREDIENTS]
const testTextDisplays = [category, language, ingredient].map((text) => `${TEST_PREFIX}-${text}`)
const changedTextDisplays = [changedCategory, language, changedIngredient].map((text) => `${TEST_PREFIX}-${text}`)

describe('FilteringProvider and FilteringManagementTool', () => {
  it('enable setting multiple filters and storing the selected filter values', async () => {
    render(getFilteringProviderAndManagementToolToRender({ initialFilterValues: getEmptyFilterValues() }))

    noFiltersTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })

    clickFormButtonWithLabel(category)
    clickFormButtonWithLabel(language)
    addTextToTextArea(ingredient, formTextAreaSearchDataTestId)
    await clickApplyButton(applyFiltersLabel)

    testTextDisplays.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  it('enable clearing selected filter values', async () => {
    const initialFilterValues = {
      categories: [category],
      languages: [language],
      ingredients: { searchTerm: ingredient, searchMode: undefined }
    }

    render(getFilteringProviderAndManagementToolToRender({ initialFilterValues }))

    testTextDisplays.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })

    await clickClearButton(clearFormLabel)
    await clickApplyButton(applyChangesLabel)

    noFiltersTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  it('enable changing selected filter values', async () => {
    const initialFilterValues = {
      categories: [category],
      languages: [language],
      ingredients: { searchTerm: ingredient, searchMode: undefined }
    }

    render(getFilteringProviderAndManagementToolToRender({ initialFilterValues }))

    clickFormButtonWithLabel(category)
    clickFormButtonWithLabel(changedCategory)

    const ingredientsComponent = screen.getByTestId(formTextAreaSearchDataTestId)
    let trashButton
    const allButtons = ingredientsComponent.querySelectorAll('button')
    allButtons.forEach((button) => {
      if (button.textContent === '') trashButton = button
    })
    act(() => fireEvent.click(trashButton!))

    addTextToTextArea(changedIngredient, formTextAreaSearchDataTestId)

    await clickApplyButton(applyChangesLabel)

    changedTextDisplays.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })
})

const getFilteringProviderAndManagementToolToRender = ({
  initialFilterValues
}: {
  initialFilterValues: RecipesFilterValues
}) => {
  return (
    <TestAppStateContextProvider
      initialState={
        {
          filters: initialFilterValues
        } as unknown as AppState
      }
    >
      <TestRecipeServiceProvider filterValues={initialFilterValues}>
        <TestSearchRecipesProvider>
          <FilteringProvider>
            <FilteringManagementTool />
          </FilteringProvider>
        </TestSearchRecipesProvider>
      </TestRecipeServiceProvider>
    </TestAppStateContextProvider>
  )
}

const clickApplyButton = async (applyLabel: string) => {
  const applyButton = screen.getByText(applyLabel.toUpperCase())
  await act(async () => {
    fireEvent.click(applyButton)
  })
}

const clickClearButton = async (label: string) => {
  const clearButton = screen.getByText(label.toUpperCase())
  await act(async () => {
    fireEvent.click(clearButton)
  })
}

const clickFormButtonWithLabel = (label: string) => {
  const button = screen.getByText(label)
  act(() => fireEvent.click(button))
}

const addTextToTextArea = (text: string, testId: string) => {
  const ingredientsComponent = screen.getByTestId(testId)
  const textArea = ingredientsComponent.querySelector('textarea')
  act(() => fireEvent.change(textArea!, { target: { value: text } }))
}
