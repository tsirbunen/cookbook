/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from '@emotion/react'
import PhotoCardRecipe from './PhotoCardRecipe'
import SummaryRecipe from './SummaryRecipe'
import TitleRecipe from './TitleRecipe'
import { ViewRecipesMode } from '../viewing-management/ViewModeManagementTool'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { noCategoryTitle } from '../../../constants/constants'
import { useEffect, useState } from 'react'
import { ColorCodes } from '../../../theme/theme'
import DraggableItemsList from '../../../widgets/draggable-items-list/DraggableItemsList'

const recipesElementsByMode = {
  PHOTOS: PhotoCardRecipe,
  SUMMARIES: SummaryRecipe,
  TITLES: TitleRecipe
}

export type RecipesDisplayProps = {
  recipes: Recipe[]
  onPickRecipeChanged: (recipeId: number, category: string) => void
  mode: ViewRecipesMode
  showBackground: boolean
  isMobile: boolean
  pickedRecipeIds: number[]
  canDragAndDrop: boolean
  onChangedRecipeOrder?: (newOrderOfIds: number[]) => void
}

const RecipesDisplay = (props: RecipesDisplayProps) => {
  const {
    recipes,
    mode,
    onPickRecipeChanged,
    isMobile,
    showBackground,
    pickedRecipeIds,
    canDragAndDrop,
    onChangedRecipeOrder
  } = props
  const [recipesInOrder, setRecipesInOrder] = useState(recipes)
  const RecipeElement = recipesElementsByMode[mode]
  const recipesCss = cssByMode[mode]

  useEffect(() => {
    setRecipesInOrder(recipes)
  }, [recipes])

  const onConfirmNewOrder = (newOrderOfKeys: string[]) => {
    const recipeIds = newOrderOfKeys.map(getRecipeIdFromKey)
    onChangedRecipeOrder && onChangedRecipeOrder(recipeIds)
  }

  const createElementKey = (index: number, recipeId: number) => {
    return `title-${index}-${recipeId}`
  }

  const getRecipeIdFromKey = (key: string) => {
    const parts = key.split('-')
    return parseInt(parts[parts.length - 1])
  }

  if (!canDragAndDrop) {
    return (
      <div css={recipesCss(isMobile)}>
        {recipes.map((recipe, index) => {
          const recipeId = recipe.id
          const category = recipe.category ?? noCategoryTitle
          const isPicked = pickedRecipeIds.includes(recipe.id)

          return (
            <RecipeElement
              key={createElementKey(index, recipeId)}
              recipe={recipe}
              index={index}
              onPickRecipeChanged={() => onPickRecipeChanged(recipeId, category ?? noCategoryTitle)}
              isPicked={isPicked}
              showBackground={showBackground}
            />
          )
        })}
      </div>
    )
  }

  const listItemHeight = 40

  const content = (
    <DraggableItemsList
      onConfirmNewOrder={onConfirmNewOrder}
      items={recipesInOrder.map((recipe, index) => {
        const recipeId = recipe.id
        const category = recipe.category ?? noCategoryTitle
        const isPicked = pickedRecipeIds.includes(recipe.id)

        return (
          <RecipeElement
            key={`title-${recipeId}`}
            recipe={recipe}
            index={index}
            onPickRecipeChanged={() => onPickRecipeChanged(recipeId, category ?? noCategoryTitle)}
            isPicked={isPicked}
            showBackground={showBackground}
          />
        )
      })}
      itemHeight={listItemHeight}
      onMoveBgColor={ColorCodes.MEDIUM}
      handColor={ColorCodes.VERY_DARK}
    />
  )

  return <div css={recipesCss(isMobile)}>{content}</div>
}

export default RecipesDisplay

const photosContainerCss = (_: boolean) => css`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  width: 100%;
`

const summariesContainerCss = (isMobile: boolean) => css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  padding-left: ${!isMobile ? 5 : 0}px;
`
const titlesContainerCss = (isMobile: boolean) => css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding-left: ${!isMobile ? 5 : 0}px;
  width: 100%;
`

const cssByMode: Record<ViewRecipesMode, (isMobile: boolean) => SerializedStyles> = {
  [ViewRecipesMode.PHOTOS]: photosContainerCss,
  [ViewRecipesMode.SUMMARIES]: summariesContainerCss,
  [ViewRecipesMode.TITLES]: titlesContainerCss
}
