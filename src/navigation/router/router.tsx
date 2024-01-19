import React from 'react'
import { IconType } from 'react-icons/lib'
import { TbSettings, TbListDetails, TbBasket, TbWand, TbBook, TbStar } from 'react-icons/tb'

import RecipesPage from '../../app-pages/recipes/RecipesPage'
import SettingsPage from '../../app-pages/settings/SettingsPage'
import ShoppingPage from '../../app-pages/shopping/ShoppingPage'
import FavoritesPage from '../../app-pages/favorites/FavoritesPage'
import WizardPage from '../../app-pages/wizard/WizardPage'
import CookPage from '../../app-pages/cook/CookPage'

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
  element: () => React.ReactNode
  errorElement?: () => React.ReactNode
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
    iconElement: TbStar,
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
