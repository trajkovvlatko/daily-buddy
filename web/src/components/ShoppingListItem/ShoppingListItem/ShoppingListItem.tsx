import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/dist/toast";
import { useEffect, useRef } from "react";
import { ShoppingListItem as ShoppingListItemType } from "types/graphql"

const UPDATE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation UpdateShoppingListItemMutation($id: Int!, $input: UpdateShoppingListItemInput!) {
    updateShoppingListItem(id: $id, input: $input) {
      id
      name
    }
  }
`;


const ShoppingListItem = ({ shoppingListItem }: { shoppingListItem: ShoppingListItemType }) => {
  const refName = useRef<HTMLInputElement>(null)

  const [updateShoppingListItem] = useMutation(UPDATE_SHOPPING_LIST_ITEM_MUTATION, {
    onCompleted: (res) => {
      toast.success('Shopping list updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const toggle = () => {
    console.log("toggle")
  }

  const update = () => {
    updateShoppingListItem({
      variables: {
        id: shoppingListItem.id,
        input: {
          shoppingListId: 1,
          name: refName.current.value
        }
      }
    })
  }

  return <div className="mb-2">
    <input type="checkbox" onClick={toggle} className="w-4 h-4 mr-2" />
    <input ref={refName} type="text" defaultValue={shoppingListItem.name} onBlur={update} className="border-2 p-1 pl-2 w-1/2" />
  </div>
}

export default ShoppingListItem
