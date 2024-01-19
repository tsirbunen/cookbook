/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import RecipeTitle from './RecipeTitle'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { noCategory } from '../../../recipes-service/useRecipeApi'

type RecipesTitlesViewProps = {
  recipes: Recipe[]
  onPickRecipeChanged: (recipeId: number, category: string) => void
  pickedRecipeIdsByCategory: Record<string, number[]>
}

const RecipesTitlesView = ({ recipes, onPickRecipeChanged, pickedRecipeIdsByCategory }: RecipesTitlesViewProps) => {
  return (
    <div css={container}>
      {recipes.map((recipe) => {
        const category = recipe.category ?? noCategory
        const recipesPickedInCategory = pickedRecipeIdsByCategory[category] ?? []
        const isPicked = recipesPickedInCategory.includes(recipe.id)

        return (
          <RecipeTitle
            key={`title-${recipe.id}`}
            id={recipe.id}
            title={recipe.title}
            category={recipe.category ?? noCategory}
            onPickRecipeChanged={() => onPickRecipeChanged(recipe.id, recipe.category ?? noCategory)}
            isPicked={isPicked}
          />
        )
      })}
    </div>
  )
}

export default RecipesTitlesView

const container = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`
