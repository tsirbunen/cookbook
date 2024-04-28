import { instructions, instructionGroups } from '../../database/database-schemas/instructions'
import { InstructionGroupDBSelect, InstructionInsert } from '../../database/inferred-types/inferred-types'
import { DatabaseType } from '../../database/inferred-types/inferred-types'
import { InstructionGroupInput } from '../../modules/types.generated'
import { getGroupInputs, getNonFirstGroupElementIds, setPreviousIds } from '../utils/utils'

export const handleCreateInstructions = async (
  trx: DatabaseType,
  inputs: InstructionGroupInput[],
  newRecipeId: number
) => {
  const groupInputs = getGroupInputs(inputs, newRecipeId)
  const newGroups = await trx.insert(instructionGroups).values(groupInputs).returning()

  const instructionInputs = getInstructionInputs(inputs, newGroups)
  const newInstructions = await trx.insert(instructions).values(instructionInputs).returning()
  const instructionsToUpdateIds = getNonFirstGroupElementIds(newInstructions)
  await setPreviousIds(instructionsToUpdateIds, 'instructions', trx)
}

const getInstructionInputs = (groups: InstructionGroupInput[], newGroups: InstructionGroupDBSelect[]) => {
  const instructionInputsByGroup: Record<string, InstructionInsert[]> = {}

  groups.forEach((group, groupIndex) => {
    instructionInputsByGroup[groupIndex] = []

    group.instructions!.forEach((instruction) => {
      instructionInputsByGroup[groupIndex].push({
        content: instruction,
        groupId: newGroups[groupIndex].id
      })
    })
  })

  return Object.values(instructionInputsByGroup).flat()
}
