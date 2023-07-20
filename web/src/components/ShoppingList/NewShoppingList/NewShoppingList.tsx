import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ShoppingListForm from 'src/components/ShoppingList/ShoppingListForm';

import type { CreateShoppingListInput } from 'types/graphql';

const CREATE_SHOPPING_LIST_MUTATION = gql`
  mutation CreateShoppingListMutation($input: CreateShoppingListInput!) {
    createShoppingList(input: $input) {
      id
    }
  }
`;

const NewShoppingList = () => {
  const [createShoppingList, { loading, error }] = useMutation(CREATE_SHOPPING_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('ShoppingList created');
      navigate(routes.shoppingLists());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateShoppingListInput) => {
    createShoppingList({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ShoppingList</h2>
      </header>
      <div className="rw-segment-main">
        <ShoppingListForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewShoppingList;
