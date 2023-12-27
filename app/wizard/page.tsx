'use client'

import LoadingPage from '../../src/components/loading/LoadingPage'
import ViewSizeContextProvider from '../../src/contexts/ViewSizeContext'
import WizardPage from '../../src/pages/WizardPage'

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
