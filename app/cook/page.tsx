'use client'

import LoadingPage from '../../src/components/loading/LoadingPage'
import ViewSizeContextProvider from '../../src/contexts/ViewSizeContext'
import CookPage from '../../src/pages/CookPage'

export default function Cook() {
  if (typeof window === undefined) {
    return <LoadingPage />
  }

  return (
    <ViewSizeContextProvider>
      <CookPage />
    </ViewSizeContextProvider>
  )
}
