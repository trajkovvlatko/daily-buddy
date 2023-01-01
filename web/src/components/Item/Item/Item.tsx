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

  const imageUrl = `${process.env.FILESTACK_HOST}/${item.imageHandle}`;

  return (
    <div className="px-5">
      <div>
        <h2 className="h2 mb-6">{item.name}</h2>
        <div className="mb-3">
          Type: <b>{item.ItemType.itemType}</b>
        </div>
        <div className="mb-3">
          Color: <b>{item.Color.color}</b>
        </div>
        {!!item.imageHandle && (
          <div>
            <img src={imageUrl} />
          </div>
        )}
      </div>
      <nav className="mt-3 flex justify-end gap-3">
        <button type="button" className="red-button" onClick={() => onDeleteClick(item.id)}>
          Delete
        </button>
        <button onClick={() => navigate(routes.editItem({ id: item.id }))} className="blue-button">
          Edit
        </button>
      </nav>
    </div>
  );
};

export default Item;
