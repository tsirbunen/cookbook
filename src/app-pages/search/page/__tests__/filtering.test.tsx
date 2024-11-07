import '@testing-library/jest-dom/jest-globals'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals'
import { act, fireEvent, render, screen } from '@testing-library/react'
import type { AppState } from '../../../../state/StateContextProvider'
import TestApiServiceProvider, {
  NO_INGREDIENTS,
  NO_LANGUAGES,
  TEST_PREFIX
} from '../../../../test-utils/TestApiServiceProvider'
import TestSearchRecipesProvider from '../../../../test-utils/TestSearchRecipesProvider'
import { TestAppStateContextProvider } from '../../../../test-utils/TestStateContextProvider'
import type { Language, Tag } from '../../../../types/graphql-schema-types.generated'
import { formTextAreaSearchDataTestId } from '../../../../widgets/form-textarea-search/FormTextAreaSearch'
import FilteringManagementTool, {
  applyChangesLabel,
  applyFiltersLabel,
  clearFormLabel
} from '../../search-management/FilteringManagementTool'
import FilteringProvider, { type RecipesFilterValues, getEmptyFilterValues } from '../FilteringProvider'

const language = 'ENGLISH'
const tag = 'VEGETARIAN'
const changedTag = 'VEGAN'
const ingredient = 'BLUEBERRY'
const changedIngredient = 'STRAWBERRY'
const noFiltersTexts = [NO_LANGUAGES, NO_INGREDIENTS]
const testTextDisplays = [language, ingredient].map((text) => `${TEST_PREFIX}-${text}`)
const changedTextDisplays = [language, changedIngredient].map((text) => `${TEST_PREFIX}-${text}`)

describe('FilteringProvider and FilteringManagementTool', () => {
  it('enable setting multiple filters and storing the selected filter values', async () => {
    render(
      getFilteringProviderAndManagementToolToRender({
        initialFilterValues: getEmptyFilterValues(),
        languages: [{ language: language, id: 1 }],
        tags: [{ tag: tag, id: 1 }]
      })
    )

    for (const text of noFiltersTexts) {
      expect(screen.getByText(text)).toBeInTheDocument()
    }

    clickFormButtonWithLabel(language)
    clickFormButtonWithLabel(tag)
    addTextToTextArea(ingredient, formTextAreaSearchDataTestId)
    await clickApplyButton(applyFiltersLabel)

    for (const text of testTextDisplays) {
      expect(screen.getByText(text)).toBeInTheDocument()
    }
  })

  it('enable clearing selected filter values', async () => {
    const initialFilterValues = {
      languages: [language],
      tags: [tag],
      ingredients: { searchTerm: ingredient, searchMode: undefined }
    }

    render(
      getFilteringProviderAndManagementToolToRender({
        initialFilterValues,
        languages: [{ language: language, id: 1 }],
        tags: [{ tag: tag, id: 1 }]
      })
    )

    for (const text of testTextDisplays) {
      expect(screen.getByText(text)).toBeInTheDocument()
    }

    await clickClearButton(clearFormLabel)
    await clickApplyButton(applyChangesLabel)

    for (const text of noFiltersTexts) {
      expect(screen.getByText(text)).toBeInTheDocument()
    }
  })

  it('enable changing selected filter values', async () => {
    const initialFilterValues = {
      languages: [language],
      tags: [tag],
      ingredients: { searchTerm: ingredient, searchMode: undefined }
    }

    render(
      getFilteringProviderAndManagementToolToRender({
        initialFilterValues,
        languages: [{ language: language, id: 1 }],
        tags: [
          { tag: tag, id: 1 },
          { tag: changedTag, id: 2 }
        ]
      })
    )

    clickFormButtonWithLabel(tag)
    clickFormButtonWithLabel(changedTag)

    const ingredientsComponent = screen.getByTestId(formTextAreaSearchDataTestId)
    let trashButton: HTMLButtonElement | undefined
    const allButtons = ingredientsComponent.querySelectorAll('button')
    for (const button of allButtons) {
      if (button.textContent === '') {
        trashButton = button
        break
      }
    }
    if (!trashButton) throw new Error('Trash button should not be null')
    act(() => fireEvent.click(trashButton))

    addTextToTextArea(changedIngredient, formTextAreaSearchDataTestId)

    await clickApplyButton(applyChangesLabel)

    for (const text of changedTextDisplays) {
      expect(screen.getByText(text)).toBeInTheDocument()
    }
  })
})

const getFilteringProviderAndManagementToolToRender = ({
  initialFilterValues,
  languages,
  tags
}: {
  initialFilterValues: RecipesFilterValues
  languages: Language[]
  tags: Tag[]
}) => {
  return (
    <TestAppStateContextProvider
      initialState={
        {
          languages,
          tags,
          filters: initialFilterValues
        } as unknown as AppState
      }
    >
      <TestApiServiceProvider filterValues={initialFilterValues}>
        <TestSearchRecipesProvider>
          <FilteringProvider>
            <FilteringManagementTool />
          </FilteringProvider>
        </TestSearchRecipesProvider>
      </TestApiServiceProvider>
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
  const textArea = ingredientsComponent.querySelector('textarea') as HTMLTextAreaElement
  act(() => fireEvent.change(textArea, { target: { value: text } }))
}
