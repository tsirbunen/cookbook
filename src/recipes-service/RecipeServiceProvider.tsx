'use client'

import { createContext } from 'react'
import { useQuery } from '@apollo/client'
import { QueryPingDocument, QueryPingQuery, QueryPingQueryVariables } from './queries.generated'

export type RecipeService = {
  pingStatus: string
}

export const RecipeServiceContext = createContext<RecipeService>({} as RecipeService)

/**
 *
 */
const RecipeServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading, error, data } = useQuery<QueryPingQuery, QueryPingQueryVariables>(QueryPingDocument)

  const pingStatus = loading ? 'loading...' : error ? 'ERROR' : data?.pingQuery ?? 'not found'

  return <RecipeServiceContext.Provider value={{ pingStatus }}>{children}</RecipeServiceContext.Provider>
}

export default RecipeServiceProvider
