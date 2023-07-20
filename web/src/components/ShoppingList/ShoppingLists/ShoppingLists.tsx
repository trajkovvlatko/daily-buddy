import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/ShoppingList/ShoppingListsCell';
import { truncate } from 'src/lib/formatters';

import type { DeleteShoppingListMutationVariables, FindShoppingLists } from 'types/graphql';

const DELETE_SHOPPING_LIST_MUTATION = gql`
  mutation DeleteShoppingListMutation($id: Int!) {
    deleteShoppingList(id: $id) {
      id
    }
  }
`;

const ShoppingListsList = ({ shoppingLists }: FindShoppingLists) => {
  const [deleteShoppingList] = useMutation(DELETE_SHOPPING_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('ShoppingList deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteShoppingListMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete shoppingList ' + id + '?')) {
      deleteShoppingList({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {shoppingLists.map((shoppingList) => (
            <tr key={shoppingList.id}>
              <td>{truncate(shoppingList.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.shoppingList({ id: shoppingList.id })}
                    title={'Show shoppingList ' + shoppingList.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editShoppingList({ id: shoppingList.id })}
                    title={'Edit shoppingList ' + shoppingList.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete shoppingList ' + shoppingList.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(shoppingList.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingListsList;
