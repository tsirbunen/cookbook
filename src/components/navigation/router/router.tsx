import React from 'react'
import { IconType } from 'react-icons/lib'
import { TbSettings, TbListDetails, TbBasket, TbWand, TbBook, TbHeart } from 'react-icons/tb'
import { createBrowserRouter } from 'react-router-dom'
import RecipesPage from '../../pages/RecipesPage'
import SettingsPage from '../../pages/SettingsPage'
import ShoppingPage from '../../pages/ShoppingPage'
import FavoritesPage from '../../pages/FavoritesPage'
import WizardPage from '../../pages/WizardPage'
import CookPage from '../../pages/CookPage'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import ErrorPage from './ErrorPage'

export enum Page {
  RECIPES = 'recipes',
  COOK = 'cook',
  WIZARD = 'wizard',
  FAVORITES = 'favorites',
  SETTINGS = 'settings',
  SHOPPING = 'shopping'
}

export type NavigationMenuItem = {
  page: Page | 'not found'
  label: string
  iconElement: IconType
  path: string
  element: () => EmotionJSX.Element
  errorElement?: () => EmotionJSX.Element
}

export const navigationMenuItems: NavigationMenuItem[] = [
  {
    page: Page.RECIPES,
    label: 'recipes',
    iconElement: TbListDetails,
    path: '/recipes',
    element: RecipesPage
  },
  {
    page: Page.COOK,
    label: 'cook',
    iconElement: TbBook,
    path: '/cook',
    element: CookPage
  },
  {
    page: Page.WIZARD,
    label: 'wizard',
    iconElement: TbWand,
    path: '/wizard',
    element: WizardPage
  },
  {
    page: Page.FAVORITES,
    label: 'favorites',
    iconElement: TbHeart,
    path: '/favorites',
    element: FavoritesPage
  },
  {
    page: Page.SHOPPING,
    label: 'shopping',
    iconElement: TbBasket,
    path: '/shopping',
    element: ShoppingPage
  },
  {
    page: Page.SETTINGS,
    label: 'settings',
    iconElement: TbSettings,
    path: '/settings',
    element: SettingsPage
  }
]

const routes = navigationMenuItems.map((item) => {
  const Element = item.element
  return { ...item, element: <Element />, errorElement: <ErrorPage /> }
})

routes.push({
  page: Page.RECIPES,
  label: 'recipes',
  iconElement: TbListDetails,
  path: '/',
  element: <RecipesPage />,
  errorElement: <ErrorPage />
})

routes.push({
  page: 'not found',
  label: 'not found',
  iconElement: TbListDetails,
  path: '*',
  element: <ErrorPage />,
  errorElement: <ErrorPage />
})

export const router = createBrowserRouter(routes)
