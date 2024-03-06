/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CookingContext } from './CookingProvider'
import MultiResizablePanelsView from '../../../layout/views/MultiResizablePanelsView'
import { useContext } from 'react'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import React from 'react'
// import CookingHeaderToggles from './CookingHeaderToggles'
// import { toolsElementId } from '../../../widgets/header-with-optional-toggles/HeaderWithOptionalToggles'
// import { createPortal } from 'react-dom'
import CookRecipePanel from '../panel/CookRecipePanel'

const CookingContent = () => {
  const { maxPanelsCount } = useContext(ViewSizeContext)
  const { pickedRecipes, leftRecipeIndex, middleRecipeIndex, rightRecipeIndex } = useContext(CookingContext)

  if (leftRecipeIndex === null) {
    return <div>No recipes</div>
  }
  const canShowMiddlePanel = maxPanelsCount > 1
  const canShowRightPanel = maxPanelsCount > 2

  const leftRecipe = pickedRecipes[leftRecipeIndex]
  const middleRecipe = canShowMiddlePanel && middleRecipeIndex ? pickedRecipes[middleRecipeIndex] : undefined
  const rightRecipe = canShowRightPanel && rightRecipeIndex ? pickedRecipes[rightRecipeIndex] : undefined

  // const toolsPortalDomNode = document.getElementById(toolsElementId)

  return (
    // <React.Fragment>
    // {/* {toolsPortalDomNode ? createPortal(<CookingHeaderToggles />, toolsPortalDomNode) : null} */}
    // <div css={outerCss}>
    <MultiResizablePanelsView
      leftContent={<CookRecipePanel recipe={leftRecipe} />}
      middleContent={middleRecipe ? <CookRecipePanel recipe={middleRecipe} /> : undefined}
      rightContent={rightRecipe ? <CookRecipePanel recipe={rightRecipe} /> : undefined}
    />
    // </div>
    // </React.Fragment>
  )
}

export default CookingContent

// height: 100%;
// width: 100%;
const outerCss = css`
  display: flex;
  flex: 1;
  flex-direction: row;
`
// overflow-x: hidden;
