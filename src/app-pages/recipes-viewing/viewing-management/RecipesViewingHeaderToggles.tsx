import { useRouter } from 'next/navigation'
import { useContext } from 'react'

import { TbCheckbox, TbChefHat, TbTool, TbListDetails } from 'react-icons/tb'
import { ViewSizeContext } from '../../../app-layout/ViewSizeProvider'
import Toggle from '../../../widgets/header-with-optional-toggles/Toggle'
import { pagePaths, Page } from '../../../navigation/router/router'
import { AppStateContext, AppStateContextType } from '../../../state/StateContextProvider'
import { RecipesViewingContext } from '../page/RecipesViewingProvider'
import { FiltersContext } from '../page/FilteringProvider'
import Toggles from '../../../widgets/header-with-optional-toggles/Toggles'

const RecipesViewingHeaderToggles = () => {
  const { state } = useContext(AppStateContext) as AppStateContextType
  const { isMobile } = useContext(ViewSizeContext)
  const { appliedFiltersCount } = useContext(FiltersContext)
  const {
    toggleHideRecipes,
    showSelectMode,
    toggleShowSelectMode,
    showPickedRecipes,
    showFiltering,
    toggleShowPickedRecipes,
    toggleShowFiltering
  } = useContext(RecipesViewingContext)
  const router = useRouter()
  const startCooking = () => router.push(pagePaths[Page.COOK])

  const pickedRecipeIdsByCategory = state.pickedRecipeIdsByCategory
  const pickedRecipesCount = Object.values(pickedRecipeIdsByCategory).flat().length

  return (
    <Toggles isMobile={isMobile}>
      <Toggle isToggled={showSelectMode} toggle={toggleShowSelectMode} Icon={TbListDetails} />

      <Toggle
        isToggled={showPickedRecipes}
        toggle={toggleShowPickedRecipes}
        Icon={TbCheckbox}
        count={pickedRecipesCount}
      />

      <Toggle
        isToggled={showFiltering}
        toggle={() => {
          toggleHideRecipes()
          toggleShowFiltering()
        }}
        Icon={TbTool}
        count={appliedFiltersCount}
      />

      <Toggle
        isToggled={pickedRecipesCount > 0}
        toggle={startCooking}
        Icon={TbChefHat}
        isDisabled={pickedRecipesCount === 0}
        count={null}
      />
    </Toggles>
  )
}

export default RecipesViewingHeaderToggles
