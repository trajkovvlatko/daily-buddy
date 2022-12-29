import { routes, navigate, back } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import type { DeleteItemMutationVariables, FindItemById } from 'types/graphql';

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItemMutation($id: Int!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

interface Props {
  item: NonNullable<FindItemById['item']>;
}

const Item = ({ item }: Props) => {
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item deleted');
      back();
    },
    refetchQueries: ['FindItems'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteItemMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete item ' + id + '?')) {
      deleteItem({ variables: { id } });
    }
  };

  return (
    <>
      <div>
        <h2 className="h2">{item.name}</h2>
        <div>{item.ItemType.itemType}</div>
        <div>{item.Color.color}</div>
      </div>
      <nav>
        <button onClick={() => navigate(routes.editItem({ id: item.id }))} className="blue-button">
          Edit
        </button>
        <button type="button" className="red-button" onClick={() => onDeleteClick(item.id)}>
          Delete
        </button>
      </nav>
    </>
  );
};

export default Item;
