'use client'

import dynamic from 'next/dynamic'

const RecipesPage = dynamic(() => import('../../src/app-pages/recipes/page/RecipesPage'), {
  ssr: false
})

export default function Recipes() {
  return <RecipesPage />
}
