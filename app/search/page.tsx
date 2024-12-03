'use client'

import dynamic from 'next/dynamic'
import LoadingPage from '../../app-ui/widgets/loading-page/LoadingPage'

const SearchPage = dynamic(() => import('../../app-ui/app-pages/search/page/SearchPage'), {
  ssr: false,
  loading: () => <LoadingPage />
})

/**
 * This is a Next-required default export component for route "/recipes".
 * For this (as for other routes) the returned components' code is in the
 * src/app-pages folder.
 */
export default function Recipes() {
  return <SearchPage />
}
