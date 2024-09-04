import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { AppStateContext, AppStateContextType } from '../../state/StateContextProvider'
import { Dispatch } from '../../state/reducer'
import { SLIGHTLY_DARK_COLOR, VERY_PALE_COLOR } from '../../constants/color-codes'
import { SoundServiceContext, SoundType } from '../../sounds/SoundProvider'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import { FaPlay } from 'react-icons/fa'
import { LocalStorageContext, LocalStorageKeys } from '../../state/LocalStorageProvider'
import SwitchToggleWithLabel from '../../widgets/switch-toggle/SwitchToggleWithLabel'

const mainInfo = [
  'User actions (like clicking a button) sometimes have a sound effect attached to them.',
  'To enable / disable these sound effects, use the switch below.'
]
const valuePrefix = 'Sound effects are '
const enabledText = 'ON'
const disabledText = 'OFF'

const examplesInfo = [
  'There are different kinds of sounds for different kinds of events.',
  'Click the buttons below to hear the sounds used in the app.'
]
const turnSoundsOnReminder = 'Turn the sound effects on to enable the buttons.'
const positiveButtonLabel = 'POSITIVE'
const negativeButtonLabel = 'NEGATIVE'

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

  return (
    <Flex {...outerCss}>
      {mainInfo.map((info, index) => (
        <Text key={`sound-settings-info-${index}`} {...infoCss}>
          {info}
        </Text>
      ))}

      <Flex {...switchCss}>
        <SwitchToggleWithLabel
          isChecked={soundsAreEnabled}
          onChange={toggleSoundsEnabled}
          labelChecked={valuePrefix}
          emphasizedLabelChecked={enabledText}
          emphasizedLabelNotChecked={disabledText}
        />
      </Flex>

      {examplesInfo.map((info, index) => (
        <Text key={`sound-settings-info-${index}`} {...infoCss}>
          {info}
        </Text>
      ))}
      {!soundsAreEnabled && <Text {...infoCss}>{turnSoundsOnReminder}</Text>}

      <Flex {...buttonsOuterCss}>
        <Flex {...buttonsBoxCss}>
          <ButtonWithTheme
            variant={ButtonVariant.MediumSizePale}
            onClick={playPositiveSound}
            isToggled={true}
            isDisabled={!soundsAreEnabled}
          >
            <FaPlay />
            <Text {...buttonTextCss}>{positiveButtonLabel}</Text>
          </ButtonWithTheme>
        </Flex>
        <ButtonWithTheme
          variant={ButtonVariant.MediumSizePale}
          onClick={playNegativeSound}
          isToggled={true}
          isDisabled={!soundsAreEnabled}
        >
          <FaPlay />
          <Text {...buttonTextCss}>{negativeButtonLabel}</Text>
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

const infoCss = {
  lineHeight: '1.1em',
  color: SLIGHTLY_DARK_COLOR
}
const switchCss = {
  marginTop: '10px'
}
const buttonTextCss = {
  marginLeft: '10px',
  color: VERY_PALE_COLOR
}

const buttonsBoxCss = {
  marginRight: '10px'
}
