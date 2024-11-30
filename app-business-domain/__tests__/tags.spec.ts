import { expect } from '@jest/globals'
import { getTableRowCountInDatabase, getTableRows } from './test-database-helpers'
import { TagHandler } from '../handlers/tags/handler'
import { clearDatabase } from '../../app-datastore/utils/clear-database'
import { createAccount, createRecipe, getOrCreateLanguage, getOrCreateTags } from '../../app-datastore/utils/insert-data-to-database'
import { dataStore } from '../../app-datastore/data-stores/data-store'
import { client, database } from '../../app-datastore/config/config'

let newRecipeId: number
let tagHandler: TagHandler

describe('Handle tags', () => {
  beforeEach(async () => {
    await clearDatabase(database)
    const account = await createAccount(database, {
      username: 'username',
      identityProvider: 'GITHUB',
      idAtProvider: 'test-id'
    })
    const testRecipeInput = { title: 'Fried rice', ovenNeeded: false, authorId: account.id, isPrivate: false }
    const { id: languageId } = await getOrCreateLanguage(database, 'Chinese')
    const newRecipe = await createRecipe(database, testRecipeInput, languageId as number)
    newRecipeId = newRecipe.id
    tagHandler = new TagHandler(dataStore)
  })

  it('Previously created tags are found without creating new tags', async () => {
    const tags = ['vegan', 'healthy', 'gluten-free', 'vegetarian']
    const newTags = await getOrCreateTags(database, tags)
    const indexes = [0, 1]
    const expectedTags = [newTags[indexes[0]], newTags[indexes[1]]]
    const recipeTags = indexes.map((index) => tags[index])
    const actions = async () => {
      return await tagHandler.findOrCreateTagsAndSetRelations(newRecipeId, recipeTags)
    }
    const allTags = await dataStore.withinTransaction(actions)
    if (!allTags) throw new Error('Tags not found')

    allTags.forEach((tag, index) => {
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
    for (const relation of recipeTagRelations) {
      expect(relation.recipe_id).toBe(newRecipeId)
      const containsId = recipeTagIds.includes(relation.tag_id)
      expect(containsId).toBe(true)
    }
  })

  it('Missing new tags are created', async () => {
    const tags = ['vegan', 'healthy', 'vegetarian']
    const existingTags = await getOrCreateTags(database, tags)
    const existingIndex = 1
    const recipeTags = [tags[existingIndex], 'gluten-free']

    const actions = async () => {
      return await tagHandler.findOrCreateTagsAndSetRelations(newRecipeId, recipeTags)
    }
    const allTags = await dataStore.withinTransaction(actions)

    const existingTag = existingTags[existingIndex]
    if (!allTags) throw new Error('Tags not found')

    expect(allTags[0].tag).toBe(existingTag.tag)
    expect(allTags[0].id).toBe(existingTag.id)
    const existingTagIds = existingTags.map((tag) => tag.id)
    const isIncluded = existingTagIds.includes(allTags[1].id)
    expect(isIncluded).toBe(false)

    const rowCount = await getTableRowCountInDatabase('tags')
    expect(rowCount).toBe(tags.length + 1)

    const recipeTagRelationsCount = await getTableRowCountInDatabase('recipes_to_tags')
    expect(recipeTagRelationsCount).toBe(recipeTags.length)
    const recipeTagRelations = await getTableRows('recipes_to_tags')
    for (const relation of recipeTagRelations) {
      expect(relation.recipe_id).toBe(newRecipeId)
    }
  })

  afterAll(async () => {
    await client.end()
  })
})
