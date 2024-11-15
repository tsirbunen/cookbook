import { eq, inArray } from 'drizzle-orm'
import type { Instruction } from '../../handlers/types-and-interfaces/types'
import type { Database } from '../config/config'
import { instructions } from '../database-schemas/instructions'

export class InstructionStore {
  async delete(trx: Database, ids: number[]) {
    await trx.delete(instructions).where(inArray(instructions.id, ids))
  }

  async removePreviousInstructionReferences(trx: Database, referenceIdsToRemove: number[]) {
    await trx
      .update(instructions)
      .set({ previousId: null })
      .where(inArray(instructions.previousId, referenceIdsToRemove))
      .returning()
  }

  async create(trx: Database, input: Instruction) {
    const newInstruction = await trx.insert(instructions).values(input).returning({ insertedId: instructions.id })
    return newInstruction[0].insertedId
  }

  async update(trx: Database, id: number, input: Omit<Instruction, 'id'>) {
    await trx.update(instructions).set(input).where(eq(instructions.id, id)).returning()
  }
}
