import type { FindShoppingListById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import ShoppingList from 'src/components/ShoppingList/ShoppingList';

export const QUERY = gql`
  query FindShoppingListById($id: Int!) {
    shoppingList: shoppingList(id: $id) {
      id
      name
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>ShoppingList not found</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ shoppingList }: CellSuccessProps<FindShoppingListById>) => {
  return <ShoppingList shoppingList={shoppingList} />;
};
