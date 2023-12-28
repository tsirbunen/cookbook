'use client'

import { createContext } from 'react'
import { pingQueryQuery } from './graphql-queries'
import { useQuery } from '@apollo/client'

export type RecipeService = {
  pingStatus: string
}

export const RecipeServiceContext = createContext<RecipeService>({} as RecipeService)

/**
 *
 */
const RecipeServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading, error, data } = useQuery(pingQueryQuery)

  const pingStatus = loading ? 'loading...' : error ? 'ERROR' : data?.pingQuery

  return <RecipeServiceContext.Provider value={{ pingStatus }}>{children}</RecipeServiceContext.Provider>
}

export default RecipeServiceProvider
