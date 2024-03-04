import { createContext, useContext, useState } from 'react'
import { AppState, AppStateContext, AppStateContextType } from '../../../state/StateContextProvider'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { RecipeCategory } from '../../../types/types'
import { getPickedRecipes } from '../../../utils/recipe-utils'

type Cooking = {
  pickedRecipes: Recipe[]
  leftRecipeIndex: number | null
  middleRecipeIndex: number | null
  rightRecipeIndex: number | null
  changeNumberOfRecipesToDisplay: (newNumberOfRecipes: number) => void
  displayCount: number
  pickedRecipesCount: number
}

export const CookingContext = createContext<Cooking>({} as Cooking)

const CookingProvider = ({ children }: { children: React.ReactNode }) => {
  const { state } = useContext(AppStateContext) as AppStateContextType
  const [pickedRecipes] = useState<Recipe[]>(getPickedRecipes(state))
  const [leftRecipeIndex, setLeftRecipeIndex] = useState<number | null>(pickedRecipes.length > 0 ? 0 : null)
  const [middleRecipeIndex, setMiddleRecipeIndex] = useState<number | null>(pickedRecipes.length > 1 ? 1 : null)
  const [rightRecipeIndex, setRightRecipeIndex] = useState<number | null>(pickedRecipes.length > 2 ? 2 : null)
  const [displayCount, setDisplayCount] = useState(1)
  // console.log('cookingRecipes', pickedRecipes)

  const changeNumberOfRecipesToDisplay = (newNumberOfRecipes: number) => {
    console.log('changeNumberOfRecipesToDisplay', newNumberOfRecipes)
    const newValueIsAllowed = pickedRecipes.length >= newNumberOfRecipes && newNumberOfRecipes >= 1
    if (!newValueIsAllowed) return

    setDisplayCount(newNumberOfRecipes)
    // Tähän se, että miten update se, mitä reseptejä näytetään, jos lukumäärä muuttuu!
  }

  // Se, että jos haluaa muuttaa reseptien järjestystä
  // Olisiko siihen avautuva panel, jossa voi drag and dropata reseptejä?

  const pickedRecipesCount = pickedRecipes.length

  return (
    <CookingContext.Provider
      value={{
        pickedRecipes,
        leftRecipeIndex,
        middleRecipeIndex,
        rightRecipeIndex,
        changeNumberOfRecipesToDisplay,
        displayCount,
        pickedRecipesCount
      }}
    >
      {children}
    </CookingContext.Provider>
  )
}

export default CookingProvider
