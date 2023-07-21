import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/ShoppingList/ShoppingListsCell';
import { truncate } from 'src/lib/formatters';

import type { DeleteShoppingListMutationVariables, FindShoppingLists, ShoppingListItem } from 'types/graphql';

const DELETE_SHOPPING_LIST_MUTATION = gql`
  mutation DeleteShoppingListMutation($id: Int!) {
    deleteShoppingList(id: $id) {
      id
    }
  }
`;

const ShoppingListItem = ({ shoppingListItem }: { shoppingListItem: ShoppingListItem }) => {
  return <div>{shoppingListItem.name}</div>
}

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
    <div className='clear-both flex lg:flex-row flex-col items-center justify-between'>
      {shoppingLists.map((shoppingList) => (
        <div key={shoppingList.id} className='flex flex-col mb-6'>
          <div className='mb-6'><strong>{truncate(shoppingList.name)}</strong></div>
          <div className='ml-6 mb-6 overflow-y-auto max-h-[60vh]'>
            {shoppingList.shoppingListItems.map((shoppingListItem) => {
              return <ShoppingListItem key={shoppingListItem.id} shoppingListItem={shoppingListItem} />
            })}
          </div>
          <div className='flex flex-row'>
            <Link
              to={routes.shoppingList({ id: shoppingList.id })}
              title={'Show shoppingList ' + shoppingList.id + ' detail'}
              className="blue-button mr-1"
            >
              Show
            </Link>
            <Link
              to={routes.editShoppingList({ id: shoppingList.id })}
              title={'Edit shoppingList ' + shoppingList.id}
              className="orange-button mr-1"
            >
              Edit
            </Link>
            <button
              type="button"
              title={'Delete shoppingList ' + shoppingList.id}
              className="red-button mr-1"
              onClick={() => onDeleteClick(shoppingList.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingListsList;
