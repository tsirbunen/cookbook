'use client'

import LoadingPage from '../../src/components/loading/LoadingPage'
import ViewSizeContextProvider from '../../src/contexts/ViewSizeContext'
import ShoppingPage from '../../src/pages/ShoppingPage'

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
