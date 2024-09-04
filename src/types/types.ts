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
  id?: number
  username?: string
  phoneNumber: string
  token?: string
}
