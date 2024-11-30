import { Flex } from '@chakra-ui/react'
import { Page } from '../../navigation/page-paths'
import { pageCss } from '../../utils/styles'
import SettingsItem from './SettingsItem'
import SoundSettings from './SoundSettings'
import { labels } from './labels'

const SettingsPage = () => {
  return (
    <Flex {...pageCss} data-testid={`${Page.SETTINGS}-page`}>
      <SettingsItem title={labels.soundSettingsTitle}>
        <SoundSettings />
      </SettingsItem>
    </Flex>
  )
}

export default SettingsPage
