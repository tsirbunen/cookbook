import { expect } from '@jest/globals'
import { client, database } from '../../database/config/config'
import {
  clearDatabase,
  getTableRowCountInDatabase,
  getTableRows,
  insertLanguagesToDB,
  insertRecipeToDB,
  insertTagsToDB
} from './test-database-helpers'
import { handleFindExistingOrCreateNewTags } from '../tags/utils'

let newRecipeId: number

describe('Handle tags', () => {
  beforeEach(async () => {
    await clearDatabase()
    const [{ id: languageId }] = await insertLanguagesToDB(['Chinese'])
    const newRecipe = (await insertRecipeToDB({
      title: 'Fried rice',
      languageId: languageId as number,
      ovenNeeded: false
    })) as { id: number }
    newRecipeId = newRecipe.id
  })

  it('Previously created tags are found without creating new tags', async () => {
    const tags = ['vegan', 'healthy', 'gluten-free', 'vegetarian']
    const newTags = await insertTagsToDB(tags)
    const indexes = [0, 1]
    const expectedTags = [newTags[indexes[0]], newTags[indexes[1]]]
    const recipeTags = indexes.map((index) => tags[index])

    const allTags = await handleFindExistingOrCreateNewTags(database, newRecipeId, recipeTags)

    allTags!.forEach((tag, index) => {
      const expectedTag = expectedTags[index]
      expect(tag.tag).toBe(expectedTag.tag)
      expect(tag.id).toBe(expectedTag.id)
    })
    const rowCount = await getTableRowCountInDatabase('tags')
    expect(rowCount).toBe(tags.length)

    const recipeTagRelationsCount = await getTableRowCountInDatabase('recipes_to_tags')
    expect(recipeTagRelationsCount).toBe(recipeTags.length)
    const recipeTagRelations = await getTableRows('recipes_to_tags')
    const recipeTagIds = expectedTags.map((tag) => tag.id)
    recipeTagRelations.forEach((relation) => {
      expect(relation.recipe_id).toBe(newRecipeId)
      const containsId = recipeTagIds.includes(relation.tag_id)
      expect(containsId).toBe(true)
    })
  })

  it('Missing new tags are created', async () => {
    const tags = ['vegan', 'healthy', 'vegetarian']
    const existingTags = await insertTagsToDB(tags)
    const existingIndex = 1
    const recipeTags = [tags[existingIndex], 'gluten-free']

    const allTags = await handleFindExistingOrCreateNewTags(database, newRecipeId, recipeTags)
    const existingTag = existingTags[existingIndex]
    expect(allTags![0].tag).toBe(existingTag.tag)
    expect(allTags![0].id).toBe(existingTag.id)
    const existingTagIds = existingTags.map((tag) => tag.id)
    const isIncluded = existingTagIds.includes(allTags![1].id)
    expect(isIncluded).toBe(false)

    const rowCount = await getTableRowCountInDatabase('tags')
    expect(rowCount).toBe(tags.length + 1)

    const recipeTagRelationsCount = await getTableRowCountInDatabase('recipes_to_tags')
    expect(recipeTagRelationsCount).toBe(recipeTags.length)
    const recipeTagRelations = await getTableRows('recipes_to_tags')
    recipeTagRelations.forEach((relation) => {
      expect(relation.recipe_id).toBe(newRecipeId)
    })
  })

  afterAll(async () => {
    await client.end()
  })
})
