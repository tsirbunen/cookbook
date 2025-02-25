'use client'

import dynamic from 'next/dynamic'
import LoadingPage from '../../app-ui/widgets/loading-page/LoadingPage'

const WizardPage = dynamic(() => import('../../app-ui/app-pages/wizard/page/WizardPage'), {
  ssr: false,
  loading: () => <LoadingPage />
})

/**
 * This is a Next-required default export component for route "/wizard".
 * For this (as for other routes) the returned components' code is in the
 * src/app-pages folder.
 */
export default function Wizard() {
  return <WizardPage />
}
