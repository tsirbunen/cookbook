import { type ChakraProps, Flex } from '@chakra-ui/react'
import { uniq } from 'lodash'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { Shades } from '../../../constants/shades'
import { Page } from '../../../navigation/page-paths'
import { LocalStorageContext } from '../../../state/LocalStorageProvider'
import { SoundServiceContext, SoundType } from '../../../state/SoundProvider'
import { AppStateContext, type AppStateContextType } from '../../../state/StateContextProvider'
import { Dispatch } from '../../../state/reducer'
import type { Recipe } from '../../../types/graphql-schema-types.generated'
import DraggableItemsList from '../../../widgets/draggable-items-list/DraggableItemsList'
import ScrollToTopButton from '../../../widgets/scroll-to-top-button/ScrollToTopButton'
import ScrollToTopTargetAnchor from '../../../widgets/scroll-to-top-button/ScrollToTopTargetAnchor'
import { ViewRecipesMode } from '../tools/ViewModeTool'
import PhotoWidget from './PhotoWidget'
import SummaryWidget from './SummaryWidget'
import TitleWidget from './TitleWidget'

const listItemHeight = 40
export const recipesContentDataTestId = 'recipes-content'
const SCROLL_TO_TARGET_ANCHOR_ID = 'content-top'

const recipesElementsByMode = {
  PHOTOS: PhotoWidget,
  SUMMARIES: SummaryWidget,
  TITLES: TitleWidget
}

export type WidgetsProps = {
  recipes: Recipe[]
  mode: ViewRecipesMode
  showBackground: boolean
  canDragAndDrop: boolean
}

const Widgets = ({ recipes, mode, showBackground, canDragAndDrop }: WidgetsProps) => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { favoriteRecipeIds } = useContext(LocalStorageContext)
  const { playSound } = useContext(SoundServiceContext)
  const [recipesInOrder, setRecipesInOrder] = useState(recipes)
  const router = useRouter()

  useEffect(() => {
    setRecipesInOrder(recipes)
  }, [recipes])

  const toggleIsPickedWithSound = (isPicked: boolean, id: number) => {
    const soundType = isPicked ? SoundType.NEGATIVE : SoundType.POSITIVE
    playSound(soundType)
    dispatch({ type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeIds: [id] } })
  }

  const navigateToRecipe = (id: number) => {
    const newOrderOfIds = uniq([id, ...state.pickedRecipeIds])
    dispatch({ type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeIds: [id] } })
    dispatch({ type: Dispatch.CHANGE_RECIPES_ORDER, payload: { newOrderOfIds } })
    router.push(`/${Page.COOK}`)
  }

  const onConfirmNewOrder = (newOrderOfKeys: string[]) => {
    const recipeIds = newOrderOfKeys.map(getRecipeIdFromKey)
    dispatch({ type: Dispatch.CHANGE_RECIPES_ORDER, payload: { newOrderOfIds: recipeIds } })
  }

  const getRecipeIdFromKey = (key: string) => {
    const parts = key.split('-')
    return Number.parseInt(parts[parts.length - 1])
  }

  if (!recipes?.length) return null

  const pickedRecipeIds = state.pickedRecipeIds
  const RecipeElement = recipesElementsByMode[mode]
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
    return (
      <Flex {...outerCss} data-testid={recipesContentDataTestId}>
        <ScrollToTopTargetAnchor targetAnchorId={SCROLL_TO_TARGET_ANCHOR_ID} />

        <Flex {...cssByMode[mode]}>{elements}</Flex>
        <ScrollToTopButton targetAnchorId={SCROLL_TO_TARGET_ANCHOR_ID} />
      </Flex>
    )
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

export default Widgets

const outerCss = {
  display: 'flex' as ChakraProps['display'],
  flexDirection: 'column' as ChakraProps['flexDirection'],
  justifyContent: 'start',
  alignItems: 'start',
  width: '100%'
}

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
