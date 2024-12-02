import { useContext } from 'react'
import { TbCheckbox, TbFilter, TbListDetails } from 'react-icons/tb'
import Toggle, {
  filteringToggleProperty,
  pickedRecipesToggleProperty,
  selectModeToggleProperty
} from '../../../widgets/toggles/Toggle'

import { AppStateContext, type AppStateContextType } from '../../../state/StateContextProvider'
import { ButtonVariant } from '../../../theme/buttons/buttons-theme'
import Toggles from '../../../widgets/toggles/Toggles'
import { FiltersContext } from './FilteringProvider'
import { RecipesViewingContext } from './SearchRecipesProvider'

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
  const { clearFilters } = useContext(FiltersContext)

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
          clearFilters()
        }}
        Icon={TbFilter}
        count={appliedFiltersCount}
        toggleProperty={filteringToggleProperty}
        variant={toggleVariant}
      />
    </Toggles>
  )
}

export default SearchRecipesHeaderToggles
