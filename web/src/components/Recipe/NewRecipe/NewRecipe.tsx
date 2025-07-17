import type { CreateRecipeInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import RecipeForm from 'src/components/Recipe/RecipeForm';

const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipeMutation($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      id
      name
    }
  }
`;

const CREATE_RECIPE_INGREDIENT_MUTATION = gql`
  mutation CreateRecipeIngredientMutation($input: CreateRecipeIngredientInput!) {
    createRecipeIngredient(input: $input) {
      id
      amount
      unit
      Ingredient {
        id
        name
        standardUnit
      }
    }
  }
`;

interface RecipeIngredient {
  id?: number;
  amount: number;
  unit: string;
  ingredient: {
    id: number;
    name: string;
    standardUnit: string;
  };
}

const NewRecipe = () => {
  const [createRecipe, { loading, error }] = useMutation(CREATE_RECIPE_MUTATION, {
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [createRecipeIngredient] = useMutation(CREATE_RECIPE_INGREDIENT_MUTATION);

  const onSave = async (input: CreateRecipeInput, id?: number, ingredients: RecipeIngredient[] = []) => {
    try {
      // Create the recipe first
      const result = await createRecipe({ variables: { input } });
      const recipeId = result.data?.createRecipe.id;

      if (recipeId) {
        // Create all the recipe ingredients
        for (const ingredient of ingredients) {
          await createRecipeIngredient({
            variables: {
              input: {
                amount: ingredient.amount,
                unit: ingredient.unit,
                recipeId: recipeId,
                ingredientId: ingredient.ingredient.id,
              },
            },
          });
        }
      }

      toast.success('Recipe created');
      navigate(routes.recipes());
    } catch (error) {
      console.error('Error creating recipe:', error);
      toast.error('Error creating recipe');
    }
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Recipe</h2>
      </header>
      <div className="rw-segment-main">
        <RecipeForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewRecipe;
