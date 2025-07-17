import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ingredients = [
  // Flour and grains
  { name: 'All-Purpose Flour', standardUnit: 'grams', category: 'grain', calories: 3.64, protein: 0.10, carbs: 0.76, fat: 0.01, saturatedFat: 0.00, fiber: 0.027, sugar: 0.003, sodium: 0.002 },
  { name: 'Whole Wheat Flour', standardUnit: 'grams', category: 'grain', calories: 3.40, protein: 0.136, carbs: 0.722, fat: 0.022, saturatedFat: 0.004, fiber: 0.123, sugar: 0.004, sodium: 0.005 },
  { name: 'Brown Rice', standardUnit: 'grams', category: 'grain', calories: 3.62, protein: 0.073, carbs: 0.73, fat: 0.027, saturatedFat: 0.005, fiber: 0.039, sugar: 0.007, sodium: 0.001 },
  { name: 'White Rice', standardUnit: 'grams', category: 'grain', calories: 3.65, protein: 0.067, carbs: 0.80, fat: 0.007, saturatedFat: 0.002, fiber: 0.013, sugar: 0.001, sodium: 0.001 },
  { name: 'Quinoa', standardUnit: 'grams', category: 'grain', calories: 3.68, protein: 0.146, carbs: 0.643, fat: 0.062, saturatedFat: 0.007, fiber: 0.07, sugar: 0.007, sodium: 0.005 },
  { name: 'Oats', standardUnit: 'grams', category: 'grain', calories: 3.89, protein: 0.169, carbs: 0.664, fat: 0.069, saturatedFat: 0.012, fiber: 0.105, sugar: 0.01, sodium: 0.002 },

  // Proteins
  { name: 'Chicken Breast', standardUnit: 'grams', category: 'protein', calories: 1.65, protein: 0.31, carbs: 0, fat: 0.036, saturatedFat: 0.01, fiber: 0, sugar: 0, sodium: 0.74 },
  { name: 'Ground Beef', standardUnit: 'grams', category: 'protein', calories: 2.32, protein: 0.26, carbs: 0, fat: 0.15, saturatedFat: 0.06, fiber: 0, sugar: 0, sodium: 0.78 },
  { name: 'Salmon', standardUnit: 'grams', category: 'protein', calories: 2.08, protein: 0.25, carbs: 0, fat: 0.12, saturatedFat: 0.03, fiber: 0, sugar: 0, sodium: 0.58 },
  { name: 'Eggs', standardUnit: 'pieces', category: 'protein', calories: 155, protein: 12.6, carbs: 1.1, fat: 10.6, saturatedFat: 3.1, fiber: 0, sugar: 1.1, sodium: 124 },
  { name: 'Tofu', standardUnit: 'grams', category: 'protein', calories: 0.76, protein: 0.08, carbs: 0.019, fat: 0.048, saturatedFat: 0.007, fiber: 0.01, sugar: 0.006, sodium: 0.007 },
  { name: 'Black Beans', standardUnit: 'grams', category: 'protein', calories: 3.41, protein: 0.216, carbs: 0.623, fat: 0.014, saturatedFat: 0.004, fiber: 0.151, sugar: 0.003, sodium: 0.012 },

  // Dairy
  { name: 'Milk', standardUnit: 'ml', category: 'dairy', calories: 0.42, protein: 0.034, carbs: 0.05, fat: 0.01, saturatedFat: 0.006, fiber: 0, sugar: 0.05, sodium: 0.04 },
  { name: 'Greek Yogurt', standardUnit: 'grams', category: 'dairy', calories: 0.59, protein: 0.10, carbs: 0.036, fat: 0.004, saturatedFat: 0.001, fiber: 0, sugar: 0.036, sodium: 0.036 },
  { name: 'Cheddar Cheese', standardUnit: 'grams', category: 'dairy', calories: 4.02, protein: 0.249, carbs: 0.013, fat: 0.333, saturatedFat: 0.211, fiber: 0, sugar: 0.005, sodium: 0.621 },
  { name: 'Mozzarella Cheese', standardUnit: 'grams', category: 'dairy', calories: 2.80, protein: 0.222, carbs: 0.022, fat: 0.222, saturatedFat: 0.133, fiber: 0, sugar: 0.01, sodium: 0.486 },
  { name: 'Butter', standardUnit: 'grams', category: 'dairy', calories: 7.17, protein: 0.009, carbs: 0.006, fat: 0.811, saturatedFat: 0.512, fiber: 0, sugar: 0.006, sodium: 0.011 },

  // Vegetables
  { name: 'Onion', standardUnit: 'grams', category: 'vegetable', calories: 0.40, protein: 0.011, carbs: 0.093, fat: 0.001, saturatedFat: 0.000, fiber: 0.017, sugar: 0.042, sodium: 0.004 },
  { name: 'Garlic', standardUnit: 'grams', category: 'vegetable', calories: 1.49, protein: 0.064, carbs: 0.331, fat: 0.005, saturatedFat: 0.001, fiber: 0.021, sugar: 0.01, sodium: 0.017 },
  { name: 'Tomato', standardUnit: 'grams', category: 'vegetable', calories: 0.18, protein: 0.009, carbs: 0.039, fat: 0.002, saturatedFat: 0.000, fiber: 0.012, sugar: 0.026, sodium: 0.005 },
  { name: 'Bell Pepper', standardUnit: 'grams', category: 'vegetable', calories: 0.31, protein: 0.010, carbs: 0.073, fat: 0.003, saturatedFat: 0.001, fiber: 0.025, sugar: 0.049, sodium: 0.004 },
  { name: 'Carrot', standardUnit: 'grams', category: 'vegetable', calories: 0.41, protein: 0.009, carbs: 0.096, fat: 0.002, saturatedFat: 0.000, fiber: 0.028, sugar: 0.047, sodium: 0.069 },
  { name: 'Broccoli', standardUnit: 'grams', category: 'vegetable', calories: 0.34, protein: 0.028, carbs: 0.069, fat: 0.004, saturatedFat: 0.001, fiber: 0.026, sugar: 0.015, sodium: 0.033 },
  { name: 'Spinach', standardUnit: 'grams', category: 'vegetable', calories: 0.23, protein: 0.029, carbs: 0.036, fat: 0.004, saturatedFat: 0.001, fiber: 0.022, sugar: 0.004, sodium: 0.079 },

  // Fruits
  { name: 'Apple', standardUnit: 'grams', category: 'fruit', calories: 0.52, protein: 0.003, carbs: 0.138, fat: 0.002, saturatedFat: 0.000, fiber: 0.024, sugar: 0.104, sodium: 0.001 },
  { name: 'Banana', standardUnit: 'grams', category: 'fruit', calories: 0.89, protein: 0.011, carbs: 0.229, fat: 0.003, saturatedFat: 0.001, fiber: 0.026, sugar: 0.122, sodium: 0.001 },
  { name: 'Orange', standardUnit: 'grams', category: 'fruit', calories: 0.47, protein: 0.009, carbs: 0.118, fat: 0.001, saturatedFat: 0.000, fiber: 0.024, sugar: 0.094, sodium: 0.000 },
  { name: 'Lemon', standardUnit: 'grams', category: 'fruit', calories: 0.29, protein: 0.011, carbs: 0.092, fat: 0.003, saturatedFat: 0.000, fiber: 0.047, sugar: 0.015, sodium: 0.002 },
  { name: 'Strawberry', standardUnit: 'grams', category: 'fruit', calories: 0.32, protein: 0.007, carbs: 0.077, fat: 0.003, saturatedFat: 0.000, fiber: 0.020, sugar: 0.049, sodium: 0.001 },

  // Spices and seasonings
  { name: 'Salt', standardUnit: 'grams', category: 'spice', calories: 0, protein: 0, carbs: 0, fat: 0, saturatedFat: 0, fiber: 0, sugar: 0, sodium: 38.758 },
  { name: 'Black Pepper', standardUnit: 'grams', category: 'spice', calories: 2.51, protein: 0.105, carbs: 0.641, fat: 0.033, saturatedFat: 0.013, fiber: 0.259, sugar: 0.004, sodium: 0.02 },
  { name: 'Olive Oil', standardUnit: 'ml', category: 'oil', calories: 8.84, protein: 0, carbs: 0, fat: 1.0, saturatedFat: 0.138, fiber: 0, sugar: 0, sodium: 0.002 },
  { name: 'Vegetable Oil', standardUnit: 'ml', category: 'oil', calories: 8.84, protein: 0, carbs: 0, fat: 1.0, saturatedFat: 0.128, fiber: 0, sugar: 0, sodium: 0 },
  { name: 'Honey', standardUnit: 'grams', category: 'sweetener', calories: 3.04, protein: 0.003, carbs: 0.824, fat: 0, saturatedFat: 0, fiber: 0.002, sugar: 0.824, sodium: 0.004 },
  { name: 'Sugar', standardUnit: 'grams', category: 'sweetener', calories: 3.87, protein: 0, carbs: 1.0, fat: 0, saturatedFat: 0, fiber: 0, sugar: 1.0, sodium: 0 },

  // Nuts and seeds
  { name: 'Almonds', standardUnit: 'grams', category: 'nuts', calories: 5.79, protein: 0.211, carbs: 0.218, fat: 0.497, saturatedFat: 0.038, fiber: 0.125, sugar: 0.042, sodium: 0.001 },
  { name: 'Walnuts', standardUnit: 'grams', category: 'nuts', calories: 6.54, protein: 0.152, carbs: 0.137, fat: 0.654, saturatedFat: 0.062, fiber: 0.067, sugar: 0.026, sodium: 0.002 },
  { name: 'Chia Seeds', standardUnit: 'grams', category: 'seeds', calories: 4.86, protein: 0.166, carbs: 0.420, fat: 0.309, saturatedFat: 0.033, fiber: 0.344, sugar: 0.001, sodium: 0.016 },
]

export default async function seedRecipes() {
  try {
    console.log('Seeding ingredients and nutrition data...')

    // Create ingredients with their nutrition data
    for (const ingredient of ingredients) {
      const existingIngredient = await prisma.ingredient.findUnique({
        where: { name: ingredient.name }
      })

      if (!existingIngredient) {
        await prisma.ingredient.create({
          data: {
            name: ingredient.name,
            standardUnit: ingredient.standardUnit,
            category: ingredient.category,
            NutritionData: {
              create: {
                calories: ingredient.calories,
                protein: ingredient.protein,
                carbohydrates: ingredient.carbs,
                fat: ingredient.fat,
                saturatedFat: ingredient.saturatedFat,
                fiber: ingredient.fiber,
                sugar: ingredient.sugar,
                sodium: ingredient.sodium,
              }
            }
          }
        })
        console.log(`Created ingredient: ${ingredient.name}`)
      } else {
        console.log(`Ingredient already exists: ${ingredient.name}`)
      }
    }

    console.log('Ingredients seeded successfully!')
  } catch (error) {
    console.error('Error seeding ingredients:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedRecipes()
} 