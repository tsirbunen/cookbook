import { type ChakraProps, Flex, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { FaPlay } from 'react-icons/fa'
import { Shades } from '../../constants/shades'
import { SoundServiceContext, SoundType } from '../../sounds/SoundProvider'
import { LocalStorageContext, LocalStorageKeys } from '../../state/LocalStorageProvider'
import { AppStateContext, type AppStateContextType } from '../../state/StateContextProvider'
import { Dispatch } from '../../state/reducer'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import { pageInfoCss } from '../../utils/styles'
import SwitchToggleWithLabel from '../../widgets/switch-toggle/SwitchToggleWithLabel'
import { labels } from './labels'

const SoundSettings = () => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { playSound } = useContext(SoundServiceContext)
  const { toggleValueForKey } = useContext(LocalStorageContext)
  const soundsAreEnabled = state.settings.soundsEnabled ?? false

  const toggleSoundsEnabled = () => {
    const newValue = !soundsAreEnabled
    if (soundsAreEnabled) playSound(SoundType.POSITIVE)
    toggleValueForKey(LocalStorageKeys.SOUNDS_ARE_ENABLED, newValue)
    dispatch({ type: Dispatch.TOGGLE_SOUNDS_ENABLED, payload: { enabled: newValue } })
  }

  const playPositiveSound = () => playSound(SoundType.POSITIVE)
  const playNegativeSound = () => playSound(SoundType.NEGATIVE)

  const getExamplesInfo = () => {
    if (soundsAreEnabled) return labels.examplesInfo
    return `${labels.examplesInfo} ${labels.turnSoundsOnReminder}`
  }

  return (
    <Flex {...outerCss}>
      <Text {...pageInfoCss}>{labels.mainInfo}</Text>

      <SwitchToggleWithLabel
        isChecked={soundsAreEnabled}
        onChange={toggleSoundsEnabled}
        labelChecked={labels.valuePrefix}
        emphasizedLabelChecked={labels.enabledText}
        emphasizedLabelNotChecked={labels.disabledText}
      />

      <Text {...pageInfoCss}>{getExamplesInfo()}</Text>

      <Flex {...buttonsOuterCss}>
        <Flex {...buttonsBoxCss}>
          <ButtonWithTheme
            variant={ButtonVariant.MediumSizePale}
            onClick={playPositiveSound}
            isToggled={true}
            isDisabled={!soundsAreEnabled}
          >
            <FaPlay />
            <Text {...buttonTextCss}>{labels.positiveButtonLabel}</Text>
          </ButtonWithTheme>
        </Flex>

        <ButtonWithTheme
          variant={ButtonVariant.MediumSizePale}
          onClick={playNegativeSound}
          isToggled={true}
          isDisabled={!soundsAreEnabled}
        >
          <FaPlay />
          <Text {...buttonTextCss}>{labels.negativeButtonLabel}</Text>
        </ButtonWithTheme>
      </Flex>
    </Flex>
  )
}

export default SoundSettings

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start'
}

const buttonsOuterCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '10px',
  marginBottom: '10px'
}

const buttonTextCss = {
  marginLeft: '10px',
  color: Shades.VERY_PALE
}

const buttonsBoxCss = {
  marginRight: '10px'
}
