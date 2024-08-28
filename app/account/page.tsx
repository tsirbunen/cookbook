'use client'

import dynamic from 'next/dynamic'

const AccountPage = dynamic(() => import('../../src/app-pages/account/AccountPage'), {
  ssr: false
})

/**
 * This is a Next-required default export component for route "/account".
 * For this (as for other routes) the returned components' code is in the
 * src/app-pages folder.
 */
export default function Account() {
  return <AccountPage />
}
