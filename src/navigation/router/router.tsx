import React from 'react'
import { IconType } from 'react-icons/lib'
import { TbSettings, TbListDetails, TbBasket, TbWand, TbBook, TbHeart } from 'react-icons/tb'

import RecipesPage from '../../app-pages/RecipesPage'
import SettingsPage from '../../app-pages/SettingsPage'
import ShoppingPage from '../../app-pages/ShoppingPage'
import FavoritesPage from '../../app-pages/FavoritesPage'
import WizardPage from '../../app-pages/WizardPage'
import CookPage from '../../app-pages/CookPage'

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
