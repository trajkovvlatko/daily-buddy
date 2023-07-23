import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/dist/toast";
import { useRef } from "react";

const CREATE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation CreateShoppingListItemMutation($input: CreateShoppingListItemInput!) {
    createShoppingListItem(input: $input) {
      id
      name
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
    refetchQueries: ['FindShoppingListById'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const create = () => {
    createShoppingListItem({
      variables: {
        input: {
          shoppingListId,
          name: refName.current.value
        }
      }
    })
  }

  return <div className="mb-2">
    <input ref={refName} type="text" onBlur={create} className="border-2 p-1 pl-2 ml-6 w-1/2" />
  </div>
}

export default NewShoppingListItem
