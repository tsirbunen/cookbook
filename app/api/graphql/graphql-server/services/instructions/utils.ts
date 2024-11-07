import { eq, inArray } from 'drizzle-orm'
import { instructionGroups, instructions } from '../../database/database-schemas/instructions'
import type {
  InstructionDBSelect,
  InstructionGroupDBSelect,
  InstructionInsert,
  RecipeSelectDBExpanded
} from '../../database/inferred-types/inferred-types'
import type { DatabaseType } from '../../database/inferred-types/inferred-types'
import type { InstructionGroupInput, InstructionInput } from '../../modules/types.generated'

export const handleCreateOrPatchInstructionGroupsAndTheirInstructions = async (
  trx: DatabaseType,
  recipeId: number,
  newOrPatchedInstructionGroups: InstructionGroupInput[],
  originalInstructionGroups?: RecipeSelectDBExpanded['instructionGroups']
) => {
  // Let's assume that the instruction groups are in the same order as in the original recipe
  // (i.e. that the order of GROUPS cannot be changed in any UI and that if new GROUPS are added,
  // those are added at the end)
  const loopMax = Math.max(newOrPatchedInstructionGroups.length, originalInstructionGroups?.length ?? 0)
  for (let i = 0; i < loopMax; i++) {
    const newOrPatchedGroup = newOrPatchedInstructionGroups[i]
    const originalGroup = originalInstructionGroups?.[i]
    await handleCreateOrPatchInstructionGroupAndItsInstructions(trx, recipeId, newOrPatchedGroup, originalGroup)
  }
}

const handleCreateOrPatchInstructionGroupAndItsInstructions = async (
  trx: DatabaseType,
  recipeId: number,
  newOrPatchedGroup?: InstructionGroupInput,
  originalGroup?: InstructionGroupDBSelect & { instructions: InstructionDBSelect[] }
) => {
  const groupId = await createOrPatchInstructionGroup(trx, recipeId, newOrPatchedGroup, originalGroup)
  await createPatchOrDeleteInstructions(trx, groupId, newOrPatchedGroup, originalGroup)
}

const createOrPatchInstructionGroup = async (
  trx: DatabaseType,
  recipeId: number,
  newOrPatchedGroup?: InstructionGroupInput,
  originalGroup?: InstructionGroupDBSelect
) => {
  let groupId: number
  if (!originalGroup) {
    const group = await createInstructionGroup(trx, { recipeId, title: newOrPatchedGroup?.title })
    groupId = group.insertedId
  } else {
    if (newOrPatchedGroup?.title) {
      await patchInstructionGroup(trx, originalGroup.id, { title: newOrPatchedGroup.title })
    }
    groupId = originalGroup.id
  }

  return groupId
}

const createPatchOrDeleteInstructions = async (
  trx: DatabaseType,
  groupId: number,
  newOrPatchedGroup?: InstructionGroupInput,
  originalGroup?: InstructionGroupDBSelect & { instructions: InstructionDBSelect[] }
) => {
  const newOrPatchedInstructionInputs = newOrPatchedGroup?.instructions ?? []
  const newOrPatchedInstructionIdsInOrder: number[] = []

  for (let i = 0; i < newOrPatchedInstructionInputs.length; i++) {
    const instructionInput = newOrPatchedInstructionInputs[i]

    const instructionWithAddedGroupInfo = {
      content: instructionInput.content,
      groupId,
      previousId: i === 0 ? null : newOrPatchedInstructionIdsInOrder[i - 1]
    }

    const instructionId = (instructionInput as InstructionInput).id
    const existingInstruction =
      instructionId && originalGroup?.instructions.find((instruction) => instruction.id === instructionId)

    if (!existingInstruction) {
      const newInstructionId = await insertInstruction(trx, instructionWithAddedGroupInfo)
      newOrPatchedInstructionIdsInOrder.push(newInstructionId)
    } else {
      const areSame = instructionContentsAreSame(existingInstruction, instructionWithAddedGroupInfo, instructionId)
      if (!areSame) {
        await updateInstruction(trx, instructionId, instructionWithAddedGroupInfo)
      }
      newOrPatchedInstructionIdsInOrder.push(instructionId)
    }
  }

  await deleteInstructionsNotInIdsToKeep(trx, newOrPatchedInstructionIdsInOrder, originalGroup)
}

const createInstructionGroup = async (trx: DatabaseType, groupInsert: { recipeId: number; title?: string | null }) => {
  const createdGroup = await trx
    .insert(instructionGroups)
    .values(groupInsert)
    .returning({ insertedId: instructionGroups.id })
  return createdGroup[0]
}

const patchInstructionGroup = async (trx: DatabaseType, groupId: number, groupPatch: { title?: string | null }) => {
  await trx.update(instructionGroups).set(groupPatch).where(eq(instructionGroups.id, groupId)).returning()
}

const deleteInstructionsNotInIdsToKeep = async (
  trx: DatabaseType,
  idsToKeep: number[],
  originalGroup?: InstructionGroupDBSelect & { instructions: InstructionDBSelect[] }
) => {
  const instructionsToDeleteIds: number[] = []
  const groupInstructions = originalGroup?.instructions ?? []
  for (let i = 0; i < groupInstructions.length; i++) {
    const originalId = groupInstructions[i].id
    const shouldDelete = !idsToKeep.includes(originalId)
    if (shouldDelete) {
      instructionsToDeleteIds.push(originalId)
    }
  }

  if (!instructionsToDeleteIds.length) return

  await trx
    .update(instructions)
    .set({ previousId: null })
    .where(inArray(instructions.id, instructionsToDeleteIds))
    .returning()
  await trx.delete(instructions).where(inArray(instructions.id, instructionsToDeleteIds))
}

const insertInstruction = async (trx: DatabaseType, updatedPatchedInstruction: InstructionInsert) => {
  const newInstruction = await trx
    .insert(instructions)
    .values(updatedPatchedInstruction)
    .returning({ insertedId: instructions.id })
  return newInstruction[0].insertedId
}

const updateInstruction = async (
  trx: DatabaseType,
  id: number,
  updatedPatchedInstruction: Omit<InstructionInsert, 'id'>
) => {
  await trx.update(instructions).set(updatedPatchedInstruction).where(eq(instructions.id, id)).returning()
}

const instructionContentsAreSame = (
  original: InstructionDBSelect,
  compareInstruction: Omit<InstructionInput, 'id'>,
  compareInstructionId: number
) => {
  return (
    original.content === compareInstruction.content &&
    original.previousId === compareInstruction.previousId &&
    original.groupId === compareInstruction.groupId &&
    original.id === compareInstructionId
  )
}
