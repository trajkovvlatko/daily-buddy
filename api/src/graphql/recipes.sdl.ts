export const schema = gql`
  type Recipe {
    id: Int!
    name: String!
    description: String
    tags: [String]!
    thumbnailUrl: String
    imageUrls: [String]!
    imageHandles: [String]!
    preparationSteps: String!
    RecipeIngredient: [RecipeIngredient]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Ingredient {
    id: Int!
    name: String!
    standardUnit: String!
    category: String
    NutritionData: NutritionData
    RecipeIngredient: [RecipeIngredient]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type RecipeIngredient {
    id: Int!
    amount: Float!
    unit: String!
    Recipe: Recipe!
    recipeId: Int!
    Ingredient: Ingredient!
    ingredientId: Int!
  }

  type NutritionData {
    id: Int!
    calories: Float!
    protein: Float!
    carbohydrates: Float!
    fat: Float!
    saturatedFat: Float!
    fiber: Float
    sugar: Float
    sodium: Float
    Ingredient: Ingredient!
    ingredientId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type NutritionSummary {
    totalCalories: Float!
    totalProtein: Float!
    totalCarbohydrates: Float!
    totalFat: Float!
    totalSaturatedFat: Float!
    totalFiber: Float!
    totalSugar: Float!
    totalSodium: Float!
  }

  type Query {
    recipes: [Recipe!]! @requireAuth
    recipe(id: Int!): Recipe @requireAuth
    ingredients: [Ingredient!]! @requireAuth
    ingredient(id: Int!): Ingredient @requireAuth
    searchIngredients(query: String!): [Ingredient!]! @requireAuth
    recipeNutrition(id: Int!): NutritionSummary @requireAuth
  }

  input CreateRecipeInput {
    name: String!
    description: String
    tags: [String]!
    thumbnailUrl: String
    imageUrls: [String]!
    imageHandles: [String]!
    preparationSteps: String!
  }

  input UpdateRecipeInput {
    name: String
    description: String
    tags: [String]
    thumbnailUrl: String
    imageUrls: [String]
    imageHandles: [String]
    preparationSteps: String
  }

  input CreateIngredientInput {
    name: String!
    standardUnit: String!
    category: String
  }

  input UpdateIngredientInput {
    name: String
    standardUnit: String
    category: String
  }

  input CreateRecipeIngredientInput {
    amount: Float!
    unit: String!
    recipeId: Int!
    ingredientId: Int!
  }

  input UpdateRecipeIngredientInput {
    amount: Float
    unit: String
    ingredientId: Int
  }

  input CreateNutritionDataInput {
    calories: Float!
    protein: Float!
    carbohydrates: Float!
    fat: Float!
    saturatedFat: Float!
    fiber: Float
    sugar: Float
    sodium: Float
    ingredientId: Int!
  }

  input UpdateNutritionDataInput {
    calories: Float
    protein: Float
    carbohydrates: Float
    fat: Float
    saturatedFat: Float
    fiber: Float
    sugar: Float
    sodium: Float
  }

  type Mutation {
    createRecipe(input: CreateRecipeInput!): Recipe! @requireAuth
    updateRecipe(id: Int!, input: UpdateRecipeInput!): Recipe! @requireAuth
    deleteRecipe(id: Int!): Recipe! @requireAuth
    
    createIngredient(input: CreateIngredientInput!): Ingredient! @requireAuth
    updateIngredient(id: Int!, input: UpdateIngredientInput!): Ingredient! @requireAuth
    deleteIngredient(id: Int!): Ingredient! @requireAuth
    
    createRecipeIngredient(input: CreateRecipeIngredientInput!): RecipeIngredient! @requireAuth
    updateRecipeIngredient(id: Int!, input: UpdateRecipeIngredientInput!): RecipeIngredient! @requireAuth
    deleteRecipeIngredient(id: Int!): RecipeIngredient! @requireAuth
    
    createNutritionData(input: CreateNutritionDataInput!): NutritionData! @requireAuth
    updateNutritionData(id: Int!, input: UpdateNutritionDataInput!): NutritionData! @requireAuth
    deleteNutritionData(id: Int!): NutritionData! @requireAuth
  }
`; 