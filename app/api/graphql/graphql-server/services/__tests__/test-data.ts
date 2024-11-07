import type { CreateRecipeInput } from '../../modules/types.generated'

export const emailAccountTestData = {
  username: 'Username',
  email: 'email@example.com',
  password: 'ppppppP8'
}

export const recipeTestInput: Omit<CreateRecipeInput, 'authorId'> = {
  title: 'Lemony lentil soup',
  tags: ['soup', 'lentils'],
  ovenNeeded: true,
  description: 'A delicious and healthy soup with a hint of lemon.',
  language: 'English',
  isPrivate: false,
  ingredientGroups: [
    {
      ingredients: [
        { amount: 500, unit: 'g', name: 'red lentils' },
        { amount: 2, name: 'onions' },
        { amount: 1, name: 'celery stalk' },
        { amount: 2, name: 'garlic cloves' },
        { amount: 0.5, unit: 'tsp', name: 'turmeric' },
        { amount: 2, name: 'carrots' },
        { amount: 0.5, unit: 'L', name: 'chicken stock' },
        { amount: 1, unit: 'dL', name: 'coconut cream' },
        { amount: 0.6, unit: 'L', name: 'water' },
        { amount: 1, unit: 'tbsp', name: 'fresh ginger (julienned)' },
        { amount: 1, name: 'lemon, zest and juice' },
        { name: '(olive) oil' },
        { name: 'salt' }
      ]
    },
    {
      title: 'Garnish',
      ingredients: [{ name: 'yogurt' }, { name: 'fresh coriander' }]
    }
  ],
  instructionGroups: [
    {
      title: 'Instructions group 1',
      instructions: [
        { content: 'Rinse the lentils thoroughly in cold water. Soak in cold water until needed.' },
        { content: 'Heat (olive) oil in a large stockpot over medium-high heat.' },
        { content: 'Peel and chop the onions, then sauté in the pot until fairly soft.' },
        { content: 'Chop the celery and add to the onions.' },
        { content: 'Add the turmeric (mainly to give a nice color).' },
        { content: 'Peel and chop the garlic cloves, then add to the other veggies.' },
        { content: 'Grate the carrots coarsely and add to the pot.' },
        { content: 'Simmer until all veggies are soft.' },
        { content: 'Stir in the chicken stock and some of the water. (Add more water later on as needed.)' },
        { content: 'Add the rinsed lentils.' },
        { content: 'Add the coconut cream.' },
        {
          content:
            'Cover and cook on low heat for 30-60 minutes. Stir well every now and then (the lentils tend to start sticking to the bottom). Add water as needed.'
        },
        { content: 'Stir in the lemon zest and juice.' },
        { content: 'Add the very finely julienned ginger.' },
        { content: 'Season with salt.' }
      ]
    },
    {
      title: 'Instructions group 2',
      instructions: [{ content: 'Serve with a dollop of yogurt and a sprinkle of fresh coriander.' }]
    }
  ]
}
