import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import ShoppingListItem from 'src/components/ShoppingListItem/ShoppingListItem/ShoppingListItem';

import { } from 'src/lib/formatters';

import type { DeleteShoppingListMutationVariables, FindShoppingListById } from 'types/graphql';

const DELETE_SHOPPING_LIST_MUTATION = gql`
  mutation DeleteShoppingListMutation($id: Int!) {
    deleteShoppingList(id: $id) {
      id
    }
  }
`;

interface Props {
  shoppingList: NonNullable<FindShoppingListById['shoppingList']>;
}

const ShoppingList = ({ shoppingList }: Props) => {
  const [deleteShoppingList] = useMutation(DELETE_SHOPPING_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('ShoppingList deleted');
      navigate(routes.shoppingLists());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteShoppingListMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete shoppingList ' + id + '?')) {
      deleteShoppingList({ variables: { id } });
    }
  };

  return (
    <>
      <h1 className="mb-10 text-lg font-semibold">{shoppingList.name}</h1>
      <div>
        {shoppingList.shoppingListItems.map((shoppingListItem) => {
          return <ShoppingListItem shoppingListItem={shoppingListItem} key={shoppingListItem.id} />
        })}
      </div>
      <nav className="rw-button-group">
        <Link to={routes.editShoppingList({ id: shoppingList.id })} className="blue-button mr-1">
          Edit
        </Link>
        <button type="button" className="red-button" onClick={() => onDeleteClick(shoppingList.id)}>
          Delete
        </button>
      </nav>
    </>
  );
};

export default ShoppingList;
