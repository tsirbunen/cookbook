'use client'

import dynamic from 'next/dynamic'

const CookPage = dynamic(() => import('../../src/app-pages/cook/page/CookPage'), {
  ssr: false
})

/**
 * This is a Next-required default export component for route "/cook".
 * For this (as for other routes) the returned components' code is in the
 * src/app-pages folder.
 */
export default function Cook() {
  return <CookPage />
}
