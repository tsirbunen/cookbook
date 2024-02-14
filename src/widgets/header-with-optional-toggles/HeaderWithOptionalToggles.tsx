/** @jsxImportSource @emotion/react */

import { usePathname } from 'next/navigation'
import { getRouteLabelByPath } from '../../navigation/router/router'
import { ViewSizeContext, headerHeightRegular } from '../../app-layout/ViewSizeProvider'
import { useContext } from 'react'
import MobileHeaderWithOptionalToggles from './MobileHeaderWithOptionalToggles'
import NarrowHeaderWithToggles from './NarrowHeaderWithToggles'
import RegularHeaderWithToggles from './RegularHeaderWithToggles'

export const toolsElementId = 'toolsElementId'

/**
 * The header is the topmost component of the app UI. It contains the app title,
 * the current page label, and a menu icon. If the use mode is mobile, then
 * the menu icon can be clicked to open a navigation drawer. Otherwise the menu icon
 * is just an icon without action. The header can also contain a target for a portal
 * into which other components can send JSX content through createPortal. The content
 * is expected to contain action buttons (toggles) related to page content.
 */
const HeaderWithOptionalToggles = () => {
  const { isMobile, isNarrowHeader, isHeaderWithTools, headerHeight } = useContext(ViewSizeContext)
  const path = usePathname()
  const label = getRouteLabelByPath(path)
  const noTools = !isHeaderWithTools(path)
  const height = noTools ? headerHeightRegular : headerHeight

  if (isMobile) return <MobileHeaderWithOptionalToggles label={label as string} noTools={noTools} height={height} />
  if (isNarrowHeader) return <NarrowHeaderWithToggles label={label as string} height={height} />
  return <RegularHeaderWithToggles label={label as string} height={height} />
}

export default HeaderWithOptionalToggles
