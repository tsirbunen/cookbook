import { useContext } from 'react'
import MultiPanelView from '../../../layout/views/MultiPanelView'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import { CookingContext } from './CookingProvider'
import MultiResizablePanelsView from '../../../layout/resizable-panels/MultiResizablePanelsView'
import CookRecipePanel from '../panel/CookRecipePanel'
import { createPortal } from 'react-dom'
import CookingHeaderToggles from './CookingHeaderToggles'
import React from 'react'
import { Page } from '../../../navigation/router/router'
import { toolsElementId } from '../../../widgets/header-with-optional-toggles/HeaderWithToggles'

const CookPage = () => {
  const { maxPanelsCount } = useContext(ViewSizeContext)
  const { pickedRecipes, displayConfig } = useContext(CookingContext)

  const { indexes, count } = displayConfig
  const { leftRecipeIndex, middleRecipeIndex, rightRecipeIndex } = indexes
  const toolsPortalDomNode = document.getElementById(toolsElementId)

  const cookPageTestId = `${Page.COOK}-page`
  const hasNoRecipesToDisplay = leftRecipeIndex === undefined || pickedRecipes.length === 0
  if (hasNoRecipesToDisplay)
    return (
      <div data-testid={cookPageTestId}>
        <div style={{ marginTop: '100px', marginLeft: '20px' }}>You have not picked any recipes to cook yet!</div>
      </div>
    )

  const leftRecipe = pickedRecipes[leftRecipeIndex]
  const canShowMiddlePanel = maxPanelsCount > 1 && count > 1
  const canShowRightPanel = maxPanelsCount > 2 && count > 2
  const middleRecipe = canShowMiddlePanel && middleRecipeIndex ? pickedRecipes[middleRecipeIndex] : undefined
  const rightRecipe = canShowRightPanel && rightRecipeIndex ? pickedRecipes[rightRecipeIndex] : undefined
  const showHeaderToggles = !!toolsPortalDomNode && pickedRecipes.length > 1

  return (
    <React.Fragment>
      {showHeaderToggles ? createPortal(<CookingHeaderToggles />, toolsPortalDomNode) : null}

      <MultiPanelView
        content={
          <MultiResizablePanelsView
            leftContent={<CookRecipePanel recipe={leftRecipe} />}
            middleContent={middleRecipe ? <CookRecipePanel recipe={middleRecipe} /> : undefined}
            rightContent={rightRecipe ? <CookRecipePanel recipe={rightRecipe} /> : undefined}
          />
        }
        testId={cookPageTestId}
      />
    </React.Fragment>
  )
}

export default CookPage
