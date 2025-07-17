import type { EditRecipeById, UpdateRecipeInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import RecipeForm from 'src/components/Recipe/RecipeForm';

export const QUERY = gql`
  query EditRecipeById($id: Int!) {
    recipe: recipe(id: $id) {
      id
      name
      description
      tags
      thumbnailUrl
      imageUrls
      imageHandles
      preparationSteps
      RecipeIngredient {
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
  }
`;

const UPDATE_RECIPE_MUTATION = gql`
  mutation UpdateRecipeMutation($id: Int!, $input: UpdateRecipeInput!) {
    updateRecipe(id: $id, input: $input) {
      id
      name
      description
      tags
      thumbnailUrl
      imageUrls
      imageHandles
      preparationSteps
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

const UPDATE_RECIPE_INGREDIENT_MUTATION = gql`
  mutation UpdateRecipeIngredientMutation($id: Int!, $input: UpdateRecipeIngredientInput!) {
    updateRecipeIngredient(id: $id, input: $input) {
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

const DELETE_RECIPE_INGREDIENT_MUTATION = gql`
  mutation DeleteRecipeIngredientMutation($id: Int!) {
    deleteRecipeIngredient(id: $id) {
      id
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

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ recipe }: CellSuccessProps<EditRecipeById>) => {
  const [updateRecipe, { loading, error }] = useMutation(UPDATE_RECIPE_MUTATION, {
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [createRecipeIngredient] = useMutation(CREATE_RECIPE_INGREDIENT_MUTATION);
  const [updateRecipeIngredient] = useMutation(UPDATE_RECIPE_INGREDIENT_MUTATION);
  const [deleteRecipeIngredient] = useMutation(DELETE_RECIPE_INGREDIENT_MUTATION);

  const onSave = async (
    input: UpdateRecipeInput,
    id: EditRecipeById['recipe']['id'],
    ingredients: RecipeIngredient[] = []
  ) => {
    try {
      // Update the recipe first
      await updateRecipe({ variables: { id, input } });

      // Get current recipe ingredients
      const currentIngredients = recipe?.RecipeIngredient || [];

      // Delete ingredients that are no longer in the list
      const ingredientsToDelete = currentIngredients.filter(
        (current) => !ingredients.some((ing) => ing.id === current.id)
      );

      for (const ingredient of ingredientsToDelete) {
        await deleteRecipeIngredient({ variables: { id: ingredient.id } });
      }

      // Process ingredients (create new ones or update existing)
      for (const ingredient of ingredients) {
        if (ingredient.id) {
          // Update existing ingredient
          await updateRecipeIngredient({
            variables: {
              id: ingredient.id,
              input: {
                amount: ingredient.amount,
                unit: ingredient.unit,
                ingredientId: ingredient.ingredient.id,
              },
            },
          });
        } else {
          // Create new ingredient
          await createRecipeIngredient({
            variables: {
              input: {
                amount: ingredient.amount,
                unit: ingredient.unit,
                recipeId: id,
                ingredientId: ingredient.ingredient.id,
              },
            },
          });
        }
      }

      toast.success('Recipe updated');
      navigate(routes.recipes());
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast.error('Error saving recipe');
    }
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Recipe {recipe?.name}</h2>
      </header>
      <div className="rw-segment-main">
        <RecipeForm recipe={recipe} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
