// import { database } from '../database/config/config'
// import { recipes } from '../database/database-schemas/recipes'
import { Category } from '../../../../../src/types/types'

export const getAllRecipes = async () => {
  // const allRecipes = await database.select().from(recipes)
  // console.log(recipes)
  return [...recipes, { ...cypressTestRecipe1 }, { ...cypressTestRecipe2 }]
}

const devRecipe = {
  id: 1,
  title: 'Best Falafels Ever (really truly delicious)',
  description:
    "The best authentic falafel recipe you can make at home! A simple combination of chickpeas, herbs and spices that's blended together and fried (or baked). They're crispy, soft and delicious!",
  mainImageUrl: 'falafel-image-url',
  extraImageUrls: [],
  tags: ['vegan', 'chickpea'],
  isFavorite: true,
  category: Category.DINNER,
  ovenNeeded: false,
  ingredientGroups: [
    {
      id: 1,
      title: null,
      ingredients: [
        {
          id: 1,
          amount: 1,
          unit: 'cup',
          name: "dried chickpeas, soaked overnight (don't use canned chickpeas)",
          previousIngredientId: null
        },
        { id: 2, amount: 0.5, unit: 'cup', name: 'roughly chopped onion', previousIngredientId: 1 },
        {
          id: 3,
          amount: 1,
          unit: 'cup',
          name: 'roughly chopped parsley, about a one large bunch',
          previousIngredientId: 2
        },
        {
          id: 4,
          amount: 1,
          unit: 'cup',
          name: 'roughly chopped cilantro, about a one large bunch',
          previousIngredientId: 3
        },
        { id: 5, amount: 1, name: 'small green chile pepper, serrano or jalapeno pepper', previousIngredientId: 4 },
        { id: 6, amount: 3, name: 'garlic cloves', previousIngredientId: 5 },
        { id: 7, amount: 1, unit: 'ts', name: 'cumin', previousIngredientId: 6 },
        { id: 8, amount: 1, unit: 'ts', name: 'salt', previousIngredientId: 7 },
        { id: 9, amount: 0.5, unit: 'ts', name: 'cardamom', previousIngredientId: 8 },
        { id: 10, amount: 0.25, unit: 'ts', name: 'black pepper', previousIngredientId: 9 },
        { id: 11, amount: 2, unit: 'tbsp', name: 'chickpea flour (or other flour)', previousIngredientId: 10 },
        { id: 12, amount: 0.5, unit: 'ts', name: ' baking soda', previousIngredientId: 11 },
        { id: 13, name: 'oil for frying', previousIngredientId: 12 }
      ]
    }
  ],
  instructionGroups: [
    {
      id: 1,
      title: null,
      instructions: [
        {
          id: 1,
          content:
            "The night before, soak the dried chickpeas in water. Make sure the water covers the chickpeas by 2 to 3 inches, as they'll triple in size.",
          previousInstructionId: null,
          ingredientReferenceIds: [1]
        },
        {
          id: 2,
          content:
            'Drain and rinse the chickpeas and add them to your food processor, along with the onion, parsley, cilantro, pepper, garlic, cumin, salt, cardamom and black pepper.',
          previousInstructionId: 1,
          ingredientReferenceIds: [1, , 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
          id: 3,
          content: 'Pulse the food processor several times until the mixture resembles the texture of coarse sand.',
          previousInstructionId: 2,
          ingredientReferenceIds: []
        },
        {
          id: 4,
          content:
            'Transfer the falafel mixture to a bowl and add the chickpea flour and baking soda. Stir together, then cover or add a lid and refrigerate the mixture for 30 minutes to one hour.',
          previousInstructionId: 3,
          ingredientReferenceIds: [11, 12]
        },
        {
          id: 5,
          content:
            "Use your hands, an ice cream scoop or falafel scoop to form the falafel into balls or patties. If you find the mixture is too wet, you can add another tablespoon of chickpea flour. If it's too dry and crumbly, you can add a teaspoon or two of water or lemon juice.",
          previousInstructionId: 4,
          ingredientReferenceIds: []
        },
        {
          id: 6,
          content:
            'Once the falafel are formed, you can cook them by your preferred method mentioned above. To deep fry the falafel, add about 3 inches of oil to a pot on medium heat. Heat the oil to 350°F (175°C). Cook the falafel in batches (about 6 to 8 at a time) for 1 to 2 minutes or until golden.',
          previousInstructionId: 5,
          ingredientReferenceIds: [13]
        },
        {
          id: 7,
          content:
            "Use a skimmer to check the color of the falafel and make sure they don't over cook. Then remove them to a paper towel-lined plate.",
          previousInstructionId: 6,
          ingredientReferenceIds: []
        },
        {
          id: 8,
          content:
            "Serve the falafel immediately, while warm and crispy on the outside. They're delicious served with tahini sauce as well.",
          previousInstructionId: 7,
          ingredientReferenceIds: []
        }
      ]
    }
  ]
}

const cypressTestRecipe1 = {
  id: 111,
  title: 'CYPRESS TITLE 1',
  description: 'cypress decription 1',
  mainImageUrl: 'cypress-image-url-1',
  extraImageUrls: [],
  tags: ['cypress'],
  isFavorite: true,
  category: Category.SNACK,
  ovenNeeded: false,
  ingredientGroups: [
    {
      id: 111,
      title: null,
      ingredients: [
        {
          id: 111,
          amount: 1,
          unit: 'cup',
          name: 'cypress',
          previousIngredientId: null
        },
        { id: 112, amount: 0.5, unit: 'cup', name: 'plum', previousIngredientId: 111 }
      ]
    }
  ],
  instructionGroups: [
    {
      id: 333,
      title: null,
      instructions: [
        {
          id: 333,
          content:
            "The night before, soak the dried chickpeas in water. Make sure the water covers the chickpeas by 2 to 3 inches, as they'll triple in size.",
          previousInstructionId: null,
          ingredientReferenceIds: [111]
        }
      ]
    }
  ]
}

const cypressTestRecipe2 = {
  ...cypressTestRecipe1,
  id: 555,
  title: 'CYPRESS TITLE 2',
  description: 'cypress decription 2',
  mainImageUrl: 'cypress-image-url-2',
  category: Category.BRUNCH,
  ovenNeeded: true,
  isFavorite: false
}

const devRecipe13 = {
  id: 13,
  title: 'BLUEBERRY RECIPE TEST',
  description: 'The best!',
  mainImageUrl: 'falafel-image-url',
  extraImageUrls: [],
  tags: ['vegan', 'chickpea'],
  isFavorite: true,
  category: Category.DINNER,
  ovenNeeded: false,
  ingredientGroups: [
    {
      id: 101,
      title: null,
      ingredients: [
        {
          id: 200,
          amount: 1,
          unit: 'cup',
          name: 'raspberry',
          previousIngredientId: null
        },
        { id: 201, amount: 0.5, unit: 'cup', name: 'blueberry', previousIngredientId: 200 }
      ]
    }
  ],
  instructionGroups: [
    {
      id: 300,
      title: null,
      instructions: [
        {
          id: 400,
          content:
            "The night before, soak the dried chickpeas in water. Make sure the water covers the chickpeas by 2 to 3 inches, as they'll triple in size.",
          previousInstructionId: null,
          ingredientReferenceIds: [200]
        }
      ]
    }
  ]
}

const recipes = [
  {
    ...devRecipe,
    id: 1,
    title: `1: Truly delicious falafels`,
    tags: ['vegan', 'chickpea'],
    category: Category.DINNER,
    ovenNeeded: true,
    isFavorite: false
  },
  {
    ...devRecipe,
    id: 2,
    title: `2: ${devRecipe.title}`,
    tags: ['vegetarian', 'healthy'],
    category: Category.LUNCH,
    isFavorite: false
  },
  {
    ...devRecipe,
    id: 3,
    title: `3: Simple falafels`,
    tags: ['vegan', 'chickpea'],
    category: Category.BREAKFAST,
    ovenNeeded: true,
    isFavorite: true
  },
  {
    ...devRecipe,
    id: 4,
    // title: `4: Extremely delicious some falafels Extremely delicious some falafels`,
    title: `4: Extremely delicious falafels`,
    tags: ['vegetarian', 'lebanese', 'healthy'],
    category: Category.BREAKFAST,
    ovenNeeded: true,
    isFavorite: false
  },
  {
    ...devRecipe,
    id: 5,
    title: `5: Middle eastern style dinner for friends`,
    tags: ['vegetarian', 'middleeast'],
    category: Category.DINNER,
    ovenNeeded: true,
    isFavorite: true
  },
  {
    ...devRecipe,
    id: 6,
    title: `6: ${devRecipe.title}`,
    tags: ['vegetarian', 'middleeast'],
    category: Category.DINNER,
    ovenNeeded: false,
    isFavorite: true
  },
  {
    ...devRecipe,
    id: 7,
    title: `7: Marry me falafels`,
    tags: ['middleeast'],
    category: Category.DINNER,
    ovenNeeded: true,
    isFavorite: false
  },
  {
    ...devRecipe,
    id: 8,
    title: `8: ${devRecipe.title}`,
    tags: ['vegetarian', 'middleeast'],
    category: Category.BREAKFAST,
    ovenNeeded: false,
    isFavorite: true
  },
  {
    ...devRecipe,
    id: 9,
    title: `9: Special breakfast for the family`,
    tags: ['salad', 'noredmeat'],
    category: Category.BREAKFAST,
    ovenNeeded: true,
    isFavorite: false
  },
  {
    ...devRecipe,
    id: 10,
    title: `10: ${devRecipe.title}`,
    tags: ['vegan'],
    category: Category.LUNCH,
    ovenNeeded: true,
    isFavorite: false
  },
  {
    ...devRecipe,
    id: 11,
    title: `11: ${devRecipe.title}`,
    tags: ['vegetarian', 'fastfood', 'middleeast'],
    category: Category.DINNER,
    ovenNeeded: false,
    isFavorite: false
  },
  {
    ...devRecipe,
    id: 12,
    title: `12: ${devRecipe.title}`,
    tags: ['vegan', 'healthy', 'middleeast'],
    category: Category.DINNER,
    ovenNeeded: true,
    isFavorite: false
  },
  devRecipe13
]

// r.forEach((recipe, index) => {
//   console.log(recipe.title, recipe.ingredientGroups)
//   recipe.ingredientGroups.forEach((group, groupIndex) => {
//     console.log(group.ingredients)
//   })
// })

// return r

// const devRecipe = {
//   id: 1,
//   title: 'Best Falafels Ever (really truly delicious)',
//   description:
//     "The best authentic falafel recipe you can make at home! A simple combination of chickpeas, herbs and spices that's blended together and fried (or baked). They're crispy, soft and delicious!",
//   mainImageUrl: 'falafel-image-url',
//   extraImageUrls: [],
//   tags: ['vegan', 'chickpea'],
//   isFavorite: true,
//   category: Category.DINNER,
//   ovenNeeded: false,
//   ingredientGroups: [
//     {
//       id: 1,
//       title: null,
//       ingredients: [
//         {
//           id: 1,
//           amount: 1,
//           unit: 'cup',
//           name: "dried chickpeas, soaked overnight (don't use canned chickpeas)",
//           previousIngredientId: null
//         },
//         { id: 2, amount: 0.5, unit: 'cup', name: 'roughly chopped onion', previousIngredientId: 1 },
//         {
//           id: 3,
//           amount: 1,
//           unit: 'cup',
//           name: 'roughly chopped parsley, about a one large bunch',
//           previousIngredientId: 2
//         },
//         {
//           id: 4,
//           amount: 1,
//           unit: 'cup',
//           name: 'roughly chopped cilantro, about a one large bunch',
//           previousIngredientId: 3
//         },
//         { id: 5, amount: 1, name: 'small green chile pepper, serrano or jalapeno pepper', previousIngredientId: 4 },
//         { id: 6, amount: 3, name: 'garlic cloves', previousIngredientId: 5 },
//         { id: 7, amount: 1, unit: 'ts', name: 'cumin', previousIngredientId: 6 },
//         { id: 8, amount: 1, unit: 'ts', name: 'salt', previousIngredientId: 7 },
//         { id: 9, amount: 0.5, unit: 'ts', name: 'cardamom', previousIngredientId: 8 },
//         { id: 10, amount: 0.25, unit: 'ts', name: 'black pepper', previousIngredientId: 9 },
//         { id: 11, amount: 2, unit: 'tbsp', name: 'chickpea flour (or other flour)', previousIngredientId: 10 },
//         { id: 12, amount: 0.5, unit: 'ts', name: ' baking soda', previousIngredientId: 11 },
//         { id: 13, name: 'oil for frying', previousIngredientId: 12 }
//       ]
//     }
//   ],
//   instructionGroups: [
//     {
//       id: 1,
//       title: null,
//       instructions: [
//         {
//           id: 1,
//           content:
//             "The night before, soak the dried chickpeas in water. Make sure the water covers the chickpeas by 2 to 3 inches, as they'll triple in size.",
//           previousInstructionId: null,
//           ingredientReferenceIds: [1]
//         },
//         {
//           id: 2,
//           content:
//             'Drain and rinse the chickpeas and add them to your food processor, along with the onion, parsley, cilantro, pepper, garlic, cumin, salt, cardamom and black pepper.',
//           previousInstructionId: 1,
//           ingredientReferenceIds: [1, , 2, 3, 4, 5, 6, 7, 8, 9, 10]
//         },
//         {
//           id: 3,
//           content: 'Pulse the food processor several times until the mixture resembles the texture of coarse sand.',
//           previousInstructionId: 2,
//           ingredientReferenceIds: []
//         },
//         {
//           id: 4,
//           content:
//             'Transfer the falafel mixture to a bowl and add the chickpea flour and baking soda. Stir together, then cover or add a lid and refrigerate the mixture for 30 minutes to one hour.',
//           previousInstructionId: 3,
//           ingredientReferenceIds: [11, 12]
//         },
//         {
//           id: 5,
//           content:
//             "Use your hands, an ice cream scoop or falafel scoop to form the falafel into balls or patties. If you find the mixture is too wet, you can add another tablespoon of chickpea flour. If it's too dry and crumbly, you can add a teaspoon or two of water or lemon juice.",
//           previousInstructionId: 4,
//           ingredientReferenceIds: []
//         },
//         {
//           id: 6,
//           content:
//             'Once the falafel are formed, you can cook them by your preferred method mentioned above. To deep fry the falafel, add about 3 inches of oil to a pot on medium heat. Heat the oil to 350°F (175°C). Cook the falafel in batches (about 6 to 8 at a time) for 1 to 2 minutes or until golden.',
//           previousInstructionId: 5,
//           ingredientReferenceIds: [13]
//         },
//         {
//           id: 7,
//           content:
//             "Use a skimmer to check the color of the falafel and make sure they don't over cook. Then remove them to a paper towel-lined plate.",
//           previousInstructionId: 6,
//           ingredientReferenceIds: []
//         },
//         {
//           id: 8,
//           content:
//             "Serve the falafel immediately, while warm and crispy on the outside. They're delicious served with tahini sauce as well.",
//           previousInstructionId: 7,
//           ingredientReferenceIds: []
//         }
//       ]
//     }
//   ]
// }

// const devRecipe13 = {
//   id: 13,
//   title: 'BLUEBERRY RECIPE TEST',
//   description: 'The best!',
//   mainImageUrl: 'falafel-image-url',
//   extraImageUrls: [],
//   tags: ['vegan', 'chickpea'],
//   isFavorite: true,
//   category: Category.DINNER,
//   ovenNeeded: false,
//   ingredientGroups: [
//     {
//       id: 101,
//       title: null,
//       ingredients: [
//         {
//           id: 200,
//           amount: 1,
//           unit: 'cup',
//           name: 'raspberry',
//           previousIngredientId: null
//         },
//         { id: 201, amount: 0.5, unit: 'cup', name: 'blueberry', previousIngredientId: 1 }
//       ]
//     }
//   ],
//   instructionGroups: [
//     {
//       id: 300,
//       title: null,
//       instructions: [
//         {
//           id: 400,
//           content:
//             "The night before, soak the dried chickpeas in water. Make sure the water covers the chickpeas by 2 to 3 inches, as they'll triple in size.",
//           previousInstructionId: null,
//           ingredientReferenceIds: [200]
//         }
//       ]
//     }
//   ]
// }
