'use client'

import dynamic from 'next/dynamic'
import LoadingPage from '../../src/components/loading/LoadingPage'

const ShoppingPage = dynamic(() => import('../../src/app-pages/ShoppingPage'), {
  ssr: false
})

const ViewSizeContextProvider = dynamic(() => import('../../src/contexts/ViewSizeContext'), {
  ssr: false
})

export default function Shopping() {
  if (typeof window === undefined) {
    return <LoadingPage />
  }

  return (
    <ViewSizeContextProvider>
      <ShoppingPage />
    </ViewSizeContextProvider>
  )
}
