import { useContext } from 'react'
import { TbCheckbox, TbTool, TbSearch } from 'react-icons/tb'
import Toggle, {
  filteringToggleProperty,
  pickedRecipesToggleProperty,
  selectModeToggleProperty
} from '../../../widgets/toggles/Toggle'
import { AppStateContext, AppStateContextType } from '../../../state/StateContextProvider'
import { RecipesViewingContext } from '../page/SearchRecipesProvider'
import { FiltersContext } from '../page/FilteringProvider'
import Toggles from '../../../widgets/toggles/Toggles'

const SearchRecipesHeaderToggles = () => {
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
    <Toggles hasBackground={true}>
      <Toggle
        isToggled={showSelectMode}
        toggle={toggleShowSelectMode}
        Icon={TbSearch}
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

export default SearchRecipesHeaderToggles
