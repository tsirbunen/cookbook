import type React from 'react'
import { useReducer } from 'react'
import { type AppState, AppStateContext, initialAppState } from '../state/StateContextProvider'
import { reducer } from '../state/reducer'

export const TestAppStateContextProvider = ({
  initialState,
  children
}: {
  initialState?: AppState
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initialState ? initialState : initialAppState)

  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>
}
