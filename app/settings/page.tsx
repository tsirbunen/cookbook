'use client'

import dynamic from 'next/dynamic'

const SettingsPage = dynamic(() => import('../../src/app-pages/SettingsPage'), {
  ssr: false
})

export default function Settings() {
  return <SettingsPage />
}
