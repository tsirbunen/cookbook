'use client'

import dynamic from 'next/dynamic'
import LoadingPage from '../../src/components/loading/LoadingPage'

const RecipesPage = dynamic(() => import('../../src/app-pages/RecipesPage'), {
  ssr: false
})

const ViewSizeContextProvider = dynamic(() => import('../../src/contexts/ViewSizeContext'), {
  ssr: false
})

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
