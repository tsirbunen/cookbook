'use client'

import dynamic from 'next/dynamic'
import LoadingPage from '../../src/components/loading/LoadingPage'

const WizardPage = dynamic(() => import('../../src/app-pages/WizardPage'), {
  ssr: false
})

const ViewSizeContextProvider = dynamic(() => import('../../src/contexts/ViewSizeContext'), {
  ssr: false
})

export default function Wizard() {
  if (typeof window === undefined) {
    return <LoadingPage />
  }

  return (
    <ViewSizeContextProvider>
      <WizardPage />
    </ViewSizeContextProvider>
  )
}
