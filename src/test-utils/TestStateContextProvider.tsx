import React, { useReducer } from 'react'
import { reducer } from '../state/reducer'
import { AppState, AppStateContext, initialAppState } from '../state/StateContextProvider'

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
