'use client'

import dynamic from 'next/dynamic'

const FavoritesPage = dynamic(() => import('../../src/app-pages/favorites/FavoritesPage'), {
  ssr: false
})

/**
 * This is a Next-required default export component for route "/favorites".
 * For this (as for other routes) the returned components' code is in the
 * src/app-pages folder.
 */
export default function Favorites() {
  return <FavoritesPage />
}
