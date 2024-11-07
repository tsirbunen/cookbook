/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { HEADER_HEIGHT } from '../../constants/layout'
import { NAVIGATION_BAR_ITEM_HEIGHT } from '../../navigation/navigation-bar/NavigationBarItem'
import { Page } from '../../navigation/router/router'
import AppIntro from './AppIntro'
import ContentInfoItem from './ContentInfoItem'

const HomePage = () => {
  return (
    <div css={outerCss} data-testid={`${Page.HOME}-page`}>
      <div css={titleCss}>
        <AppIntro alignment="start" />
      </div>

      <div css={itemsBoxCss}>
        {contentItems.map(({ label, description }) => {
          return <ContentInfoItem label={label} description={description} key={`content-info-item-${label}`} />
        })}
      </div>
    </div>
  )
}

export default HomePage

const contentItems = [
  { label: 'SEARCH', description: 'Browse the recipe collection and select one or multiple dishes to cook' },
  { label: 'COOK', description: 'Manage cooking multiple recipes simultaneously' },
  { label: 'WIZARD', description: 'Craft your own culinary masterpieces with the recipe creation wizard' },
  { label: 'SHOPPING', description: 'Generate a shopping list based on recipe ingredients' },
  { label: 'SETTINGS', description: 'Customize your app experience and manage your (optional) account' }
]

const outerCss = css`
  margin-top: ${HEADER_HEIGHT}px;
  margin-left: 15px;
  width: 530px;
`

const titleCss = css`
  height: ${NAVIGATION_BAR_ITEM_HEIGHT}px;
`
const itemsBoxCss = css`
  margin-top: 18px;
`
