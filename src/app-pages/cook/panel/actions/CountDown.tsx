/** @jsxImportSource @emotion/react */

import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'
import type { TimerData } from '../../../../types/types'
import { outerCss, timeInnerCss } from './common-styles'

const COUNTDOWN_ZERO = '00:00'

const CountDown = ({ timer }: { timer: TimerData }) => {
  const [countdownTime, setCountdownTime] = useState(COUNTDOWN_ZERO)
  //   FIXME: Implement alarm sound
  //   const [isDone, setIsDone] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only run once
  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = getTimeLeft(timer.startedAt, timer.secondsAtStart)
      setCountdownTime(timeLeft)
      //   FIXME: Implement alarm sound
      //   if (timeLeft === COUNTDOWN_ZERO) setIsDone(true)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div css={outerCss}>
      <div css={timeInnerCss}>{countdownTime}</div>
    </div>
  )
}

export default CountDown

const getTimeLeft = (startedAt: Date, secondsAtStart: number) => {
  let seconds = differenceInSeconds(new Date(), startedAt)
  seconds -= secondsAtStart
  if (seconds <= 0) return COUNTDOWN_ZERO

  const hours = Math.floor(seconds / 3600)
  seconds -= hours * 3600
  const minutes = Math.floor(seconds / 60)
  seconds -= minutes * 60

  if (hours > 1) return `${getPaddedNumber(hours)}:${getPaddedNumber(minutes)}`
  return `${getPaddedNumber(minutes)}:${getPaddedNumber(seconds)}`
}

const getPaddedNumber = (number: number) => number.toString().padStart(2, '0')
