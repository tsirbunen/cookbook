import { type ChakraProps, Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import React from 'react'
import { HEADER_HEIGHT } from '../../../constants/layout'
import { AppStateContext, type AppStateContextType } from '../../../state/StateContextProvider'
import { Dispatch } from '../../../state/reducer'
import type { Recipe } from '../../../types/graphql-schema-types.generated'
import ScrollToTopButton from '../../../widgets/scroll-to-top-button/ScrollToTopButton'
import ScrollToTopTargetAnchor from '../../../widgets/scroll-to-top-button/ScrollToTopTargetAnchor'
import { RecipesViewingContext } from '../search-management/SearchRecipesProvider'
import RecipeWidgets from './RecipeWidgets'

export const recipesContentDataTestId = 'recipes-content'
const SCROLL_TO_TARGET_ANCHOR_ID = 'content-top'

export type RecipesViewElementProps = {
  recipes: Recipe[]
  onPickRecipeChanged: (recipeId: number) => void
  pickedRecipeIds: Record<string, number[]>
}

const RecipesContent = () => {
  const { showRecipes, mode, favoriteRecipeIds } = useContext(RecipesViewingContext)
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType

  const onPickRecipeChanged = (recipeId: number) => {
    dispatch({ type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeIds: [recipeId] } })
  }

  const onRecipesOrderChanged = (newOrderOfIds: number[]) => {
    dispatch({ type: Dispatch.CHANGE_RECIPES_ORDER, payload: { newOrderOfIds } })
  }

  if (!showRecipes) {
    return null
  }

  return (
    <Flex {...outerCss} data-testid={recipesContentDataTestId}>
      <ScrollToTopTargetAnchor targetAnchorId={SCROLL_TO_TARGET_ANCHOR_ID} />

      <RecipeWidgets
        recipes={state.recipes}
        onPickRecipeChanged={onPickRecipeChanged}
        mode={mode}
        showBackground={true}
        pickedRecipeIds={state.pickedRecipeIds}
        canDragAndDrop={false}
        onChangedRecipeOrder={onRecipesOrderChanged}
        favoriteRecipeIds={favoriteRecipeIds}
      />

      <ScrollToTopButton targetAnchorId={SCROLL_TO_TARGET_ANCHOR_ID} />
    </Flex>
  )
}

export default RecipesContent

const outerCss = {
  display: 'flex' as ChakraProps['display'],
  flexDirection: 'column' as ChakraProps['flexDirection'],
  justifyContent: 'start',
  alignItems: 'start',
  width: '100%'
}
