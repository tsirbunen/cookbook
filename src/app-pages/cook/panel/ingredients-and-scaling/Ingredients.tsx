import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { ChakraProps, Flex } from '@chakra-ui/react'
import { IngredientGroup } from '../../../../types/graphql-schema-types.generated'
import MultiColumnContent from '../MultiColumnContent'
import { CookingContext } from '../../page/CookingProvider'
import IngredientRow from './IngredientRow'
import PresetMultiplierSelection from './PresetMultiplierSelection'
import { ColorCodes } from '../../../../theme/theme'
import CheckToggle from '../CheckToggle'
import Title, { TitleVariant } from '../../../../widgets/titles/Title'

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

  const isCooking = useMemo(() => cookingRecipes.some((data) => data.recipe.id === recipeId), [cookingRecipes])
  const currentScaling = useMemo(() => scalingByRecipeId[recipeId], [scalingByRecipeId])
  const isScaling = useMemo(() => isScalingRecipeIds.includes(recipeId), [isScalingRecipeIds])

  useEffect(() => {
    if (isScaling || !presetMultiplier) return
    if (currentScaling?.multiplier !== presetMultiplier) {
      scaleRecipe(recipeId, { multiplier: presetMultiplier })
    }
  }, [isScaling, currentScaling, presetMultiplier])

  useEffect(() => {
    if (isScaling || !selectedIngredient) return
    if (currentScaling?.multiplier !== selectedIngredient.multiplier) {
      scaleRecipe(recipeId, { multiplier: selectedIngredient.multiplier, ingredientId: selectedIngredient.id })
    }
  }, [isScaling, currentScaling, selectedIngredient])

  const selectPresetMultiplier = (value: number) => {
    setSelectedIngredient(undefined)
    setPresetMultiplier(value)
  }

  const setIngredientBaseAmount = (id: number, amount: string, originalAmount: number) => {
    let preset
    let ingredient
    if (amount === originalAmount.toString()) {
      preset = 1
    } else {
      ingredient = {
        id,
        newAmount: amount,
        multiplier: amount !== '' ? parseFloat(amount) / originalAmount : 1
      }
    }
    setPresetMultiplier(preset)
    setSelectedIngredient(ingredient)
  }

  return (
    <Flex {...outerCss(isScaling)}>
      {isScaling ? (
        <PresetMultiplierSelection
          selectPresetMultiplier={selectPresetMultiplier}
          presetMultiplier={presetMultiplier}
        />
      ) : null}

      <MultiColumnContent
        columnCount={columnCount}
        title={!isScaling ? INGREDIENTS_SECTION_TITLE : undefined}
        recipeId={recipeId}
        isCentered={true}
      >
        <Flex {...containerCss} key={`ingredients-columns-${recipeId}`}>
          {ingredientGroups.map((group, groupIndex) => {
            const { title, ingredients } = group
            return (
              <Flex {...ingredientGroupCss} key={`${title}-${groupIndex}-${recipeId}`}>
                <Flex style={{ marginBottom: '5px' }} key={`ingredient-${title}-${recipeId}-${groupIndex}`}>
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

const outerCss = (isScaling: boolean) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    backgroundColor: isScaling ? ColorCodes.VERY_PALE : 'transparent',
    margin: '0px 20px 0px 20px',
    paddingBottom: '10px',
    borderRadius: '10px'
  }
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
  flexDirection: 'row' as ChakraProps['flexDirection'],
  display: 'flex',
  alignItems: 'start' as ChakraProps['alignItems'],
  justifyContent: 'start' as ChakraProps['justifyContent'],
  marginBottom: '3px'
}
