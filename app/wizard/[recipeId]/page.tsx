'use client'

import dynamic from 'next/dynamic'

const WizardPage = dynamic(() => import('../../../src/app-pages/wizard/page/WizardPage'), {
  ssr: false
})

export default function ModifyRecipe({ params }: { params: { recipeId: number } }) {
  return <WizardPage recipeId={params.recipeId} />
}
