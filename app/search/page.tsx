'use client'

import dynamic from 'next/dynamic'

const SearchRecipesPage = dynamic(() => import('../../src/app-pages/search/page/SearchRecipesPage'), {
  ssr: false
})

/**
 * This is a Next-required default export component for route "/recipes".
 * For this (as for other routes) the returned components' code is in the
 * src/app-pages folder.
 */
export default function Recipes() {
  return <SearchRecipesPage />
}
