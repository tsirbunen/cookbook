'use client'

import dynamic from 'next/dynamic'
import LoadingPage from '../../src/components/loading/LoadingPage'

const CookPage = dynamic(() => import('../../src/app-pages/CookPage'), {
  ssr: false
})

const ViewSizeContextProvider = dynamic(() => import('../../src/contexts/ViewSizeContext'), {
  ssr: false
})

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
