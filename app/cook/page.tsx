'use client'

import dynamic from 'next/dynamic'

const CookPage = dynamic(() => import('../../src/app-pages/cook/CookPage'), {
  ssr: false
})

export default function Cook() {
  return <CookPage />
}
