import type { FindRecipeById } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';

import Editor from 'src/components/Editor';
import { marked } from 'marked';

const RECIPE_NUTRITION_QUERY = gql`
  query RecipeNutrition($id: Int!) {
    recipeNutrition(id: $id) {
      totalCalories
      totalProtein
      totalCarbohydrates
      totalFat
      totalSaturatedFat
      totalFiber
      totalSugar
      totalSodium
    }
  }
`;

interface Props {
  recipe: NonNullable<FindRecipeById['recipe']>;
}

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  const link = marked.Renderer.prototype.link.call(this, href, title, text);
  return link.replace('<a', "<a target='_blank' rel='noopener noreferrer' ");
};

marked.setOptions({
  breaks: true,
  renderer,
});

const Recipe = ({ recipe }: Props) => {
  const { data: nutritionData } = useQuery(RECIPE_NUTRITION_QUERY, {
    variables: { id: recipe.id },
  });

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Recipe {recipe.id} Detail</h2>
      </header>
      <div className="rw-segment-main">
        <div className="max-w-4xl mx-auto">
          {/* Recipe Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>

            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Thumbnail */}
            {recipe.thumbnailUrl && (
              <div className="mb-4">
                <img
                  src={recipe.thumbnailUrl}
                  alt={recipe.name}
                  className="w-full max-w-lg h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Description */}
            {recipe.description && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: marked.parse(recipe.description) }} />
                </div>
              </div>
            )}
          </div>

          {/* Recipe Images */}
          {recipe.imageUrls && recipe.imageUrls.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {recipe.imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Recipe image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ingredients Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
              {recipe.RecipeIngredient && recipe.RecipeIngredient.length > 0 ? (
                <div className="space-y-3">
                  {recipe.RecipeIngredient.map((recipeIngredient, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium">{recipeIngredient.Ingredient.name}</span>
                      <span className="text-gray-600">
                        {recipeIngredient.amount} {recipeIngredient.unit}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No ingredients added yet.</p>
              )}
            </div>

            {/* Nutritional Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Nutritional Information</h3>
              {nutritionData?.recipeNutrition ? (
                <div className="space-y-3">
                  <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium">Calories</span>
                    <span>{nutritionData.recipeNutrition.totalCalories.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium">Protein</span>
                    <span>{nutritionData.recipeNutrition.totalProtein.toFixed(1)}g</span>
                  </div>
                  <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium">Carbohydrates</span>
                    <span>{nutritionData.recipeNutrition.totalCarbohydrates.toFixed(1)}g</span>
                  </div>
                  <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium">Fat</span>
                    <span>{nutritionData.recipeNutrition.totalFat.toFixed(1)}g</span>
                  </div>
                  <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium">Saturated Fat</span>
                    <span>{nutritionData.recipeNutrition.totalSaturatedFat.toFixed(1)}g</span>
                  </div>
                  <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium">Fiber</span>
                    <span>{nutritionData.recipeNutrition.totalFiber.toFixed(1)}g</span>
                  </div>
                  <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium">Sugar</span>
                    <span>{nutritionData.recipeNutrition.totalSugar.toFixed(1)}g</span>
                  </div>
                  <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium">Sodium</span>
                    <span>{nutritionData.recipeNutrition.totalSodium.toFixed(1)}mg</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Nutritional information not available.</p>
              )}
            </div>
          </div>

          {/* Preparation Steps */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Preparation Steps</h3>
            {recipe.preparationSteps ? (
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: marked.parse(recipe.preparationSteps) }} />
              </div>
            ) : (
              <p className="text-gray-500">No preparation steps added yet.</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <Link to={routes.editRecipe({ id: recipe.id })} className="rw-button rw-button-blue">
              Edit
            </Link>
            <Link to={routes.recipes()} className="rw-button rw-button-gray">
              Back to Recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
