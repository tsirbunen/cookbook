import { sql } from 'drizzle-orm'

export const getOrCreateLanguage = async (database, language) => {
  let recipeLanguage

  const existing = await database.execute(sql`SELECT * FROM languages WHERE language = ${language}`)
  if (!existing.length) {
    const query = sql`INSERT INTO languages (language) VALUES (${language}) RETURNING *`
    const [newLanguage] = await database.execute(query)
    recipeLanguage = newLanguage
  } else {
    recipeLanguage = existing[0]
  }

  return recipeLanguage
}

export const createAccount = async (database, { username, identityProvider, idAtProvider }) => {
  const query = sql`INSERT INTO accounts (username, identity_provider, id_at_provider) 
    VALUES (${username}, ${identityProvider}, ${idAtProvider}) RETURNING *`
  const [newAccount] = await database.execute(query)
  return newAccount
}

export const createLanguages = async (database, languages) => {
  const newLanguages = []
  for await (const language of languages) {
    const created = await database.execute(sql`INSERT INTO languages (language) VALUES (${language}) RETURNING *`)
    newLanguages.push(created[0])
  }
  return newLanguages
}

export const createRecipe = async (database, recipeInput, languageId) => {
  const { authorId, isPrivate, title, ovenNeeded, description } = recipeInput
  const query = sql`INSERT INTO recipes (title, oven_needed, language_id, description, author_id, is_private) 
    VALUES (${title}, ${ovenNeeded}, ${languageId}, ${description ?? null}, ${authorId}, ${isPrivate}) RETURNING *`
  const [newRecipe] = await database.execute(query)
  return newRecipe
}

export const createPhotos = async (database, photoIdentifiers, recipeId) => {
  let isMainPhoto = true
  for await (const url of photoIdentifiers) {
    const query = sql`INSERT INTO photos (recipe_id, url, is_main_photo) VALUES (${recipeId}, ${url}, ${isMainPhoto}) RETURNING *`
    await database.execute(query)
    isMainPhoto = false
  }
}

export const getOrCreateTags = async (database, tags) => {
  const newTags = []
  for await (const tag of tags) {
    const existing = await database.execute(sql`SELECT * FROM tags WHERE tag = ${tag}`)
    if (existing.length) {
      newTags.push(existing[0])
      continue
    }

    const query = sql`INSERT INTO tags (tag) VALUES (${tag}) RETURNING *`
    const [newTag] = await database.execute(query)
    newTags.push(newTag)
  }

  return newTags
}

export const createRecipesToTags = async (database, recipeId, tags) => {
  const tagIds = tags.map((tag) => tag.id)
  for await (const tagId of tagIds) {
    const query = sql`INSERT INTO recipes_to_tags (recipe_id, tag_id) VALUES (${recipeId}, ${tagId}) RETURNING *`
    await database.execute(query)
  }
}

export const createIngredientGroups = async (database, ingredientGroups, recipeId) => {
  for await (const group of ingredientGroups) {
    const query = sql`INSERT INTO ingredient_groups (recipe_id, title) VALUES (${recipeId}, ${
      group.title ?? null
    }) RETURNING *`
    const [newGroup] = await database.execute(query)

    const groupId = newGroup.id
    let previousId = null

    for await (const { amount, unit, name } of group.ingredients) {
      const query = sql`INSERT INTO ingredients (group_id, amount, unit, name, previous_id) VALUES (${groupId}, ${
        amount ?? null
      }, ${unit ?? null}, ${name ?? null}, ${previousId}) RETURNING *`
      const [newIngredient] = await database.execute(query)
      previousId = newIngredient.id
    }
  }
}

export const createInstructionGroups = async (database, instructionGroups, recipeId) => {
  for await (const group of instructionGroups) {
    const query = sql`INSERT INTO instruction_groups (recipe_id, title) VALUES (${recipeId}, ${
      group.title ?? null
    }) RETURNING *`
    const [newGroup] = await database.execute(query)

    const groupId = newGroup.id
    let previousId = null

    for await (const content of group.instructions) {
      const query = sql`INSERT INTO instructions (group_id, content, previous_id) VALUES (${groupId}, ${
        content ?? null
      }, ${previousId}) RETURNING *`
      const [newInstruction] = await database.execute(query)
      previousId = newInstruction.id
    }
  }
}

export const createEmailAccount = async (database, { username, email, passwordHash }) => {
  const created = await database.execute(
    sql`INSERT INTO accounts (username, email, password_hash, identity_provider) VALUES (${username}, ${email}, ${passwordHash}, 'EMAIL') RETURNING *`
  )
  return created[0]
}
