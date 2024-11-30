import { eq, inArray } from 'drizzle-orm'
import type { Database } from '../config/config'
import { instructionGroups } from '../database-schemas/instructions'

export class InstructionGroupStore {
  async create(trx: Database, input: { recipeId: number; title?: string | null }) {
    const createdGroup = await trx
      .insert(instructionGroups)
      .values(input)
      .returning({ insertedId: instructionGroups.id })
    return createdGroup[0]
  }

  async patch(trx: Database, groupId: number, group: { title?: string | null }) {
    await trx.update(instructionGroups).set(group).where(eq(instructionGroups.id, groupId)).returning()
  }

  async delete(trx: Database, groupIds: number[]) {
    await trx.delete(instructionGroups).where(inArray(instructionGroups.id, groupIds))
  }
}
