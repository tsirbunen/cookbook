'use client'

import dynamic from 'next/dynamic'
import LoadingPage from '../../src/widgets/loading-page/LoadingPage'

const SettingsPage = dynamic(() => import('../../src/app-pages/settings/SettingsPage'), {
  ssr: false,
  loading: () => <LoadingPage />
})

/**
 * This is a Next-required default export component for route "/settings".
 * For this (as for other routes) the returned components' code is in the
 * src/app-pages folder.
 */
export default function Settings() {
  return <SettingsPage />
}
