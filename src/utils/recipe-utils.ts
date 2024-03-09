import { AppState } from '../state/StateContextProvider'
import { Recipe } from '../types/graphql-schema-types.generated'
import { RecipeCategory } from '../types/types'

// export const getPickedRecipes = (state: AppState) => {
//   const { recipes, pickedRecipeIdsByCategory } = state
//   console.log(pickedRecipeIdsByCategory)

//   return recipes
//     .map((recipeCategory: RecipeCategory) => {
//       if (pickedRecipeIdsByCategory[recipeCategory.category]) {
//         const pickedIdsInCategory = pickedRecipeIdsByCategory[recipeCategory.category]
//         return recipeCategory.recipes.filter((r) => pickedIdsInCategory.includes(r.id))
//       }
//     })
//     .flat()
//     .filter(Boolean) as Recipe[]
// }
export default {}
