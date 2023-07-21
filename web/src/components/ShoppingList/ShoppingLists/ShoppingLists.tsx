import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/ShoppingList/ShoppingListsCell';
import ShoppingListItem from 'src/components/ShoppingListItem/ShoppingListItem/ShoppingListItem';
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
    <div className='clear-both flex flex-wrap	lg:flex-row flex-col justify-between'>
      {shoppingLists.map((shoppingList) => (
        <div key={shoppingList.id} className='flex flex-col mb-6 w-1/5'>
          <Link
            to={routes.shoppingList({ id: shoppingList.id })}
            title={'Show shoppingList ' + shoppingList.id + ' detail'}
            className="mb-6"
          >
            <strong>{truncate(shoppingList.name)}</strong>
          </Link>

          <div className='ml-6 mb-6 overflow-y-auto max-h-[60vh]'>
            {shoppingList.shoppingListItems.map((shoppingListItem) => {
              return <ShoppingListItem key={shoppingListItem.id} shoppingListItem={shoppingListItem} />
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingListsList;
