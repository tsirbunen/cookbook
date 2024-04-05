import React from 'react'
import { IconType } from 'react-icons/lib'
import { TbSettings, TbListDetails, TbBasket, TbWand, TbChefHat, TbStar } from 'react-icons/tb'
import { IoHomeOutline } from 'react-icons/io5'
import RecipesPage from '../../app-pages/recipes/page/RecipesViewingPage'
import SettingsPage from '../../app-pages/settings/SettingsPage'
import ShoppingPage from '../../app-pages/shopping/ShoppingPage'
import FavoritesPage from '../../app-pages/favorites/FavoritesPage'
import WizardPage from '../../app-pages/wizard/WizardPage'
import CookPage from '../../app-pages/cook/page/CookPage'
import HomePage from '../../app-pages/home/HomePage'

export enum Page {
  HOME = 'home',
  RECIPES = 'recipes',
  COOK = 'cook',
  WIZARD = 'wizard',
  FAVORITES = 'favorites',
  SETTINGS = 'settings',
  SHOPPING = 'shopping'
}

export const pagePaths: Record<Page, string> = {
  [Page.HOME]: '/home',
  [Page.RECIPES]: '/recipes',
  [Page.COOK]: '/cook',
  [Page.WIZARD]: '/wizard',
  [Page.FAVORITES]: '/favorites',
  [Page.SETTINGS]: '/settings',
  [Page.SHOPPING]: '/shopping'
}

export type NavigationMenuItem = {
  page: Page | 'not found'
  label: string
  iconElement: IconType
  path: string
  element: () => React.ReactNode
  errorElement?: () => React.ReactNode
  headerHasTools: boolean
}

export const navigationMenuItems: NavigationMenuItem[] = [
  {
    page: Page.HOME,
    label: 'home',
    iconElement: IoHomeOutline,
    path: '/home',
    element: HomePage,
    headerHasTools: true
  },
  {
    page: Page.RECIPES,
    label: 'recipes',
    iconElement: TbListDetails,
    path: '/recipes',
    element: RecipesPage,
    headerHasTools: true
  },
  {
    page: Page.COOK,
    label: 'cook',
    iconElement: TbChefHat,
    path: '/cook',
    element: CookPage,
    headerHasTools: true
  },
  {
    page: Page.WIZARD,
    label: 'wizard',
    iconElement: TbWand,
    path: '/wizard',
    element: WizardPage,
    headerHasTools: true
  },
  {
    page: Page.FAVORITES,
    label: 'favorites',
    iconElement: TbStar,
    path: '/favorites',
    element: FavoritesPage,
    headerHasTools: true
  },
  {
    page: Page.SHOPPING,
    label: 'shopping',
    iconElement: TbBasket,
    path: '/shopping',
    element: ShoppingPage,
    headerHasTools: true
  },
  {
    page: Page.SETTINGS,
    label: 'settings',
    iconElement: TbSettings,
    path: '/settings',
    element: SettingsPage,
    headerHasTools: true
  }
]

export const getRouteLabelByPath = (path: string) => {
  return navigationMenuItems.find((item) => item.path === path)?.label
}

export const getPageHeaderHasToolsByPath = (path: string) => {
  return navigationMenuItems.find((item) => item.path === path)?.headerHasTools
}
