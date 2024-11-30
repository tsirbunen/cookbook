'use client'

import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'
import { AppStateContext, type AppStateContextType } from '../../../src/state/StateContextProvider'
import { Dispatch } from '../../../src/state/reducer'

const CookPage = dynamic(() => import('../../../src/app-pages/cook/page/CookPage'), {
  ssr: false
})

/**
 * This is a Next-required default export component for route "/cook".
 * It accepts optional recipe ids as a dot-separated list (as in .../cook/1.2.3).
 * For this (as for other routes) the returned components' code is in the
 * src/app-pages folder.
 */
export default function Cook({ params }: { params: { recipeIds: string } }) {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const recipeIds = params ? getRecipeIdsFromRouteParams(params) : undefined

  useEffect(() => {
    if (!recipeIds || state.pickedRecipeIds.length) return
    const unpickedRecipeIds = getUnpickedRecipes(state.pickedRecipeIds, recipeIds)
    if (!unpickedRecipeIds.length) return
    dispatch({ type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeIds: unpickedRecipeIds } })
  }, [recipeIds, state.pickedRecipeIds, dispatch])

  return <CookPage />
}

const getRecipeIdsFromRouteParams = ({ recipeIds }: { recipeIds: string }): number[] | undefined => {
  const ids = recipeIds
    .split('.')
    .map((id) => Number.parseInt(id))
    .filter(Boolean)
  return ids
}

const getUnpickedRecipes = (pickedRecipeIds: number[], recipeIds: number[]) => {
  if (!pickedRecipeIds?.length) return recipeIds
  return recipeIds.filter((id) => !pickedRecipeIds.includes(id))
}
