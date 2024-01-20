/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/navigation'
import ViewModeManager, { ViewRecipesMode } from '../view-mode-manager/ViewModeManager'
import PickRecipeManager from '../pick-recipe-manager/PickRecipeManager'
import { ColorCodes } from '../../../theme/theme'
import ToggleTools from '../toggle-tools/ToggleTools'
import { Page, pagePaths } from '../../../navigation/router/router'
import Filtering from '../filtering/Filtering'
import Toggle from '../toggle-tools/Toggle'
import { TbCheckbox, TbChefHat, TbTool } from 'react-icons/tb'
import { RecipeServiceContext } from '../../../recipes-service/RecipeServiceProvider'

type ToolsProps = {
  mode: ViewRecipesMode
  setMode: (newMode: ViewRecipesMode) => void
  isMobile: boolean
  isSplitView: boolean
}

const Tools = ({ mode, setMode, isMobile, isSplitView }: ToolsProps) => {
  const { pickedRecipeIdsByCategory } = useContext(RecipeServiceContext)
  const pickedRecipesCount = Object.values(pickedRecipeIdsByCategory).flat().length
  const [showPickedRecipes, setShowPickedRecipes] = useState(false)
  const [showFiltering, setShowFiltering] = useState(false)
  const router = useRouter()

  const selectMode = (newMode: ViewRecipesMode) => setMode(newMode)

  const toggleShowPickedRecipes = () => {
    setShowPickedRecipes((previous) => {
      return !previous
    })
  }

  const toggleShowFilters = () => {
    setShowFiltering((previous) => {
      return !previous
    })
  }

  const startCooking = () => router.push(pagePaths[Page.COOK])

  const renderPickedRecipesToggle = () => {
    return (
      <Toggle
        isToggled={showPickedRecipes}
        toggle={toggleShowPickedRecipes}
        Icon={TbCheckbox}
        count={pickedRecipesCount}
      />
    )
  }

  const renderFilteringToggle = () => {
    return <Toggle isToggled={showFiltering} toggle={toggleShowFilters} Icon={TbTool} count={0} />
  }

  const renderStartCookingToggle = () => {
    const isDisabled = pickedRecipesCount === 0
    return <Toggle isToggled={pickedRecipesCount > 0} toggle={startCooking} Icon={TbChefHat} isDisabled={isDisabled} />
  }

  return (
    <div css={isSplitView ? slitViewContainer : container(isMobile)}>
      <div css={toggles(isMobile)}>
        <ViewModeManager currentMode={mode} selectMode={selectMode} isMobile={isMobile} />
        <ToggleTools
          isMobile={isMobile}
          isSplitView={isSplitView}
          startCooking={startCooking}
          renderPickedRecipesToggle={renderPickedRecipesToggle}
          renderFilteringToggle={renderFilteringToggle}
          renderStartCookingToggle={renderStartCookingToggle}
        />
      </div>

      {showPickedRecipes ? <PickRecipeManager isMobile={isMobile} /> : null}

      {showFiltering ? <Filtering isMobile={isMobile} /> : null}
    </div>
  )
}

export default Tools

const slitViewContainer = css`
  background-color: ${ColorCodes.VERY_PALE};
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
  width: 500px;
  padding-left: 10px;
`

const container = (isMobile: boolean) => css`
  background-color: ${ColorCodes.VERY_PALE};
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  z-index: 20;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-left: ${isMobile ? '5px' : '10px'};
  padding-bottom: ${isMobile ? '0px' : '10px'};
  box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.24);
`

const toggles = (isMobile: boolean) => css`
  display: flex;
  flex-direction: ${isMobile ? 'column' : 'row'};
  justify-content: ${'start'};
  align-items: ${isMobile ? 'center' : 'start'};
`
