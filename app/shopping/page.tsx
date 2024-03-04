'use client'

import dynamic from 'next/dynamic'

const ShoppingPage = dynamic(() => import('../../src/app-pages/shopping/ShoppingPage'), {
  ssr: false
})

/**
 * This is a Next-required default export component for route "/shopping".
 * For this (as for other routes) the returned components' code is in the
 * src/app-pages folder.
 */
export default function Shopping() {
  return <ShoppingPage />
}
