import { type ChakraProps, Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import React from 'react'
import { HEADER_HEIGHT } from '../../../constants/layout'
import { AppStateContext, type AppStateContextType } from '../../../state/StateContextProvider'
import { Dispatch } from '../../../state/reducer'
import type { Recipe } from '../../../types/graphql-schema-types.generated'
import ScrollToTopButton from '../../../widgets/scroll-to-top-button/ScrollToTopButton'
import RecipeWidgets from '../recipe-widgets/RecipeWidgets'
import { RecipesViewingContext } from './SearchRecipesProvider'

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
      <div style={{ zIndex: 1000, position: 'relative', top: `-${HEADER_HEIGHT}px` }}>
        {/* biome-ignore lint/a11y/useAnchorContent: We do not want to show any text content */}
        <a id={SCROLL_TO_TARGET_ANCHOR_ID} href="#content-top" aria-label="Scroll to top" />
      </div>

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
