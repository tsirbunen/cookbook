'use client'

import dynamic from 'next/dynamic'
import LoadingPage from '../../src/components/loading/LoadingPage'

const FavoritesPage = dynamic(() => import('../../src/app-pages/FavoritesPage'), {
  ssr: false
})

const ViewSizeContextProvider = dynamic(() => import('../../src/contexts/ViewSizeContext'), {
  ssr: false
})

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
