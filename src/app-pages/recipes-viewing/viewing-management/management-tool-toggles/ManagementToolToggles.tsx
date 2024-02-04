import { ColorCodes } from '../../../../theme/theme'
import { useRouter } from 'next/navigation'
import { ChakraProps, Flex } from '@chakra-ui/react'
import { RecipesViewingContext } from '../../page/RecipesViewingProvider'
import { useContext } from 'react'
import Toggle from './Toggle'
import { TbCheckbox, TbChefHat, TbTool, TbListDetails } from 'react-icons/tb'
import { Page, pagePaths } from '../../../../navigation/router/router'
import { AppStateContext, AppStateContextType } from '../../../../state/StateContextProvider'
import { ViewSizeContext } from '../../../../app-layout/ViewSizeProvider'
import { FiltersContext } from '../filtering-management-tool/FilteringProvider'

const ManagementToolToggles = () => {
  const { state } = useContext(AppStateContext) as AppStateContextType
  const { isMobile } = useContext(ViewSizeContext)
  const { selectedFiltersCount } = useContext(FiltersContext)
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
    <Flex {...outerBoxCss(isMobile)}>
      <Flex {...togglesBoxCss}>
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
          count={selectedFiltersCount}
        />

        <Toggle
          isToggled={pickedRecipesCount > 0}
          toggle={startCooking}
          Icon={TbChefHat}
          isDisabled={pickedRecipesCount === 0}
          count={null}
        />
      </Flex>
    </Flex>
  )
}

export default ManagementToolToggles

const outerBoxCss = (isMobile: boolean) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'start',
    justifyContent: isMobile ? 'center' : 'start',
    backgroundColor: ColorCodes.PALE,
    margin: `0px 0px 10px 0px`,
    padding: '10px',
    borderRadius: '6px'
  }
}

const togglesBoxCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  justifyContent: 'center'
}
