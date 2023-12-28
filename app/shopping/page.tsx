'use client'

import dynamic from 'next/dynamic'

const ShoppingPage = dynamic(() => import('../../src/app-pages/ShoppingPage'), {
  ssr: false
})

export default function Shopping() {
  return <ShoppingPage />
}
