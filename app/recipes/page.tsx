'use client'

import LoadingPage from '../../src/components/loading/LoadingPage'
import ViewSizeContextProvider from '../../src/contexts/ViewSizeContext'
import RecipesPage from '../../src/pages/RecipesPage'

export default function Recipes() {
  if (typeof window === undefined) {
    return <LoadingPage />
  }

  return (
    <ViewSizeContextProvider>
      <RecipesPage />
    </ViewSizeContextProvider>
  )
}
