'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { LocalStorageContext } from '../state/LocalStorageProvider'
import { AppStateContext, type AppStateContextType } from '../state/StateContextProvider'
import { Dispatch } from '../state/reducer'

export enum SoundType {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE'
}

export type SoundService = {
  permissionError: string | null
  playSound: (soundType: SoundType) => void
}

const audioRunningErrorMessage =
  'CookBook: Audio is not enabled on this page. You need to give permission to play audio to hear the sounds!'

export const SoundServiceContext = createContext<SoundService>({} as SoundService)

/**

 */
const SoundServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const audioContextRef = useRef<AudioContext | null>(null)
  const [permissionError, setPermissionError] = useState<string | null>(null)
  const { soundsAreEnabled: storedSoundsAreEnabled } = useContext(LocalStorageContext)

  useEffect(() => {
    if (!state.settings.soundsEnabled && storedSoundsAreEnabled) {
      dispatch({ type: Dispatch.TOGGLE_SOUNDS_ENABLED, payload: { enabled: storedSoundsAreEnabled } })
    }
  }, [storedSoundsAreEnabled, dispatch, state.settings.soundsEnabled])

  const getAudioContext = () => {
    if (audioContextRef.current) return audioContextRef.current

    // @ts-expect-error -- The window.webkitAudioContext is a fallback for Safari
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    if (audioContext.state !== 'running') {
      console.warn(audioRunningErrorMessage)
      setPermissionError(audioRunningErrorMessage)
    } else if (audioContext.state === 'running' && permissionError) {
      setPermissionError(null)
    }

    audioContextRef.current = audioContext
    return audioContext
  }

  const applyTypeAndFrequenciesToSound = (
    oscillatorNode: OscillatorNode,
    soundType: SoundType,
    currentTime: number
  ) => {
    oscillatorNode.type = 'sine'
    oscillatorNode.frequency.setValueAtTime(400, currentTime)

    let rampValueFirst: number
    let rampValueSecond: number

    switch (soundType) {
      case SoundType.POSITIVE:
        rampValueFirst = 600
        rampValueSecond = 800
        break
      case SoundType.NEGATIVE:
        rampValueFirst = 200
        rampValueSecond = 100
        break
      default:
        throw new Error(`Unknown sound type: ${soundType}`)
    }

    oscillatorNode.frequency.exponentialRampToValueAtTime(rampValueFirst, currentTime + 0.05)
    oscillatorNode.frequency.exponentialRampToValueAtTime(rampValueSecond, currentTime + 0.15)
  }

  const playSound = (soundType: SoundType) => {
    const audioIsEnabled = state.settings.soundsEnabled
    if (!audioIsEnabled) return

    const audioContext = getAudioContext()
    if (!audioContext) return

    const sound = audioContext.createOscillator()
    applyTypeAndFrequenciesToSound(sound, soundType, audioContext.currentTime)

    const volumeControl = audioContext.createGain()
    volumeControl.gain.setValueAtTime(0.05, 0)

    sound.connect(volumeControl)
    volumeControl.connect(audioContext.destination)

    sound.start()
    sound.stop(audioContext.currentTime + 0.2)
  }

  return <SoundServiceContext.Provider value={{ permissionError, playSound }}>{children}</SoundServiceContext.Provider>
}

export default SoundServiceProvider
