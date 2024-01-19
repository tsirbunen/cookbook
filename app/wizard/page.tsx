'use client'

import dynamic from 'next/dynamic'

const WizardPage = dynamic(() => import('../../src/app-pages/wizard/WizardPage'), {
  ssr: false
})

export default function Wizard() {
  return <WizardPage />
}
