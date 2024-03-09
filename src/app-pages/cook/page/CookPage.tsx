/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
import { css } from '@emotion/react'
import MultiPanelTopShowOrHideView from '../../../layout/views/MultiPanelTopShowOrHideView'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import { CookingContext } from './CookingProvider'
import MultiResizablePanelsView from '../../../layout/views/MultiResizablePanelsView'
import CookRecipePanel from '../panel/CookRecipePanel'
import { createPortal } from 'react-dom'
import { toolsElementId } from '../../../widgets/header-with-optional-toggles/MobileHeaderWithOptionalToggles'
import CookingHeaderToggles from './CookingHeaderToggles'
import React from 'react'
import PickedRecipesManagementTool from '../../recipes/viewing-management/PickedRecipesManagementTool'

const CookPage = () => {
  const { maxPanelsCount, isMobile } = useContext(ViewSizeContext)
  const { pickedRecipes, showPickedRecipes, displayConfig } = useContext(CookingContext)
  const { indexes, count } = displayConfig
  const { leftRecipeIndex, middleRecipeIndex, rightRecipeIndex } = indexes
  const toolsPortalDomNode = document.getElementById(toolsElementId)

  const hasNoRecipesToDisplay = leftRecipeIndex === undefined || pickedRecipes.length === 0
  if (hasNoRecipesToDisplay)
    return (
      <React.Fragment>
        {toolsPortalDomNode ? createPortal(<CookingHeaderToggles />, toolsPortalDomNode) : null}

        <div style={{ marginTop: '100px', marginLeft: '20px' }}>You have not picked any recipes to cook yet!</div>
      </React.Fragment>
    )

  const leftRecipe = pickedRecipes[leftRecipeIndex]
  const canShowMiddlePanel = maxPanelsCount > 1 && count > 1
  const canShowRightPanel = maxPanelsCount > 2 && count > 2
  const middleRecipe = canShowMiddlePanel && middleRecipeIndex ? pickedRecipes[middleRecipeIndex] : undefined
  const rightRecipe = canShowRightPanel && rightRecipeIndex ? pickedRecipes[rightRecipeIndex] : undefined

  return (
    <React.Fragment>
      {toolsPortalDomNode ? createPortal(<CookingHeaderToggles />, toolsPortalDomNode) : null}

      <MultiPanelTopShowOrHideView
        topShowOrHideContent={
          showPickedRecipes ? (
            <div css={boxCss(isMobile)}>
              <div css={toolsCss}>{showPickedRecipes ? <PickedRecipesManagementTool isMobile={isMobile} /> : null}</div>
            </div>
          ) : null
        }
        mainContent={
          <MultiResizablePanelsView
            leftContent={<CookRecipePanel recipe={leftRecipe} />}
            middleContent={middleRecipe ? <CookRecipePanel recipe={middleRecipe} /> : undefined}
            rightContent={rightRecipe ? <CookRecipePanel recipe={rightRecipe} /> : undefined}
          />
        }
      />
    </React.Fragment>
  )
}

export default CookPage

const toolsCss = css`
  padding-right: 15px;
`

const boxCss = (isMobile: boolean) => css`
  padding-left: ${isMobile ? '5px' : '10px'};
`
