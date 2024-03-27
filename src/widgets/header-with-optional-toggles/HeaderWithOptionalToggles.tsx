/** @jsxImportSource @emotion/react */

import { usePathname } from 'next/navigation'
import { getRouteLabelByPath } from '../../navigation/router/router'
import { ViewSizeContext } from '../../layout/view-size-service/ViewSizeProvider'
import { useContext } from 'react'
import NarrowHeaderWithToggles from './NarrowHeaderWithToggles'
import RegularHeaderWithToggles from './RegularHeaderWithToggles'
import { HEADER_HEIGHT_REGULAR } from '../../constants/layout'

export const toolsElementId = 'toolsElementId'

/**
 * The header is the topmost component of the app UI. It contains the app title,
 * the current page label, and a menu icon. The menu icon is just an icon without action.
 * The header can also contain a target for a portal into which other components can send
 * JSX content through createPortal. The content is expected to contain action buttons
 * (i.e. toggles) related to page content.
 */
const HeaderWithOptionalToggles = () => {
  const { isNarrowHeader, isHeaderWithTools, headerHeight } = useContext(ViewSizeContext)
  const path = usePathname()
  const label = getRouteLabelByPath(path)
  const noTools = !isHeaderWithTools(path)
  const height = noTools ? HEADER_HEIGHT_REGULAR : headerHeight

  if (isNarrowHeader) return <NarrowHeaderWithToggles label={label as string} height={height} />
  return <RegularHeaderWithToggles label={label as string} height={height} />
}

export default HeaderWithOptionalToggles
