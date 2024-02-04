'use client'

import dynamic from 'next/dynamic'

const RecipesViewingPage = dynamic(() => import('../../src/app-pages/recipes-viewing/page/RecipesViewingPage'), {
  ssr: false
})

export default function Recipes() {
  return <RecipesViewingPage />
}
