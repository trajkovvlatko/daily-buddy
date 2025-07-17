-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT[],
    "thumbnailUrl" TEXT,
    "imageUrls" TEXT[],
    "imageHandles" TEXT[],
    "preparationSteps" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "standardUnit" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionData" (
    "id" SERIAL NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbohydrates" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "saturatedFat" DOUBLE PRECISION NOT NULL,
    "fiber" DOUBLE PRECISION,
    "sugar" DOUBLE PRECISION,
    "sodium" DOUBLE PRECISION,
    "ingredientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NutritionData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "recipe_user" ON "Recipe"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE INDEX "ingredient_name" ON "Ingredient"("name");

-- CreateIndex
CREATE INDEX "recipe_ingredient_recipe" ON "RecipeIngredient"("recipeId");

-- CreateIndex
CREATE INDEX "recipe_ingredient_ingredient" ON "RecipeIngredient"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "NutritionData_ingredientId_key" ON "NutritionData"("ingredientId");

-- CreateIndex
CREATE INDEX "nutrition_data_ingredient" ON "NutritionData"("ingredientId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionData" ADD CONSTRAINT "NutritionData_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
