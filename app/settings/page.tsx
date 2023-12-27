'use client'

import LoadingPage from '../../src/components/loading/LoadingPage'
import ViewSizeContextProvider from '../../src/contexts/ViewSizeContext'
import SettingsPage from '../../src/pages/SettingsPage'

export default function Settings() {
  if (typeof window === undefined) {
    return <LoadingPage />
  }

  return (
    <ViewSizeContextProvider>
      <SettingsPage />
    </ViewSizeContextProvider>
  )
}
