/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
import { css } from '@emotion/react'
import MultiPanelTopShowOrHideView from '../../../layout/views/MultiPanelTopShowOrHideView'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import { CookingContext } from './CookingProvider'
import MultiResizablePanelsView from '../../../layout/resizable-panels/MultiResizablePanelsView'
import CookRecipePanel from '../panel/CookRecipePanel'
import { createPortal } from 'react-dom'
import CookingHeaderToggles from './CookingHeaderToggles'
import React from 'react'
import PickedRecipesManagementTool from '../../search/search-management/PickedRecipesManagementTool'
import { RecipesViewingContext } from '../../search/page/SearchRecipesProvider'
import { Page } from '../../../navigation/router/router'
import { toolsElementId } from '../../../widgets/header-with-optional-toggles/HeaderWithToggles'

const CookPage = () => {
  const { maxPanelsCount } = useContext(ViewSizeContext)
  const { pickedRecipes, displayConfig } = useContext(CookingContext)
  const { showPickedRecipes } = useContext(RecipesViewingContext)
  const { indexes, count } = displayConfig
  const { leftRecipeIndex, middleRecipeIndex, rightRecipeIndex } = indexes
  const toolsPortalDomNode = document.getElementById(toolsElementId)

  const cookPageTestId = `${Page.COOK}-page`
  const hasNoRecipesToDisplay = leftRecipeIndex === undefined || pickedRecipes.length === 0
  if (hasNoRecipesToDisplay)
    return (
      <div data-testid={cookPageTestId}>
        {toolsPortalDomNode ? createPortal(<CookingHeaderToggles />, toolsPortalDomNode) : null}

        <div style={{ marginTop: '150px', marginLeft: '20px' }}>You have not picked any recipes to cook yet!</div>
      </div>
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
            <div css={boxCss}>
              <div css={toolsCss}>{showPickedRecipes ? <PickedRecipesManagementTool /> : null}</div>
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
        testId={cookPageTestId}
      />
    </React.Fragment>
  )
}

export default CookPage

const toolsCss = css`
  padding-right: 15px;
`

const boxCss = css`
  padding-left: 10px;
`
