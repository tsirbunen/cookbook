import { DataStore } from '../../../app-datastore/data-stores/data-store'
import type {
  Instruction,
  InstructionFull,
  InstructionGroupBodyFull,
  InstructionGroupFull,
  InstructionGroupInput
} from '../../types-and-interfaces/types'

export class InstructionGroupHandler {
  constructor(private dataStore: DataStore) {}

  async createGroupsWithInstructions(recipeId: number, inputGroups: InstructionGroupInput[]) {
    for await (const { title, instructions } of inputGroups) {
      const newGroup = await this.dataStore.createInstructionGroup({ recipeId, title })
      await this.createGroupInstructions(newGroup.insertedId, instructions as Instruction[])
    }
  }

  async patchInstructionGroups(inputGroups: InstructionGroupInput[], originalGroups: InstructionGroupFull[]) {
    const currentGroupIds: number[] = []
    const recipeId = originalGroups[0].recipeId

    for (let i = 0; i < inputGroups.length; i++) {
      const input = inputGroups[i] as InstructionGroupInput & { instructions: InstructionFull[] }
      const original = originalGroups.find(({ id }) => id === (input.id as number))

      if (original) {
        currentGroupIds.push(original.id)
        const groupBodiesAreSame = this.instructionGroupBodiesAreSame(original, input)
        if (!groupBodiesAreSame) {
          await this.dataStore.patchInstructionGroup(original.id, { title: input.title })
        }

        await this.patchGroupInstructions(original.id, input.instructions, original.instructions)
      } else {
        const newGroup = await this.dataStore.createInstructionGroup({ recipeId, title: input.title })
        currentGroupIds.push(newGroup.insertedId)
        await this.createGroupInstructions(newGroup.insertedId, input.instructions as Instruction[])
      }
    }
    await this.deleteRemovedGroups(currentGroupIds, originalGroups)
  }

  async deleteRemovedGroups(currentGroupIds: number[], originalGroups: InstructionGroupFull[]) {
    const groupsToDelete = originalGroups.filter(({ id }) => !currentGroupIds.includes(id))
    const instructionsToDeleteIds = groupsToDelete.flatMap((group) => {
      return group.instructions.map(({ id }) => id)
    })
    if (!groupsToDelete.length) return

    await this.dataStore.removePreviousInstructionReferences(instructionsToDeleteIds)
    await this.dataStore.deleteInstructions(instructionsToDeleteIds)
    const groupsToDeleteIds = groupsToDelete.map(({ id }) => id)
    await this.dataStore.deleteInstructionGroups(groupsToDeleteIds)
  }

  async createGroupInstructions(groupId: number, instructionUpserts: Instruction[]) {
    const idsToKeep: number[] = []
    for (let i = 0; i < instructionUpserts.length; i++) {
      const input = instructionUpserts[i]
      const previousId = i === 0 ? null : idsToKeep[i - 1]
      const instructionUpsert = { content: input.content, groupId, previousId }
      const id = await this.dataStore.createInstruction(instructionUpsert)
      idsToKeep.push(id)
    }
  }

  async patchGroupInstructions(groupId: number, inputs: Instruction[], originalInstructions: InstructionFull[]) {
    const idsInOrder: number[] = []

    for (let i = 0; i < inputs.length; i++) {
      const { id, content } = inputs[i]
      const previousId = i === 0 ? null : idsInOrder[i - 1]
      const patch = { content: content, groupId, previousId }
      const existing = originalInstructions.find((original) => original.id === id)

      if (existing) {
        if (!this.instructionContentsAreSame(existing, { id: existing.id, ...patch })) {
          await this.dataStore.updateInstruction(existing.id, patch)
        }
        idsInOrder.push(existing.id)
      } else {
        const newId = await this.dataStore.createInstruction(patch)
        idsInOrder.push(newId)
      }
    }

    await this.deleteRemovedInstructions(idsInOrder, originalInstructions)
  }

  async deleteRemovedInstructions(idsToKeep: number[], originalInstructions: InstructionFull[] = []) {
    const toDeleteIds = originalInstructions.filter(({ id }) => !idsToKeep.includes(id)).map(({ id }) => id)
    if (!toDeleteIds.length) return

    await this.dataStore.removePreviousInstructionReferences(toDeleteIds)
    await this.dataStore.deleteInstructions(toDeleteIds)
  }

  instructionGroupBodiesAreSame(
    original: InstructionGroupBodyFull & { instructions: InstructionFull[] },
    updated: InstructionGroupInput
  ) {
    const fields = ['title'] as (keyof InstructionGroupInput)[]
    return fields.every((field) => original[field] === updated[field])
  }

  instructionContentsAreSame(original: InstructionFull, updated: Instruction) {
    const fields = Object.keys(updated) as (keyof Instruction)[]
    return fields.every((field) => original[field] === updated[field])
  }
}
