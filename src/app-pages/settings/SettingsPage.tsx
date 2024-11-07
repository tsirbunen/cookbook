/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { HEADER_HEIGHT } from '../../constants/layout'
import { Page } from '../../navigation/router/router'
import SettingsItem from './SettingsItem'
import SoundSettings from './SoundSettings'

const soundSettingsTitle = 'Sound effects'

const SettingsPage = () => {
  return (
    <div css={container} data-testid={`${Page.SETTINGS}-page`}>
      <SettingsItem title={soundSettingsTitle}>
        <SoundSettings />
      </SettingsItem>
    </div>
  )
}

export default SettingsPage

const container = css`
  margin-top: ${HEADER_HEIGHT}px;
  margin-left: 25px;
  margin-right: 25px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`
