'use client'

import LoadingPage from '../../src/components/loading/LoadingPage'
import ViewSizeContextProvider from '../../src/contexts/ViewSizeContext'
import FavoritesPage from '../../src/pages/FavoritesPage'

export default function Favorites() {
  if (typeof window === undefined) {
    return <LoadingPage />
  }

  return (
    <ViewSizeContextProvider>
      <FavoritesPage />
    </ViewSizeContextProvider>
  )
}
