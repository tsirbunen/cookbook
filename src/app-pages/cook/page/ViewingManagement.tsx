/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
import { css } from '@emotion/react'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import { createPortal } from 'react-dom'
import { toolsElementId } from '../../../widgets/header-with-optional-toggles/HeaderWithOptionalToggles'
import { CookingContext } from './CookingProvider'
import PickedRecipesManagementTool from '../../recipes/viewing-management/PickedRecipesManagementTool'
import CookingHeaderToggles from './CookingHeaderToggles'

const ViewingManagement = () => {
  const { isMobile } = useContext(ViewSizeContext)
  const { showPickedRecipes } = useContext(CookingContext)

  const innerCss = boxCss(isMobile)
  const toolsPortalDomNode = document.getElementById(toolsElementId)

  return (
    <div css={innerCss}>
      {toolsPortalDomNode ? createPortal(<CookingHeaderToggles />, toolsPortalDomNode) : null}

      <div css={toolsCss}>{showPickedRecipes ? <PickedRecipesManagementTool isMobile={isMobile} /> : null}</div>
    </div>
  )
}

export default ViewingManagement

const toolsCss = css`
  padding-right: 15px;
`

const boxCss = (isMobile: boolean) => css`
  padding-left: ${isMobile ? '5px' : '10px'};
`
