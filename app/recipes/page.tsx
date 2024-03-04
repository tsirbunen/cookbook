'use client'

import dynamic from 'next/dynamic'

const RecipesViewingPage = dynamic(() => import('../../src/app-pages/recipes/page/RecipesViewingPage'), {
  ssr: false
})

/**
 * This is a Next-required default export component for route "/recipes".
 * For this (as for other routes) the returned components' code is in the
 * src/app-pages folder.
 */
export default function Recipes() {
  return <RecipesViewingPage />
}
