import '@testing-library/jest-dom/jest-globals'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals'
import { act, fireEvent, render, screen } from '@testing-library/react'
import TestApiServiceProvider from '../../../../test-utils/TestApiServiceProvider'
import { getEmptyFilterValues } from '../../search-management/FilteringProvider'

import LocalStorageProvider, { LocalStorageKeys } from '../../../../state/LocalStorageProvider'
import { LocalStorageMock } from '../../../../state/__tests__/local-storage-mock'
import SearchRecipesProvider from '../SearchRecipesProvider'
import SearchRecipesProviderTestUser, {
  MODE,
  SET_MODE_TO_TITLES,
  SHOW_FILTERING,
  SHOW_PICKED_RECIPES,
  SHOW_RECIPES,
  SHOW_SELECT_MODE,
  TOGGLE_FAVORITE_RECIPE_ID,
  TOGGLE_HIDE_RECIPES,
  TOGGLE_SHOW_FILTERING,
  TOGGLE_SHOW_PICKED_RECIPES,
  TOGGLE_SHOW_SELECT_MODE
} from './SearchRecipesProviderTestUser'

global.localStorage = new LocalStorageMock()

describe('SearchRecipesProvider', () => {
  it('user can toggle show recipes', async () => {
    render(getSearchRecipesProviderToRender())

    confirmText(SHOW_RECIPES, true)
    await clickTestButton(TOGGLE_HIDE_RECIPES)
    confirmText(SHOW_RECIPES, false)
    await clickTestButton(TOGGLE_HIDE_RECIPES)
    confirmText(SHOW_RECIPES, true)
  })

  it('user can toggle show select mode', async () => {
    render(getSearchRecipesProviderToRender())

    confirmText(SHOW_SELECT_MODE, false)
    await clickTestButton(TOGGLE_SHOW_SELECT_MODE)
    confirmText(SHOW_SELECT_MODE, true)
    await clickTestButton(TOGGLE_SHOW_SELECT_MODE)
    confirmText(SHOW_SELECT_MODE, false)
  })

  it('user can toggle show picked recipes', async () => {
    render(getSearchRecipesProviderToRender())

    confirmText(SHOW_PICKED_RECIPES, false)
    await clickTestButton(TOGGLE_SHOW_PICKED_RECIPES)
    confirmText(SHOW_PICKED_RECIPES, true)
    await clickTestButton(TOGGLE_SHOW_PICKED_RECIPES)
    confirmText(SHOW_PICKED_RECIPES, false)
  })

  it('user can toggle show filtering', async () => {
    render(getSearchRecipesProviderToRender())

    confirmText(SHOW_FILTERING, false)
    await clickTestButton(TOGGLE_SHOW_FILTERING)
    confirmText(SHOW_FILTERING, true)
    await clickTestButton(TOGGLE_SHOW_FILTERING)
    confirmText(SHOW_FILTERING, false)
  })

  it('user can change recipe view mode to "titles"', async () => {
    render(getSearchRecipesProviderToRender())

    expect(screen.getByText(`${MODE}-PHOTOS`)).toBeInTheDocument()
    await clickTestButton(SET_MODE_TO_TITLES)
    confirmText(SHOW_FILTERING, false)
    expect(screen.getByText(`${MODE}-TITLES`)).toBeInTheDocument()
  })

  it('user can toggle favorite recipe ids', async () => {
    render(getSearchRecipesProviderToRender())

    let valueInStore = localStorage.getItem(LocalStorageKeys.FAVORITE_RECIPE_IDS)
    if (!valueInStore) throw new Error('Value in store should not be null')
    let valueAsArray = JSON.parse(valueInStore)
    expect(valueAsArray).toBeNull()

    await clickTestButton(TOGGLE_FAVORITE_RECIPE_ID)
    valueInStore = localStorage.getItem(LocalStorageKeys.FAVORITE_RECIPE_IDS)
    if (!valueInStore) throw new Error('Value in store should not be null')
    valueAsArray = JSON.parse(valueInStore)

    expect(valueAsArray.length).toBe(1)
    expect(valueAsArray[0]).toBe(1)
    expect(localStorage.length).toBe(1)

    await clickTestButton(TOGGLE_FAVORITE_RECIPE_ID)
    valueInStore = localStorage.getItem(LocalStorageKeys.FAVORITE_RECIPE_IDS)
    if (!valueInStore) throw new Error('Value in store should not be null')
    valueAsArray = JSON.parse(valueInStore)

    expect(valueAsArray.length).toBe(0)
  })
})

const getSearchRecipesProviderToRender = () => {
  return (
    <LocalStorageProvider>
      <TestApiServiceProvider filterValues={getEmptyFilterValues()}>
        <SearchRecipesProvider>
          <SearchRecipesProviderTestUser />
        </SearchRecipesProvider>
      </TestApiServiceProvider>
    </LocalStorageProvider>
  )
}

const clickTestButton = async (label: string) => {
  const button = screen.getByText(label.toUpperCase())
  await act(async () => {
    fireEvent.click(button)
  })
}

const confirmText = (id: string, shouldShow: boolean) => {
  expect(screen.getByText(`${id}-${shouldShow ? 'true' : 'false'}`)).toBeInTheDocument()
}
