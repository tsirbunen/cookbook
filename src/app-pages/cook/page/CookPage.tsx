import CookingProvider from './CookingProvider'
import CookingContent from './CookingContent'
import MultiPanelTopShowOrHideView from '../../../layout/views/MultiPanelTopShowOrHideView'
import ViewingManagement from './ViewingManagement'

const CookPage = () => {
  const viewingManagement = <ViewingManagement />
  const cookingContent = <CookingContent />

  return (
    <CookingProvider>
      {/* <div css={container(width, windowHeight - headerHeightWithTools)} data-testid={`${Page.COOK}-page`}>
        <CookingContent />
      </div> */}
      {/* <MultiPanelTopShowOrHideView topShowOrHideContent={viewingManagement} mainContent={cookingContent} /> */}
      <MultiPanelTopShowOrHideView topShowOrHideContent={viewingManagement} mainContent={cookingContent} />
    </CookingProvider>
  )
}

export default CookPage
