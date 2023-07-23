import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/dist/toast";
import { useRef } from "react";

const CREATE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation CreateShoppingListItemMutation($input: CreateShoppingListItemInput!) {
    createShoppingListItem(input: $input) {
      id
      name
      bought
    }
  }
`;


const NewShoppingListItem = ({ shoppingListId }: { shoppingListId: number }) => {
  const refName = useRef<HTMLInputElement>(null)

  const [createShoppingListItem] = useMutation(CREATE_SHOPPING_LIST_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Shopping list updated');
      refName.current.value = '';
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const create = () => {
    const name = refName.current.value.trim();
    if (!name) return

    createShoppingListItem({
      variables: {
        input: {
          shoppingListId,
          name,
        }
      },
      refetchQueries: ['FindShoppingListById']
    })
  }

  const onKeyUp = (e) => {
    if (e.key === 'Enter') create()
  }

  return <div className="mb-2">
    <input ref={refName} type="text" onBlur={create} className="border-2 p-1 pl-2 ml-6 w-1/2" placeholder="Add new item" onKeyUp={onKeyUp} />
  </div>
}

export default NewShoppingListItem
