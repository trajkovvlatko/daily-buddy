import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

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
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">ShoppingList {shoppingList.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{shoppingList.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.editShoppingList({ id: shoppingList.id })} className="rw-button rw-button-blue">
          Edit
        </Link>
        <button type="button" className="rw-button rw-button-red" onClick={() => onDeleteClick(shoppingList.id)}>
          Delete
        </button>
      </nav>
    </>
  );
};

export default ShoppingList;
