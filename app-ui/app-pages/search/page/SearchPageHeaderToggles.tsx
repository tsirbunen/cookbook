import { useContext } from 'react'
import { TbCheckbox, TbFilter, TbListDetails } from 'react-icons/tb'
import { AppStateContext, type AppStateContextType } from '../../../state/StateContextProvider'
import { ButtonVariant } from '../../../theme/buttons/buttons-theme'
import Toggle, {
  filteringToggleProperty,
  pickedRecipesToggleProperty,
  selectModeToggleProperty
} from '../../../widgets/toggles/Toggle'
import Toggles from '../../../widgets/toggles/Toggles'
import { SearchFiltersContext } from '../state/SearchFilterProvider'
import { SearchToolsContext } from '../state/SearchToolsProvider'

const SearchPageHeaderToggles = () => {
  const { state } = useContext(AppStateContext) as AppStateContextType
  const { appliedFiltersCount } = useContext(SearchFiltersContext)
  const {
    toggleHideRecipes,
    showSelectMode,
    toggleShowSelectMode,
    showPickedRecipes,
    showFiltering,
    toggleShowPickedRecipes,
    toggleShowFiltering
  } = useContext(SearchToolsContext)

  const pickedRecipesCount = state.pickedRecipeIds.length
  const toggleVariant = ButtonVariant.HeaderToggle

  return (
    <Toggles hasBackground={false}>
      <Toggle
        isToggled={showSelectMode}
        toggle={toggleShowSelectMode}
        Icon={TbListDetails}
        toggleProperty={selectModeToggleProperty}
        variant={toggleVariant}
      />

      <Toggle
        isToggled={showPickedRecipes}
        toggle={toggleShowPickedRecipes}
        Icon={TbCheckbox}
        count={pickedRecipesCount}
        toggleProperty={pickedRecipesToggleProperty}
        variant={toggleVariant}
      />

      <Toggle
        isToggled={showFiltering}
        toggle={() => {
          toggleHideRecipes()
          toggleShowFiltering()
        }}
        Icon={TbFilter}
        count={appliedFiltersCount}
        toggleProperty={filteringToggleProperty}
        variant={toggleVariant}
      />
    </Toggles>
  )
}

export default SearchPageHeaderToggles
