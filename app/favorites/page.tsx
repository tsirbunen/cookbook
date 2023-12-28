'use client'

import dynamic from 'next/dynamic'

const FavoritesPage = dynamic(() => import('../../src/app-pages/FavoritesPage'), {
  ssr: false
})

export default function Favorites() {
  return <FavoritesPage />
}
