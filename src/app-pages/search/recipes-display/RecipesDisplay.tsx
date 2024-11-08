/** @jsxImportSource @emotion/react */
import { type SerializedStyles, css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { Shades } from '../../../constants/shades'
import type { Recipe } from '../../../types/graphql-schema-types.generated'
import DraggableItemsList from '../../../widgets/draggable-items-list/DraggableItemsList'
import { ViewRecipesMode } from '../search-management/ViewModeManagementTool'
import PhotoCardRecipe from './PhotoCardRecipe'
import SummaryRecipe from './SummaryRecipe'
import TitleRecipe from './TitleRecipe'

const recipesElementsByMode = {
  PHOTOS: PhotoCardRecipe,
  SUMMARIES: SummaryRecipe,
  TITLES: TitleRecipe
}

export type RecipesDisplayProps = {
  recipes: Recipe[]
  onPickRecipeChanged: (recipeId: number) => void
  mode: ViewRecipesMode
  showBackground: boolean
  favoriteRecipeIds: number[]
  pickedRecipeIds: number[]
  canDragAndDrop: boolean
  onChangedRecipeOrder?: (newOrderOfIds: number[]) => void
}

const RecipesDisplay = (props: RecipesDisplayProps) => {
  const {
    recipes,
    mode,
    onPickRecipeChanged,
    showBackground,
    favoriteRecipeIds,
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
    onChangedRecipeOrder?.(recipeIds)
  }

  const createElementKey = (index: number, recipeId: number) => {
    return `title-${index}-${recipeId}`
  }

  const getRecipeIdFromKey = (key: string) => {
    const parts = key.split('-')
    return Number.parseInt(parts[parts.length - 1])
  }

  if (!canDragAndDrop) {
    return (
      <div css={recipesCss}>
        {recipes.map((recipe, index) => {
          const recipeId = recipe.id
          const isPicked = pickedRecipeIds.includes(recipe.id)

          return (
            <RecipeElement
              key={createElementKey(index, recipeId)}
              recipe={recipe}
              index={index}
              onPickRecipeChanged={() => onPickRecipeChanged(recipeId)}
              isPicked={isPicked}
              showBackground={showBackground}
              isFavorite={favoriteRecipeIds.includes(recipeId)}
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
        const isPicked = pickedRecipeIds.includes(recipe.id)

        return (
          <RecipeElement
            key={`title-${recipeId}`}
            recipe={recipe}
            index={index}
            onPickRecipeChanged={() => onPickRecipeChanged(recipeId)}
            isPicked={isPicked}
            showBackground={showBackground}
          />
        )
      })}
      itemHeight={listItemHeight}
      onMoveBgColor={Shades.MEDIUM}
      handColor={Shades.VERY_DARK}
    />
  )

  return <div css={recipesCss}>{content}</div>
}

export default RecipesDisplay

const commonCss = css`
  display: flex;
  width: 100%;
  justify-content: start;
  padding-right: 15px;
`

const photosContainerCss = css`
  ${commonCss}
  margin-left: 12px;
  flex-wrap: wrap;
  margin-top: 10px;
`

const summariesContainerCss = css`
  ${commonCss}
  margin-left: 5px;
  flex-direction: column;
  padding-left: 10px;
`
const titlesContainerCss = css`
  ${commonCss}
  flex: 1;
  flex-direction: column;
  align-items: start;
  margin-left: 8px;
  margin-top: 10px;
`

const cssByMode: Record<ViewRecipesMode, SerializedStyles> = {
  [ViewRecipesMode.PHOTOS]: photosContainerCss,
  [ViewRecipesMode.SUMMARIES]: summariesContainerCss,
  [ViewRecipesMode.TITLES]: titlesContainerCss
}
