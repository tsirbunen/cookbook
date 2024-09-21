import { IdentityProvider } from './graphql-schema-types.generated'

export enum FilterableRecipeProperty {
  categories = 'categories',
  languages = 'languages',
  tags = 'tags',
  ingredients = 'ingredients'
}

export type TimerData = {
  secondsAtStart: number
  startedAt: Date
}

export type Settings = {
  soundsEnabled: boolean | null
}

export type ScaledIngredientData = {
  amount: number
  unit: string
}

export type ScalingData = {
  multiplier: number
  ingredientId?: number
}

export type AccountInfo = {
  id: number
  uuid: string
  username: string
  email?: string
  emailVerified?: boolean
  identityProvider: IdentityProvider
  token?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSONSchemaType = Record<string, any>
