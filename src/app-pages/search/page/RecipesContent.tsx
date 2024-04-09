import { useContext } from 'react'
import React from 'react'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import ScrollToTopButton from '../../../widgets/scroll-to-top-button/ScrollToTopButton'
import { AppStateContext, AppStateContextType } from '../../../state/StateContextProvider'
import { Dispatch } from '../../../state/reducer'
import { RecipesViewingContext } from './SearchRecipesProvider'
import { HEADER_HEIGHT_WITH_TOOLS } from '../../../constants/layout'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import RecipesDisplay from '../recipes-display/RecipesDisplay'
import { DARK_COLOR } from '../../../constants/color-codes'
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, ChakraProps, Flex } from '@chakra-ui/react'
import AccordionWithTheme from '../../../theme/accordion/AccordionWithTheme'
import { NO_CATEGORY_TITLE } from '../../../constants/text-content'

export const recipesContentDataTestId = 'recipes-content'
const SCROLL_TO_TARGET_ANCHOR_ID = 'content-top'

export type RecipesViewElementProps = {
  recipes: Recipe[]
  onPickRecipeChanged: (recipeId: number, category: string) => void
  pickedRecipeIdsByCategory: Record<string, number[]>
}

const RecipesContent = () => {
  const { showRecipes, mode, favoriteRecipeIds } = useContext(RecipesViewingContext)
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType

  const onPickRecipeChanged = (recipeId: number, category: string) => {
    dispatch({ type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeId, category } })
  }

  const onRecipesOrderChanged = (newOrderOfIds: number[]) => {
    dispatch({ type: Dispatch.CHANGE_RECIPES_ORDER, payload: { newOrderOfIds } })
  }

  if (!showRecipes) {
    return null
  }

  const recipesInCategories = state.recipes

  return (
    <Flex {...outerCss} data-testid={recipesContentDataTestId}>
      <div style={{ zIndex: 1000, position: 'relative', top: `-${HEADER_HEIGHT_WITH_TOOLS}px` }}>
        <a id={SCROLL_TO_TARGET_ANCHOR_ID}></a>
      </div>
      {recipesInCategories.map((recipeCategory) => {
        const title = recipeCategory.category.toUpperCase()
        const category = recipeCategory.category ?? NO_CATEGORY_TITLE
        const pickedRecipeIds = state.pickedRecipeIdsByCategory[category] ?? []

        return (
          <AccordionWithTheme key={`recipe-category-${title}`}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Flex>
                      <Title title={title} variant={TitleVariant.MediumLeft} color={DARK_COLOR} />
                    </Flex>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              <AccordionPanel>
                <RecipesDisplay
                  recipes={recipeCategory.recipes}
                  onPickRecipeChanged={onPickRecipeChanged}
                  mode={mode}
                  showBackground={true}
                  pickedRecipeIds={pickedRecipeIds}
                  canDragAndDrop={false}
                  onChangedRecipeOrder={onRecipesOrderChanged}
                  favoriteRecipeIds={favoriteRecipeIds}
                />
              </AccordionPanel>
            </AccordionItem>
          </AccordionWithTheme>
        )
      })}
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
