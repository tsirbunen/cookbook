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
  onChangedRecipeOrder?: (recipesInOrder: Recipe[]) => void
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
  const [target, setTarget] = useState<{ direction?: 'up' | 'down'; index?: number }>({})
  const RecipeElement = recipesElementsByMode[mode]
  const recipesCss = cssByMode[mode]

  useEffect(() => {
    setRecipesInOrder(recipes)
  }, [recipes])

  const onTargetChanged = (direction?: 'up' | 'down', index?: number) => {
    setTarget({ direction, index })
  }

  const confirmNewPosition = (recipeId: number) => {
    let recipeToMove = recipesInOrder.find((r) => r.id === recipeId)
    if (!target.direction || target.index === undefined || !recipeToMove) return
    const newIndex = target.direction === 'up' ? target.index + 1 : target.index

    const updatedRecipesInOrder: Recipe[] = []
    let index = 0
    recipesInOrder.forEach((loopRecipe) => {
      if (index === newIndex && recipeToMove) {
        updatedRecipesInOrder.push(recipeToMove)
        recipeToMove = undefined
        index += 1
      }

      if (loopRecipe.id !== recipeId) {
        updatedRecipesInOrder.push(loopRecipe)
        index += 1
      }
    })

    if (recipeToMove) updatedRecipesInOrder.push(recipeToMove)

    setRecipesInOrder(updatedRecipesInOrder.filter(Boolean))
    setTarget({})
    onChangedRecipeOrder && onChangedRecipeOrder(updatedRecipesInOrder)
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
              key={`title-${recipeId}`}
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

  const content: JSX.Element[] = []
  recipesInOrder.forEach((recipe, index) => {
    const recipeId = recipe.id
    const category = recipe.category ?? noCategoryTitle
    const isPicked = pickedRecipeIds.includes(recipe.id)

    if (canDragAndDrop && index === 0) {
      content.push(<div key={`separator-${recipeId}-before-all`} css={separatorCss(target.index === -1)} />)
    }

    content.push(
      <RecipeElement
        key={`title-${recipeId}`}
        recipe={recipe}
        index={index}
        onPickRecipeChanged={() => onPickRecipeChanged(recipeId, category ?? noCategoryTitle)}
        isPicked={isPicked}
        showBackground={showBackground}
        confirmNewPosition={confirmNewPosition}
        onTargetChanged={onTargetChanged}
      />
    )

    if (canDragAndDrop && index < recipes.length) {
      content.push(<div key={`separator-${recipeId}-${index}`} css={separatorCss(index === target.index)} />)
    }
  })

  return <div css={recipesCss(isMobile)}>{content}</div>
}

export default RecipesDisplay

const separatorCss = (isVisible: boolean) => css`
  width: 100%;
  height: ${isVisible ? 40 : 0}px;
  background-color: ${isVisible ? ColorCodes.MEDIUM : 'transparent'};
  border-radius: 6px;
`

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
`

const cssByMode: Record<ViewRecipesMode, (isMobile: boolean) => SerializedStyles> = {
  [ViewRecipesMode.PHOTOS]: photosContainerCss,
  [ViewRecipesMode.SUMMARIES]: summariesContainerCss,
  [ViewRecipesMode.TITLES]: titlesContainerCss
}
