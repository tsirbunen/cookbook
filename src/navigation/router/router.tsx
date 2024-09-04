import React from 'react'
import { IconType } from 'react-icons/lib'
import { TbSettings, TbBasket, TbWand, TbChefHat, TbSearch } from 'react-icons/tb'
import { IoHomeOutline } from 'react-icons/io5'
import { RiAccountCircleLine } from 'react-icons/ri'
import RecipesPage from '../../app-pages/search/page/SearchRecipesPage'
import SettingsPage from '../../app-pages/settings/SettingsPage'
import ShoppingPage from '../../app-pages/shopping/ShoppingPage'
import WizardPage from '../../app-pages/wizard/WizardPage'
import CookPage from '../../app-pages/cook/page/CookPage'
import HomePage from '../../app-pages/home/HomePage'
import AccountPage from '../../app-pages/account/AccountPage'

export enum Page {
  HOME = 'home',
  SEARCH = 'search',
  COOK = 'cook',
  WIZARD = 'wizard',
  SETTINGS = 'settings',
  SHOPPING = 'shopping',
  ACCOUNT = 'account'
}

export const pagePaths: Record<Page, string> = {
  [Page.HOME]: '/home',
  [Page.SEARCH]: '/search',
  [Page.COOK]: '/cook',
  [Page.WIZARD]: '/wizard',
  [Page.SETTINGS]: '/settings',
  [Page.SHOPPING]: '/shopping',
  [Page.ACCOUNT]: '/account'
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
    page: Page.SEARCH,
    label: 'search',
    iconElement: TbSearch,
    path: '/search',
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
  },
  {
    page: Page.ACCOUNT,
    label: 'account',
    iconElement: RiAccountCircleLine,
    path: '/account',
    element: AccountPage,
    headerHasTools: true
  }
]

export const getRouteLabelByPath = (path: string) => {
  return navigationMenuItems.find((item) => path.includes(item.path))?.label
}
