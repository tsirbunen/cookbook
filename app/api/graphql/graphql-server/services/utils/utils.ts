import { sql } from 'drizzle-orm'
import { DatabaseType, IngredientDBSelect, InstructionDBSelect } from '../../database/inferred-types/inferred-types'
import { IngredientGroupInput, InstructionGroup } from '../../modules/types.generated'

export const getGroupInputs = (groups: Array<IngredientGroupInput | InstructionGroup>, newRecipeId: number) => {
  return groups.map((group) => ({ title: group.title, recipeId: newRecipeId }))
}

export const getNonFirstGroupElementIds = (newElements: Array<InstructionDBSelect | IngredientDBSelect>): number[] => {
  const nonFirstGroupMemberIds: number[] = []
  let currentGroupId = -1

  for (const element of newElements) {
    if (element.groupId === currentGroupId) nonFirstGroupMemberIds.push(element.id)

    currentGroupId = element.groupId!
  }

  return nonFirstGroupMemberIds
}

export const setPreviousIds = async (
  idsToUpdate: number[],
  table: 'ingredients' | 'instructions',
  trx: DatabaseType
) => {
  if (!idsToUpdate.length) return

  // Note: When ingredients or instructions were created, they were created inside transaction in correct order.
  // Now we only need to set the previous_instruction_id to point to id that is one less than current id.
  if (table === 'ingredients') {
    await trx.execute(sql`UPDATE ingredients SET previous_id = id - 1 WHERE id IN ${idsToUpdate}`)
    return
  }

  await trx.execute(sql`UPDATE instructions SET previous_id = id - 1 WHERE id IN ${idsToUpdate}`)

  // FIXME: Find out why this sql raw does not work here (it works in tests!)
  //   const query = sql.raw(`UPDATE ${table} SET previous_id = id - 1 WHERE id IN ${idsToUpdate}`)
  //   await trx.execute(query)
}
