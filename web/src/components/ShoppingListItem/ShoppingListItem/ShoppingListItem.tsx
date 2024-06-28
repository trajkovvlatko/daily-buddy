import { useRef } from 'react';

import { ShoppingListItem as ShoppingListItemType } from 'types/graphql';

import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

const UPDATE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation UpdateShoppingListItemMutation($id: Int!, $input: UpdateShoppingListItemInput!) {
    updateShoppingListItem(id: $id, input: $input) {
      id
      name
      bought
    }
  }
`;

const ShoppingListItem = ({
  shoppingListId,
  shoppingListItem,
}: {
  shoppingListId: number;
  shoppingListItem: ShoppingListItemType;
}) => {
  const refName = useRef<HTMLInputElement>(null);
  const refBought = useRef<HTMLInputElement>(null);

  const [updateShoppingListItem] = useMutation(UPDATE_SHOPPING_LIST_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Shopping list updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const toggle = (e) => {
    const bought = e.target.checked;

    updateShoppingListItem({
      variables: {
        id: shoppingListItem.id,
        input: {
          shoppingListId: shoppingListId,
          bought,
        },
      },
      refetchQueries: ['FindShoppingListById'],
    });
  };

  const update = () => {
    const name = refName.current.value.trim();
    if (!name) return;

    updateShoppingListItem({
      variables: {
        id: shoppingListItem.id,
        input: {
          shoppingListId: shoppingListId,
          name,
        },
      },
    });
  };

  const onKeyUp = (e: any) => {
    if (e.key === 'Enter') update();
  };

  return (
    <div className="mb-2 flex items-center">
      <input
        ref={refBought}
        type="checkbox"
        checked={shoppingListItem.bought}
        onChange={toggle}
        className="mr-2 h-4 w-4"
      />
      <input
        ref={refName}
        type="text"
        defaultValue={shoppingListItem.name}
        onBlur={update}
        className="mr-6 grow border-2 p-1 pl-2 md:mr-0 md:w-1/2"
        onKeyUp={onKeyUp}
      />
    </div>
  );
};

export default ShoppingListItem;
