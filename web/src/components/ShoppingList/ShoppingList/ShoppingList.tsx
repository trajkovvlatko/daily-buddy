import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import ShareForm from 'src/components/Access/ShareForm/ShareForm';
import NewShoppingListItem from 'src/components/ShoppingListItem/NewShoppingListItem/NewShoppingListItem';
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

const DELETE_ALL_BOUGHT_ITEMS_MUTATION = gql`
  mutation deleteAllBoughtItems($shoppingListId: Int!) {
    deleteAllBoughtItems(shoppingListId: $shoppingListId)
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

  const [deleteAllBoughtItems] = useMutation(DELETE_ALL_BOUGHT_ITEMS_MUTATION, {
    onCompleted: () => {
      toast.success('All bought items are now deleted.');
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

  const deleteAllBought = () => {
    deleteAllBoughtItems({
      variables: {
        shoppingListId: shoppingList.id,
      },
      refetchQueries: ['FindShoppingListById'],
    })
  }

  return (
    <div className='pb-6'>
      <h1 className="mb-10 text-lg font-semibold">{shoppingList.name}</h1>
      <h2 className="mb-6 text-lg">Pending</h2>
      <div className='md:w-1/2'>
        {shoppingList.shoppingListItems.pending.map((shoppingListItem) => {
          return <ShoppingListItem shoppingListId={shoppingList.id} shoppingListItem={shoppingListItem} key={shoppingListItem.id} />
        })}
        {shoppingList.shoppingListItems.pending.length === 0 && <div className='mb-6'>No items.</div>}
      </div>
      <div className='mb-12 md:w-1/2'>
        <NewShoppingListItem shoppingListId={shoppingList.id} />
      </div>
      <h2 className="mb-6 text-lg">Bought</h2>
      <div className='mb-12 md:w-1/2'>
        {shoppingList.shoppingListItems.bought.map((shoppingListItem) => {
          return <ShoppingListItem shoppingListId={shoppingList.id} shoppingListItem={shoppingListItem} key={shoppingListItem.id} />
        })}
        {shoppingList.shoppingListItems.bought.length === 0 && <div className='mb-6'>No items.</div>}
      </div>

      {!shoppingList.shared && <div className='mb-12 md:w-1/2 mr-6'>
        <ShareForm id={shoppingList.id} type="ShoppingList" emails={shoppingList.emails} />
      </div>}

      <nav className="mr-6 flex justify-end">
        <button type="button" className="orange-button mr-1" onClick={deleteAllBought}>
          Delete bought items
        </button>
        <Link to={routes.editShoppingList({ id: shoppingList.id })} className="blue-button mr-1">
          Edit
        </Link>
        {!shoppingList.shared && <button type="button" className="red-button" onClick={() => onDeleteClick(shoppingList.id)}>
          Delete
        </button>}
      </nav>
    </div>
  );
};

export default ShoppingList;
