import type { FindRecipeById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Recipe from 'src/components/Recipe/Recipe';

export const QUERY = gql`
  query FindRecipeById($id: Int!) {
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
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Recipe not found</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ recipe }: CellSuccessProps<FindRecipeById>) => {
  return <Recipe recipe={recipe} />;
};
