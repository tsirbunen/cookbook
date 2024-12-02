import { Flex } from '@chakra-ui/react'
import { uniq } from 'lodash'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { Shades } from '../../../constants/shades'
import { Page } from '../../../navigation/page-paths'
import { SoundServiceContext, SoundType } from '../../../sounds/SoundProvider'
import { AppStateContext, type AppStateContextType } from '../../../state/StateContextProvider'
import { Dispatch } from '../../../state/reducer'
import type { Recipe } from '../../../types/graphql-schema-types.generated'
import DraggableItemsList from '../../../widgets/draggable-items-list/DraggableItemsList'
import { ViewRecipesMode } from '../search-management/ViewModeManagementTool'
import PhotoCardWidget from './PhotoCardWidget'
import SummaryWidget from './SummaryWidget'
import TitleWidget from './TitleWidget'

const listItemHeight = 40

const recipesElementsByMode = {
  PHOTOS: PhotoCardWidget,
  SUMMARIES: SummaryWidget,
  TITLES: TitleWidget
}

export type RecipeWidgetsProps = {
  recipes: Recipe[]
  onPickRecipeChanged: (recipeId: number) => void
  mode: ViewRecipesMode
  showBackground: boolean
  favoriteRecipeIds: number[]
  pickedRecipeIds: number[]
  canDragAndDrop: boolean
  onChangedRecipeOrder?: (newOrderOfIds: number[]) => void
}

const RecipeWidgets = (props: RecipeWidgetsProps) => {
  const {
    recipes,
    mode,
    onPickRecipeChanged,
    showBackground,
    favoriteRecipeIds,
    pickedRecipeIds,
    canDragAndDrop,
    onChangedRecipeOrder
  } = props
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const router = useRouter()
  const [recipesInOrder, setRecipesInOrder] = useState(recipes)
  const { playSound } = useContext(SoundServiceContext)
  const RecipeElement = recipesElementsByMode[mode]

  useEffect(() => {
    setRecipesInOrder(recipes)
  }, [recipes])

  const toggleIsPickedWithSound = (isPicked: boolean, id: number) => {
    const soundType = isPicked ? SoundType.NEGATIVE : SoundType.POSITIVE
    playSound(soundType)
    onPickRecipeChanged(id)
  }

  const navigateToRecipe = (id: number) => {
    const newOrderOfIds = uniq([id, ...state.pickedRecipeIds])
    onPickRecipeChanged(id)
    dispatch({ type: Dispatch.CHANGE_RECIPES_ORDER, payload: { newOrderOfIds } })
    router.push(`/${Page.COOK}`)
  }

  const onConfirmNewOrder = (newOrderOfKeys: string[]) => {
    const recipeIds = newOrderOfKeys.map(getRecipeIdFromKey)
    onChangedRecipeOrder?.(recipeIds)
  }

  const getRecipeIdFromKey = (key: string) => {
    const parts = key.split('-')
    return Number.parseInt(parts[parts.length - 1])
  }

  const items = canDragAndDrop ? recipesInOrder : recipes
  const elements = items.map((recipe, index) => {
    const recipeId = recipe.id
    const isPicked = pickedRecipeIds.includes(recipe.id)

    return (
      <RecipeElement
        id={canDragAndDrop ? `title-${recipeId}` : `title-${index}-${recipeId}`}
        index={index}
        isFavorite={favoriteRecipeIds.includes(recipeId)}
        isPicked={isPicked}
        key={canDragAndDrop ? `title-${recipeId}` : `title-${index}-${recipeId}`}
        navigateToRecipe={() => navigateToRecipe(recipeId)}
        recipe={recipe}
        showBackground={showBackground}
        toggleIsPickedWithSound={() => toggleIsPickedWithSound(isPicked, recipeId)}
        itemHeight={listItemHeight}
      />
    )
  })

  if (!canDragAndDrop) {
    return <Flex {...cssByMode[mode]}>{elements}</Flex>
  }

  return (
    <Flex {...cssByMode[mode]}>
      <DraggableItemsList
        onConfirmNewOrder={onConfirmNewOrder}
        items={elements}
        itemHeight={listItemHeight}
        onMoveBgColor={Shades.MEDIUM}
        handColor={Shades.VERY_DARK}
      />
    </Flex>
  )
}

export default RecipeWidgets

const commonCss = {
  display: 'flex',
  width: '100%',
  justifyContent: 'start',
  paddingRight: '15px'
}

const photosContainerCss = {
  ...commonCss,
  marginLeft: '12px',
  flexWrap: 'wrap',
  marginTop: '10px'
}

const summariesContainerCss = {
  ...commonCss,
  marginLeft: '5px',
  flexDirection: 'column',
  paddingLeft: '10px'
}

const titlesContainerCss = {
  ...commonCss,
  flex: 1,
  flexDirection: 'column',
  alignItems: 'start',
  marginLeft: '8px',
  marginTop: '10px'
}

const cssByMode: Record<ViewRecipesMode, object> = {
  [ViewRecipesMode.PHOTOS]: photosContainerCss,
  [ViewRecipesMode.SUMMARIES]: summariesContainerCss,
  [ViewRecipesMode.TITLES]: titlesContainerCss
}
