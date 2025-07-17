import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const recipes: QueryResolvers['recipes'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.recipe.findMany({
    where: { userId },
    include: {
      RecipeIngredient: {
        include: {
          Ingredient: {
            include: {
              NutritionData: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const recipe: QueryResolvers['recipe'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.recipe.findFirst({
    where: { id, userId },
    include: {
      RecipeIngredient: {
        include: {
          Ingredient: {
            include: {
              NutritionData: true,
            },
          },
        },
      },
    },
  });
};

export const createRecipe: MutationResolvers['createRecipe'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.recipe.create({
    data: { ...input, userId },
    include: {
      RecipeIngredient: {
        include: {
          Ingredient: {
            include: {
              NutritionData: true,
            },
          },
        },
      },
    },
  });
};

export const updateRecipe: MutationResolvers['updateRecipe'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.recipe.findFirstOrThrow({ where: { userId, id } });

  return db.recipe.update({
    data: input,
    where: { id },
    include: {
      RecipeIngredient: {
        include: {
          Ingredient: {
            include: {
              NutritionData: true,
            },
          },
        },
      },
    },
  });
};

export const deleteRecipe: MutationResolvers['deleteRecipe'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.recipe.findFirstOrThrow({ where: { userId, id } });

  return db.recipe.delete({
    where: { id },
    include: {
      RecipeIngredient: {
        include: {
          Ingredient: {
            include: {
              NutritionData: true,
            },
          },
        },
      },
    },
  });
};

export const ingredients: QueryResolvers['ingredients'] = () => {
  return db.ingredient.findMany({
    include: {
      NutritionData: true,
    },
    orderBy: { name: 'asc' },
  });
};

export const ingredient: QueryResolvers['ingredient'] = ({ id }) => {
  return db.ingredient.findUnique({
    where: { id },
    include: {
      NutritionData: true,
      RecipeIngredient: true,
    },
  });
};

export const searchIngredients: QueryResolvers['searchIngredients'] = ({ query }) => {
  return db.ingredient.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    include: {
      NutritionData: true,
    },
    orderBy: { name: 'asc' },
    take: 10,
  });
};

export const recipeNutrition: QueryResolvers['recipeNutrition'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  
  const recipe = await db.recipe.findFirst({
    where: { id, userId },
    include: {
      RecipeIngredient: {
        include: {
          Ingredient: {
            include: {
              NutritionData: true,
            },
          },
        },
      },
    },
  });

  if (!recipe) {
    throw new Error('Recipe not found');
  }

  // Calculate nutritional totals
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbohydrates = 0;
  let totalFat = 0;
  let totalSaturatedFat = 0;
  let totalFiber = 0;
  let totalSugar = 0;
  let totalSodium = 0;

  recipe.RecipeIngredient.forEach((recipeIngredient) => {
    const nutrition = recipeIngredient.Ingredient.NutritionData;
    if (nutrition) {
      // Convert amount to standard unit if needed
      const amount = recipeIngredient.amount;
      const unitFactor = getUnitConversionFactor(
        recipeIngredient.unit,
        recipeIngredient.Ingredient.standardUnit
      );
      const standardAmount = amount * unitFactor;

      totalCalories += nutrition.calories * standardAmount;
      totalProtein += nutrition.protein * standardAmount;
      totalCarbohydrates += nutrition.carbohydrates * standardAmount;
      totalFat += nutrition.fat * standardAmount;
      totalSaturatedFat += nutrition.saturatedFat * standardAmount;
      totalFiber += (nutrition.fiber || 0) * standardAmount;
      totalSugar += (nutrition.sugar || 0) * standardAmount;
      totalSodium += (nutrition.sodium || 0) * standardAmount;
    }
  });

  return {
    totalCalories: Math.round(totalCalories * 100) / 100,
    totalProtein: Math.round(totalProtein * 100) / 100,
    totalCarbohydrates: Math.round(totalCarbohydrates * 100) / 100,
    totalFat: Math.round(totalFat * 100) / 100,
    totalSaturatedFat: Math.round(totalSaturatedFat * 100) / 100,
    totalFiber: Math.round(totalFiber * 100) / 100,
    totalSugar: Math.round(totalSugar * 100) / 100,
    totalSodium: Math.round(totalSodium * 100) / 100,
  };
};

export const createIngredient: MutationResolvers['createIngredient'] = ({ input }) => {
  return db.ingredient.create({
    data: input,
    include: {
      NutritionData: true,
    },
  });
};

export const updateIngredient: MutationResolvers['updateIngredient'] = ({ id, input }) => {
  return db.ingredient.update({
    data: input,
    where: { id },
    include: {
      NutritionData: true,
    },
  });
};

export const deleteIngredient: MutationResolvers['deleteIngredient'] = ({ id }) => {
  return db.ingredient.delete({
    where: { id },
    include: {
      NutritionData: true,
    },
  });
};

export const createRecipeIngredient: MutationResolvers['createRecipeIngredient'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];
  
  return db.recipeIngredient.create({
    data: input,
    include: {
      Recipe: true,
      Ingredient: {
        include: {
          NutritionData: true,
        },
      },
    },
  });
};

export const updateRecipeIngredient: MutationResolvers['updateRecipeIngredient'] = ({ id, input }) => {
  return db.recipeIngredient.update({
    data: input,
    where: { id },
    include: {
      Recipe: true,
      Ingredient: {
        include: {
          NutritionData: true,
        },
      },
    },
  });
};

export const deleteRecipeIngredient: MutationResolvers['deleteRecipeIngredient'] = ({ id }) => {
  return db.recipeIngredient.delete({
    where: { id },
    include: {
      Recipe: true,
      Ingredient: {
        include: {
          NutritionData: true,
        },
      },
    },
  });
};

export const createNutritionData: MutationResolvers['createNutritionData'] = ({ input }) => {
  return db.nutritionData.create({
    data: input,
    include: {
      Ingredient: true,
    },
  });
};

export const updateNutritionData: MutationResolvers['updateNutritionData'] = ({ id, input }) => {
  return db.nutritionData.update({
    data: input,
    where: { id },
    include: {
      Ingredient: true,
    },
  });
};

export const deleteNutritionData: MutationResolvers['deleteNutritionData'] = ({ id }) => {
  return db.nutritionData.delete({
    where: { id },
    include: {
      Ingredient: true,
    },
  });
};

// Helper function to convert units
function getUnitConversionFactor(fromUnit: string, toUnit: string): number {
  // Simple conversion factors - this should be expanded for a production app
  const conversions: { [key: string]: { [key: string]: number } } = {
    // Weight conversions
    'grams': { 'kg': 0.001, 'oz': 0.035274, 'lb': 0.00220462, 'grams': 1 },
    'kg': { 'grams': 1000, 'oz': 35.274, 'lb': 2.20462, 'kg': 1 },
    'oz': { 'grams': 28.3495, 'kg': 0.0283495, 'lb': 0.0625, 'oz': 1 },
    'lb': { 'grams': 453.592, 'kg': 0.453592, 'oz': 16, 'lb': 1 },
    
    // Volume conversions
    'ml': { 'l': 0.001, 'cups': 0.00422675, 'tbsp': 0.0676281, 'tsp': 0.202884, 'ml': 1 },
    'l': { 'ml': 1000, 'cups': 4.22675, 'tbsp': 67.628, 'tsp': 202.884, 'l': 1 },
    'cups': { 'ml': 236.588, 'l': 0.236588, 'tbsp': 16, 'tsp': 48, 'cups': 1 },
    'tbsp': { 'ml': 14.7868, 'l': 0.0147868, 'cups': 0.0625, 'tsp': 3, 'tbsp': 1 },
    'tsp': { 'ml': 4.92892, 'l': 0.00492892, 'cups': 0.0208333, 'tbsp': 0.333333, 'tsp': 1 },
    
    // Count conversions
    'pieces': { 'pieces': 1, 'dozen': 0.0833333 },
    'dozen': { 'pieces': 12, 'dozen': 1 },
  };

  if (fromUnit === toUnit) {
    return 1;
  }

  if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
    return conversions[fromUnit][toUnit];
  }

  // If no conversion found, assume 1:1 ratio
  return 1;
} 