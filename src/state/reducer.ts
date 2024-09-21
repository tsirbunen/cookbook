import { TargetSchema } from '../../app/api/graphql/graphql-server/modules/types.generated'
import { RecipesFilterValues } from '../app-pages/search/page/FilteringProvider'
import { Language, Recipe, Tag } from '../types/graphql-schema-types.generated'
import { AccountInfo, JSONSchemaType } from '../types/types'
import { AppState } from './StateContextProvider'
import { produce } from 'immer'

export enum Dispatch {
  SET_RECIPES_AND_FILTERS = 'SET_RECIPES_AND_FILTERS',
  UPDATE_PICKED_RECIPES = 'UPDATE_PICKED_RECIPES',
  CHANGE_RECIPES_ORDER = 'CHANGE_RECIPES_ORDER',
  TOGGLE_SOUNDS_ENABLED = 'TOGGLE_SOUNDS_ENABLED',
  SET_TAGS = 'SET_TAGS',
  SET_LANGUAGES = 'SET_LANGUAGES',
  SET_ACCOUNT = 'SET_ACCOUNT',
  SET_VALIDATION_SCHEMAS = 'SET_VALIDATION_SCHEMAS'
}

export type DispatchAction =
  | { type: Dispatch.SET_RECIPES_AND_FILTERS; payload: { recipes: Recipe[]; filters: RecipesFilterValues } }
  | { type: Dispatch.UPDATE_PICKED_RECIPES; payload: { recipeIds: number[] } }
  | { type: Dispatch.CHANGE_RECIPES_ORDER; payload: { newOrderOfIds: number[] } }
  | { type: Dispatch.TOGGLE_SOUNDS_ENABLED; payload: { enabled: boolean } }
  | { type: Dispatch.SET_TAGS; payload: { tags: Tag[] } }
  | { type: Dispatch.SET_LANGUAGES; payload: { languages: Language[] } }
  | { type: Dispatch.SET_ACCOUNT; payload: { account: AccountInfo | null } }
  | { type: Dispatch.SET_VALIDATION_SCHEMAS; payload: { validationSchemas: Record<TargetSchema, JSONSchemaType> } }

export const reducer = produce((draft: AppState, { type, payload }: DispatchAction) => {
  switch (type) {
    case Dispatch.SET_RECIPES_AND_FILTERS:
      draft.recipes = payload.recipes
      draft.filters = payload.filters
      break
    case Dispatch.UPDATE_PICKED_RECIPES:
      updatePickedRecipes(draft, payload)
      break
    case Dispatch.CHANGE_RECIPES_ORDER:
      updatePickedRecipesOrder(draft, payload)
      break
    case Dispatch.TOGGLE_SOUNDS_ENABLED:
      draft.settings.soundsEnabled = payload.enabled
      break
    case Dispatch.SET_TAGS:
      draft.tags = payload.tags
      break
    case Dispatch.SET_LANGUAGES:
      draft.languages = payload.languages
      break
    case Dispatch.SET_ACCOUNT:
      draft.account = payload.account
      break
    case Dispatch.SET_VALIDATION_SCHEMAS:
      draft.validationSchemas = payload.validationSchemas
      break
    default:
      throw new Error(`${JSON.stringify(type)} is not an app state reducer action type!`)
  }
})

export const updatePickedRecipes = (draft: AppState, payload: { recipeIds: number[] }) => {
  const { recipeIds } = payload
  const recipes = draft.recipes.filter((recipe) => recipeIds.includes(recipe.id))

  if (!recipes.length) return

  const recipeIdsToRemove: number[] = []
  const recipeIdsToAdd: number[] = []

  for (const { id } of recipes) {
    const shouldRemove = draft.pickedRecipeIds.includes(id)
    if (shouldRemove) recipeIdsToRemove.push(id)
    else recipeIdsToAdd.push(id)
  }

  if (recipeIdsToRemove.length) {
    draft.pickedRecipes = draft.pickedRecipes.filter((r) => !recipeIdsToRemove.includes(r.id))
    draft.pickedRecipeIds = draft.pickedRecipeIds.filter((id) => !recipeIdsToRemove.includes(id))
  }

  if (recipeIdsToAdd.length) {
    draft.pickedRecipeIds.push(...recipeIdsToAdd)
    const recipesToAdd = draft.recipes.filter((r) => recipeIdsToAdd.includes(r.id))
    draft.pickedRecipes.push(...recipesToAdd)
  }
}

// FIXME: CHANGE STATE SO THAT FINDING RECIPES IS EASIER!!!
const updatePickedRecipesOrder = (draft: AppState, payload: { newOrderOfIds: number[] }) => {
  const allRecipes = draft.recipes

  const recipesInOrder = []
  for (const id of payload.newOrderOfIds) {
    const recipe = allRecipes.find((r) => r.id === id)
    if (recipe) {
      recipesInOrder.push(recipe)
    }
  }

  draft.pickedRecipes = recipesInOrder
}
