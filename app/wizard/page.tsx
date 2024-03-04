'use client'

import dynamic from 'next/dynamic'

const WizardPage = dynamic(() => import('../../src/app-pages/wizard/WizardPage'), {
  ssr: false
})

/**
 * This is a Next-required default export component for route "/wizard".
 * For this (as for other routes) the returned components' code is in the
 * src/app-pages folder.
 */
export default function Wizard() {
  return <WizardPage />
}
