/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { ColorCodes } from '../../../theme/theme'
import CheckboxWithTheme from '../../../theme/checkboxes/CheckboxWithTheme'
import TitleWithLink from '../../../widgets/titles/TitleWithLink'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { FaRegHandPaper, FaHandRock } from 'react-icons/fa'
import { FaHand, FaRegHand } from 'react-icons/fa6'
import { useRef, useState } from 'react'

export const titleRepresentationDataTestId = 'title-representation'

export type TitleRecipeProps = {
  recipe: Recipe
  onPickRecipeChanged: () => void
  isPicked: boolean
  showBackground: boolean
  index: number
  confirmNewPosition?: (recipeId: number) => void
  onTargetChanged?: (direction?: 'up' | 'down', index?: number) => void
}

const TitleRecipe = ({
  recipe,
  index,
  isPicked,
  onPickRecipeChanged,
  showBackground,
  confirmNewPosition,
  onTargetChanged
}: TitleRecipeProps) => {
  const [position] = useState({ x: 0, y: 0 })
  const [zIndex, setZIndex] = useState<number | undefined>(undefined)
  const [shouldHide, setShouldHide] = useState<boolean>(false)

  const nodeRef = useRef(null)
  const { title } = recipe

  const onStartDrag = () => {
    setShouldHide(false)
    setZIndex(1000)
  }

  const onStopDrag = () => {
    setZIndex(undefined)
    confirmNewPosition && confirmNewPosition(recipe.id)
  }

  const onControlledDrag = (e: DraggableEvent, data: DraggableData) => {
    if (!onTargetChanged) return

    const { y } = data
    if (y <= 10 && y >= -10) {
    }

    if (y > 10) {
      const recipesInBetween = Math.floor(y / 40)
      const targetIndex = index + 1 + recipesInBetween
      onTargetChanged('down', targetIndex)
      setShouldHide(true)
    }

    if (y < -10) {
      const recipesInBetween = Math.floor(y / 40)
      const targetIndex = index + recipesInBetween - 1
      onTargetChanged('up', targetIndex)
      setShouldHide(true)
    }
  }

  const canDragAndDrop = onTargetChanged !== undefined

  const content = zIndex ? (
    <div
      css={outerCss(isPicked && showBackground, zIndex, shouldHide)}
      data-testid={titleRepresentationDataTestId}
      ref={nodeRef}
    >
      <div css={dragCss(isPicked && showBackground, zIndex)}>
        <CheckboxWithTheme isChecked={isPicked} onChange={onPickRecipeChanged} />
        <TitleWithLink title={title} url="TODO" />
        <FaHandRock size="25px" />
      </div>
    </div>
  ) : (
    <div css={outerCss(isPicked && showBackground, zIndex)} data-testid={titleRepresentationDataTestId} ref={nodeRef}>
      <CheckboxWithTheme isChecked={isPicked} onChange={onPickRecipeChanged} />

      <TitleWithLink title={title} url="TODO" />
      {canDragAndDrop ? (
        <div className="dragHandle">
          <FaRegHand size="25px" />
        </div>
      ) : null}
    </div>
  )

  if (canDragAndDrop) {
    return (
      <Draggable
        axis="y"
        handle=".dragHandle"
        // bounds=".dragArea"
        position={position}
        onStart={onStartDrag}
        onStop={onStopDrag}
        onDrag={onControlledDrag}
        nodeRef={nodeRef}
      >
        {content}
      </Draggable>
    )
  }

  return content
}

export default TitleRecipe

const outerCss = (showBackground: boolean, zIndex?: number, hide?: boolean) => css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  /* margin-bottom: 2px; */
  color: ${ColorCodes.VERY_DARK};
  /* background-color: ${showBackground ? ColorCodes.PALE : 'transparent'}; */
  /* background-color: pink; */
  /* background-color: ${zIndex ? ColorCodes.MEDIUM : showBackground ? ColorCodes.PALE : 'transparent'}; */
  /* background: repeating-linear-gradient(45deg, #606dbc, #606dbc 10px, #465298 10px, #465298 20px); */
  padding: ${showBackground ? 4 : 1}px 6px;
  border-radius: 6px;
  /* height: ${zIndex ? 0 : 40}px; */
  height: ${hide ? 0 : 40}px;
  z-index: ${zIndex};
`

const dragCss = (showBackground: boolean, zIndex?: number) => css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  /* margin-bottom: 2px; */
  color: ${ColorCodes.VERY_DARK};
  /* background-color: ${showBackground ? ColorCodes.PALE : 'transparent'}; */
  /* background-color: pink; */
  background-color: ${ColorCodes.MEDIUM};
  /* padding: ${showBackground ? 4 : 1}px 6px; */
  padding: ${showBackground ? 4 : 1}px 6px;
  margin-left: -6px;
  border-radius: 6px;
  height: ${zIndex ? 40 : 40}px;
  /* width: 100%; */
  z-index: ${zIndex};
  /* margin-top: 20px; */
`
