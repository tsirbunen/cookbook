import { useContext } from 'react'
import { TbCheckbox, TbTool, TbListDetails } from 'react-icons/tb'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import Toggle, {
  filteringToggleProperty,
  pickedRecipesToggleProperty,
  selectModeToggleProperty
} from '../../../widgets/header-with-optional-toggles/Toggle'
import { AppStateContext, AppStateContextType } from '../../../state/StateContextProvider'
import { RecipesViewingContext } from '../page/RecipesViewingProvider'
import { FiltersContext } from '../page/FilteringProvider'
import Toggles from '../../../widgets/header-with-optional-toggles/Toggles'

const RecipesViewingHeaderToggles = () => {
  const { state } = useContext(AppStateContext) as AppStateContextType

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

  const pickedRecipeIdsByCategory = state.pickedRecipeIdsByCategory
  const pickedRecipesCount = Object.values(pickedRecipeIdsByCategory).flat().length

  return (
    <Toggles>
      <Toggle
        isToggled={showSelectMode}
        toggle={toggleShowSelectMode}
        Icon={TbListDetails}
        toggleProperty={selectModeToggleProperty}
      />

      <Toggle
        isToggled={showPickedRecipes}
        toggle={toggleShowPickedRecipes}
        Icon={TbCheckbox}
        count={pickedRecipesCount}
        toggleProperty={pickedRecipesToggleProperty}
      />

      <Toggle
        isToggled={showFiltering}
        toggle={() => {
          toggleHideRecipes()
          toggleShowFiltering()
        }}
        Icon={TbTool}
        count={appliedFiltersCount}
        toggleProperty={filteringToggleProperty}
      />
    </Toggles>
  )
}

export default RecipesViewingHeaderToggles
