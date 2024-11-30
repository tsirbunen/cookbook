import { type ChakraProps, Flex } from '@chakra-ui/react'
import React, { Fragment, useContext, useMemo, useState } from 'react'
import { rowStartCss } from '../../../../constants/styling'
import MultiColumnContent from '../../../../layout/multi-column-wrapper/MultiColumnContent'
import type { IngredientGroup } from '../../../../types/graphql-schema-types.generated'
import Title, { TitleVariant } from '../../../../widgets/titles/Title'
import { CookingContext } from '../../page/CookingProvider'
import CheckToggle from '../general/CheckToggle'
import IngredientRow from './IngredientRow'
import PresetMultiplierSelection from './PresetMultiplierSelection'

export type SelectedScalingIngredient = {
  id: number
  newAmount: string
  multiplier: number
}

type IngredientsProps = {
  ingredientGroups: IngredientGroup[]
  columnCount: number
  recipeId: number
}

const INGREDIENTS_SECTION_TITLE = 'INGREDIENTS'

const Ingredients = ({ ingredientGroups, columnCount, recipeId }: IngredientsProps) => {
  const { cookingRecipes, toggleIngredient, ingredientsAdded, scalingByRecipeId, isScalingRecipeIds, scaleRecipe } =
    useContext(CookingContext)
  const [presetMultiplier, setPresetMultiplier] = useState<number | undefined>(1)
  const [selectedIngredient, setSelectedIngredient] = useState<SelectedScalingIngredient | undefined>(undefined)

  // biome-ignore lint/correctness/useExhaustiveDependencies: Change only if selected dependencies change
  const isCooking = useMemo(() => cookingRecipes.some((recipe) => recipe.id === recipeId), [cookingRecipes])
  // biome-ignore lint/correctness/useExhaustiveDependencies: Change only if selected dependencies change
  const currentScaling = useMemo(() => scalingByRecipeId[recipeId], [scalingByRecipeId])
  // biome-ignore lint/correctness/useExhaustiveDependencies: Change only if selected dependencies change
  const isScaling = useMemo(() => isScalingRecipeIds.includes(recipeId), [isScalingRecipeIds])

  const selectPresetMultiplier = (value: number) => {
    setSelectedIngredient(undefined)
    setPresetMultiplier(value)
    scaleRecipe(recipeId, { multiplier: value })
  }

  const selectIngredientBasedMultiplier = () => {
    setPresetMultiplier(undefined)
    if (selectedIngredient && currentScaling?.multiplier !== selectedIngredient.multiplier) {
      scaleRecipe(recipeId, { multiplier: selectedIngredient.multiplier, ingredientId: selectedIngredient.id })
    }
  }

  const setIngredientBaseAmount = (id: number, amount: string, originalAmount: number) => {
    let preset: number | undefined
    let ingredient: SelectedScalingIngredient | undefined
    if (amount === originalAmount.toString()) {
      preset = 1
    } else {
      ingredient = {
        id,
        newAmount: amount,
        multiplier: amount !== '' ? Number.parseFloat(amount) / originalAmount : 1
      }
    }
    setPresetMultiplier(preset)
    setSelectedIngredient(ingredient)
  }

  return (
    <Flex {...outerCss} data-testid={`ingredients-for-recipe-${recipeId}`}>
      {isScaling ? (
        <PresetMultiplierSelection
          selectPresetMultiplier={selectPresetMultiplier}
          presetMultiplier={presetMultiplier}
        />
      ) : null}

      <MultiColumnContent
        columnCount={columnCount}
        title={!isScaling ? INGREDIENTS_SECTION_TITLE : undefined}
        keyId={recipeId}
        isCentered={true}
      >
        <Flex {...containerCss} key={`ingredients-columns-${recipeId}`}>
          {ingredientGroups.map((group, groupIndex) => {
            const { title, ingredients } = group
            const titleKey = `ingredient-${title}-${recipeId}-${groupIndex}`
            return (
              <Flex {...ingredientGroupCss} key={`${title}-${groupIndex}-${recipeId}`}>
                <Flex style={{ marginBottom: '5px' }} key={titleKey}>
                  {title ? <Title title={title.toUpperCase()} variant={TitleVariant.SmallPale} /> : null}
                </Flex>
                {ingredients.map((ingredient, index) => {
                  const isChecked = ingredientsAdded.includes(ingredient.id)

                  return (
                    <Fragment key={`ingredient-row-${ingredient.name}-${index}-${recipeId}`}>
                      <Flex {...rowBoxCss}>
                        <Flex {...ingredientRowCss}>
                          {isCooking ? (
                            <CheckToggle
                              isChecked={isChecked}
                              onChange={() => toggleIngredient(recipeId, ingredient.id)}
                            />
                          ) : null}
                          <IngredientRow
                            ingredient={ingredient}
                            presetMultiplier={presetMultiplier}
                            setIngredientBaseAmount={setIngredientBaseAmount}
                            selectedIngredient={selectedIngredient}
                            isScaling={isScaling}
                            showAsPale={isChecked && isCooking}
                            acceptValue={selectIngredientBasedMultiplier}
                          />
                        </Flex>
                      </Flex>
                    </Fragment>
                  )
                })}
              </Flex>
            )
          })}
        </Flex>
      </MultiColumnContent>
    </Flex>
  )
}

export default Ingredients

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  margin: '0px 20px 0px 20px',
  paddingBottom: '10px',
  borderRadius: '10px'
}

const containerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  flexWrap: 'wrap' as ChakraProps['flexWrap'],
  marginLeft: '10px',
  marginRight: '10px'
}

const ingredientGroupCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  width: '100%'
}

const rowBoxCss = {
  display: 'inline-block'
}

const ingredientRowCss = {
  ...rowStartCss,
  marginBottom: '3px'
}
