import type { EditShoppingListById, UpdateShoppingListInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ShoppingListForm from 'src/components/ShoppingList/ShoppingListForm';

export const QUERY = gql`
  query EditShoppingListById($id: Int!) {
    shoppingList: shoppingList(id: $id) {
      id
      name
    }
  }
`;
const UPDATE_SHOPPING_LIST_MUTATION = gql`
  mutation UpdateShoppingListMutation($id: Int!, $input: UpdateShoppingListInput!) {
    updateShoppingList(id: $id, input: $input) {
      id
      name
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ shoppingList }: CellSuccessProps<EditShoppingListById>) => {
  const [updateShoppingList, { loading, error }] = useMutation(UPDATE_SHOPPING_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('ShoppingList updated');
      navigate(routes.shoppingLists());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateShoppingListInput, id: EditShoppingListById['shoppingList']['id']) => {
    updateShoppingList({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit ShoppingList {shoppingList?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ShoppingListForm shoppingList={shoppingList} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
