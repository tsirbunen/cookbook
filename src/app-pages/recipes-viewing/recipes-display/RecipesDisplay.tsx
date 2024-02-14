/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from '@emotion/react'
import PhotoCardRecipe from './PhotoCardRecipe'
import SummaryRecipe from './SummaryRecipe'
import TitleRecipe from './TitleRecipe'
import { ViewRecipesMode } from '../viewing-management/ViewModeManagementTool'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { noCategoryTitle } from '../../../constants/constants'

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
}

const RecipesDisplay = (props: RecipesDisplayProps) => {
  const { recipes, mode, onPickRecipeChanged, isMobile, showBackground, pickedRecipeIds } = props
  const RecipeElement = recipesElementsByMode[mode]
  const recipesCss = cssByMode[mode]

  return (
    <div css={recipesCss(isMobile)}>
      {recipes.map((recipe) => {
        const recipeId = recipe.id
        const category = recipe.category ?? noCategoryTitle
        const isPicked = pickedRecipeIds.includes(recipe.id)

        return (
          <RecipeElement
            key={`title-${recipeId}`}
            recipe={recipe}
            onPickRecipeChanged={() => onPickRecipeChanged(recipeId, category ?? noCategoryTitle)}
            isPicked={isPicked}
            showBackground={showBackground}
          />
        )
      })}
    </div>
  )
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
`

const cssByMode: Record<ViewRecipesMode, (isMobile: boolean) => SerializedStyles> = {
  [ViewRecipesMode.PHOTOS]: photosContainerCss,
  [ViewRecipesMode.SUMMARIES]: summariesContainerCss,
  [ViewRecipesMode.TITLES]: titlesContainerCss
}
