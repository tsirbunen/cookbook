'use client'

import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import('../../src/app-pages/home/HomePage'), {
  ssr: false
})

/**
 * This is a Next-required default export component for route "/".
 * For this (as for other routes) the returned components' code is in the
 * src/app-pages folder.
 */
export default function Recipes() {
  return <HomePage />
}
