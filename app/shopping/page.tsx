'use client'

import dynamic from 'next/dynamic'
import LoadingPage from '../../app-ui/widgets/loading-page/LoadingPage'

const ShoppingPage = dynamic(() => import('../../app-ui/app-pages/shopping/ShoppingPage'), {
  ssr: false,
  loading: () => <LoadingPage />
})

/**
 * This is a Next-required default export component for route "/shopping".
 * For this (as for other routes) the returned components' code is in the
 * src/app-pages folder.
 */
export default function Shopping() {
  return <ShoppingPage />
}
