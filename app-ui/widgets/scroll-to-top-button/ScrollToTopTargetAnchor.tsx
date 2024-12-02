import { HEADER_HEIGHT } from '../../constants/layout'

/**
 * The target to which the ScrollToTopButton will scroll to.
 * Should be placed at the top of the content that the button should scroll to.
 */
const ScrollToTopTargetAnchor = ({ targetAnchorId }: { targetAnchorId: string }) => {
  return (
    <div style={{ zIndex: 1000, position: 'relative', top: `-${HEADER_HEIGHT}px` }}>
      {/* biome-ignore lint/a11y/useAnchorContent: We do not want to show any text content */}
      <a id={targetAnchorId} href="#content-top" aria-label="Scroll to top" />
    </div>
  )
}

export default ScrollToTopTargetAnchor
